"""
Two-pass LINEAR loudness normalization of the final MP4 audio (one uniform gain).
Keeps the voice/music balance and all timing exactly as rendered. Video is copied.
Usage: python scripts/loudnorm.py out/elevate-trust-final.mp4 [-16]
"""
import json, os, re, shutil, subprocess, sys, tempfile

src = sys.argv[1]
target = float(sys.argv[2]) if len(sys.argv) > 2 else -16.0
ff = os.environ.get("FFMPEG", shutil.which("ffmpeg") or "ffmpeg")
p1 = subprocess.run([ff, "-hide_banner", "-i", src, "-af", f"loudnorm=I={target}:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True)
m = json.loads(re.findall(r"\{[^{}]*\}", p1.stderr)[-1])
print("measured:", m["input_i"], "LUFS, TP", m["input_tp"])
af = (f"loudnorm=I={target}:TP=-1.5:LRA=11:linear=true:measured_I={m['input_i']}:measured_TP={m['input_tp']}"
      f":measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']},aresample=48000")
tmp = tempfile.mktemp(suffix=".mp4", dir=os.path.dirname(os.path.abspath(src)))
subprocess.run([ff, "-v", "error", "-y", "-i", src, "-c:v", "copy", "-af", af, "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", tmp], check=True)
os.replace(tmp, src)
p3 = subprocess.run([ff, "-hide_banner", "-i", src, "-af", "loudnorm=print_format=json", "-f", "null", "-"], capture_output=True, text=True)
r = json.loads(re.findall(r"\{[^{}]*\}", p3.stderr)[-1])
print("result:", r["input_i"], "LUFS, TP", r["input_tp"])
