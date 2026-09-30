"""
Generate the English voice-over with edge-tts and re-time the whole video to it.

What it does:
  1. Reads the 11 paragraphs from voiceover-script.txt (blank-line separated).
  2. Synthesizes each paragraph with edge-tts (default en-US-AndrewNeural),
     collecting word boundaries for caption timing.
  3. Measures each clip's exact duration with ffprobe.
  4. Places each paragraph at its planned scene time, or later if the previous
     paragraph is still speaking (narration is never sped up).
  5. Writes public/audio/voiceover.mp3 and src/data/voiceover-timings.json.
  6. Regenerates the music so its length matches.

Usage:
  pip install edge-tts numpy
  python scripts/generate_voiceover.py
  python scripts/generate_voiceover.py --voice en-US-GuyNeural --rate -2% --pitch 0Hz

Requires ffmpeg and ffprobe on PATH.
"""
import argparse
import asyncio
import json
import os
import shutil
import ssl
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "voiceover-script.txt"
TIMINGS = ROOT / "src" / "data" / "voiceover-timings.json"
OUT_DIR = ROOT / "public" / "audio"
TMP = ROOT / "out" / "vo-parts"

# Planned scene starts from the creative brief (seconds).
PLANNED_STARTS = [0, 7, 15, 22, 33, 43, 53, 63, 71, 80, 85]
LEAD_FIRST = 0.35  # silence before the first word
LEAD = 0.45  # scene starts this long before its paragraph
GAP = 0.55  # minimum natural pause between paragraphs
TAIL = 2.4  # hold after the last word (logo pulse)


def read_paragraphs():
    text = SCRIPT.read_text(encoding="utf-8")
    paras = [p.strip().replace("\n", " ") for p in text.split("\n\n") if p.strip() and not p.strip().startswith("#")]
    if len(paras) != len(PLANNED_STARTS):
        sys.exit(f"Expected {len(PLANNED_STARTS)} paragraphs in {SCRIPT.name}, found {len(paras)}")
    return paras


def ffprobe_duration(path: Path) -> float:
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)],
        capture_output=True,
        text=True,
        check=True,
    )
    return float(r.stdout.strip())


async def synth(text: str, voice: str, rate: str, pitch: str, dest: Path):
    import edge_tts
    import edge_tts.communicate as comm

    # Respect a custom CA bundle (corporate proxies).
    if os.environ.get("SSL_CERT_FILE"):
        comm._SSL_CTX = ssl.create_default_context(cafile=os.environ["SSL_CERT_FILE"])
    c = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch, boundary="WordBoundary")
    words = []
    with open(dest, "wb") as f:
        async for chunk in c.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                s = chunk["offset"] / 1e7
                words.append({"text": chunk["text"], "start": s, "end": s + chunk["duration"] / 1e7})
    return words


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--voice", default="en-US-AndrewNeural")
    ap.add_argument("--rate", default="-3%")
    ap.add_argument("--pitch", default="-1Hz")
    args = ap.parse_args()

    for tool in ("ffmpeg", "ffprobe"):
        if not shutil.which(tool):
            sys.exit(f"{tool} not found on PATH")

    paras = read_paragraphs()
    TMP.mkdir(parents=True, exist_ok=True)
    clips = []
    for i, p in enumerate(paras):
        dest = TMP / f"p{i + 1:02d}.mp3"
        print(f"[{i + 1}/{len(paras)}] {p[:40]}…")
        words = asyncio.run(synth(p, args.voice, args.rate, args.pitch, dest))
        dur = ffprobe_duration(dest)
        clips.append({"file": dest, "dur": dur, "words": words})

    # Place paragraphs on the timeline.
    starts = []
    prev_end = 0.0
    for i, c in enumerate(clips):
        lead = LEAD_FIRST if i == 0 else LEAD
        s = max(PLANNED_STARTS[i] + lead, prev_end + GAP if i else lead)
        starts.append(s)
        prev_end = s + c["dur"]
    total = prev_end + TAIL

    # Mix all clips into one track at their start times.
    cmd = ["ffmpeg", "-y", "-v", "error"]
    for c in clips:
        cmd += ["-i", str(c["file"])]
    filters = []
    for i, s in enumerate(starts):
        ms = int(round(s * 1000))
        filters.append(f"[{i}:a]aresample=44100,adelay={ms}|{ms}[a{i}]")
    mix_in = "".join(f"[a{i}]" for i in range(len(clips)))
    filters.append(f"{mix_in}amix=inputs={len(clips)}:normalize=0,apad=whole_dur={total:.3f},atrim=0:{total:.3f}[out]")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    vo = OUT_DIR / "voiceover.mp3"
    cmd += ["-filter_complex", ";".join(filters), "-map", "[out]", "-ac", "2", "-b:a", "192k", str(vo)]
    subprocess.run(cmd, check=True)
    print(f"Voice-over: {vo} ({ffprobe_duration(vo):.2f}s)")

    scene_starts = [0.0] + [round(s - LEAD, 3) for s in starts[1:]]
    data = {
        "generated": True,
        "note": f"Measured from edge-tts voice {args.voice} (rate {args.rate}, pitch {args.pitch}).",
        "fps": 30,
        "totalSec": round(total, 3),
        "sceneStartsSec": scene_starts,
        "paragraphs": [
            {
                "start": round(s, 3),
                "end": round(s + c["dur"], 3),
                "words": [{"text": w["text"], "start": round(s + w["start"], 3), "end": round(s + w["end"], 3)} for w in c["words"]],
            }
            for s, c in zip(starts, clips)
        ],
    }
    TIMINGS.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Timings: {TIMINGS} (total {total:.2f}s)")

    # Match the music length to the new timeline.
    subprocess.run([sys.executable, str(ROOT / "scripts" / "generate_sound.py")], check=True)


if __name__ == "__main__":
    main()
