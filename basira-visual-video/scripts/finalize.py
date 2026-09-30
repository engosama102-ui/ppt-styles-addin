"""
FFmpeg finishing pass for social platforms: converts to standard-range
yuv420p BT.709, adds +faststart for instant playback, keeps AAC audio.
Usage: python scripts/finalize.py [input] [output]
"""
import os
import shutil
import subprocess
import sys
import tempfile

src = sys.argv[1] if len(sys.argv) > 1 else "out/basira-corporate-ad.mp4"
dst = sys.argv[2] if len(sys.argv) > 2 else src
ffmpeg = os.environ.get("FFMPEG", shutil.which("ffmpeg") or "ffmpeg")
tmp = tempfile.mktemp(suffix=".mp4", dir=os.path.dirname(os.path.abspath(dst)))
subprocess.run(
    [ffmpeg, "-y", "-v", "error", "-i", src,
     "-vf", "scale=in_range=full:out_range=tv,format=yuv420p",
     "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-profile:v", "high", "-level", "4.1",
     "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv",
     "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", tmp],
    check=True,
)
os.replace(tmp, dst)
print(f"Finalized: {dst}")
