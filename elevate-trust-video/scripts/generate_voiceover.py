"""
Optional voice-over with edge-tts (male, calm, warm).

Reads voiceover-script.txt (scene|offset|text), synthesizes each cue,
places it at its scene time (never earlier than the previous cue ends,
never sped up) and writes public/audio/voiceover.mp3. The film picks it up
automatically on the next render and lowers the music under it.

Usage:
  pip install edge-tts
  python scripts/generate_voiceover.py [--voice en-US-AndrewNeural] [--rate -6%]
Requires ffmpeg and ffprobe on PATH. Behind a corporate proxy, set SSL_CERT_FILE.
"""
import argparse, asyncio, os, re, shutil, ssl, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TMP = ROOT / "out" / "vo-parts"


def scene_starts():
    src = (ROOT / "src" / "data" / "timeline.ts").read_text()
    secs = dict(re.findall(r"(\w+): ([\d.]+),", src.split("sceneSeconds = {")[1].split("}")[0]))
    order = re.search(r"order: SceneKey\[\] = \[([^\]]+)\]", src).group(1)
    keys = [k.strip().strip("'") for k in order.split(",")]
    starts, t = {}, 0.0
    for k in keys:
        starts[k] = t
        t += float(secs[k])
    return starts, t


async def synth(text, voice, rate, pitch, dest):
    import edge_tts
    import edge_tts.communicate as comm
    if os.environ.get("SSL_CERT_FILE"):
        comm._SSL_CTX = ssl.create_default_context(cafile=os.environ["SSL_CERT_FILE"])
    await edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(str(dest))


def dur(p):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(p)], capture_output=True, text=True, check=True)
    return float(r.stdout)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--voice", default="en-US-AndrewNeural")
    ap.add_argument("--rate", default="-6%")
    ap.add_argument("--pitch", default="-2Hz")
    a = ap.parse_args()
    for tool in ("ffmpeg", "ffprobe"):
        if not shutil.which(tool):
            sys.exit(f"{tool} not found on PATH")
    starts, total = scene_starts()
    cues = []
    for block in (ROOT / "voiceover-script.txt").read_text(encoding="utf-8").split("\n\n"):
        lines = [l for l in block.strip().splitlines() if l and not l.startswith("#")]
        if lines:
            scene, off, text = lines[0].split("|", 2)
            cues.append((scene, float(off), text))
    TMP.mkdir(parents=True, exist_ok=True)
    placed, prev_end = [], 0.0
    for i, (scene, off, text) in enumerate(cues):
        f = TMP / f"vo{i:02d}.mp3"
        asyncio.run(synth(text, a.voice, a.rate, a.pitch, f))
        d = dur(f)
        s = max(starts[scene] + off, prev_end + 0.25)
        placed.append((f, s))
        prev_end = s + d
        print(f"{scene:<10} {s:6.2f}s  {d:5.2f}s  {text}")
    if prev_end > total:
        print(f"WARNING: narration ends at {prev_end:.2f}s, film is {total:.2f}s. Shorten text or lengthen scenes in src/data/timeline.ts.")
    cmd = ["ffmpeg", "-y", "-v", "error"]
    for f, _ in placed:
        cmd += ["-i", str(f)]
    fl = [f"[{i}:a]aresample=44100,adelay={int(s*1000)}|{int(s*1000)}[a{i}]" for i, (_, s) in enumerate(placed)]
    fl.append("".join(f"[a{i}]" for i in range(len(placed))) + f"amix=inputs={len(placed)}:normalize=0,apad=whole_dur={total:.2f},atrim=0:{total:.2f}[o]")
    out = ROOT / "public" / "audio" / "voiceover.mp3"
    subprocess.run(cmd + ["-filter_complex", ";".join(fl), "-map", "[o]", "-ac", "2", "-b:a", "192k", str(out)], check=True)
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
