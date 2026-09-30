"""
Generate the background music and sound effects for the Basira Visual video.

Everything is synthesized from scratch with NumPy, so the audio is original
and royalty-free. Output:
  public/audio/music.wav
  public/audio/sfx/{whoosh,click,pop,riser,impact}.wav

Usage:  python scripts/generate_sound.py
The music length follows totalSec in src/data/voiceover-timings.json.
"""
import json
import wave
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
AUDIO = ROOT / "public" / "audio"
SR = 44100
rng = np.random.default_rng(7)


def write_wav(path: Path, x: np.ndarray, peak_db: float = -1.0):
    path.parent.mkdir(parents=True, exist_ok=True)
    if x.ndim == 1:
        x = np.stack([x, x], axis=1)
    peak = np.max(np.abs(x)) or 1.0
    x = x / peak * (10 ** (peak_db / 20))
    data = (x * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())


def one_pole_lowpass(x: np.ndarray, cutoff: float) -> np.ndarray:
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc = (1 - a) * x[i] + a * acc
        y[i] = acc
    return y


def lowpass_fast(x: np.ndarray, cutoff: float) -> np.ndarray:
    """FFT brick-ish low-pass with a soft roll-off (fast for long signals)."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / (1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, len(x))


def highpass_fast(x: np.ndarray, cutoff: float) -> np.ndarray:
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= (f / cutoff) ** 4 / (1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, len(x))


def midi(n: float) -> float:
    return 440.0 * 2 ** ((n - 69) / 12)


def env_adsr(n: int, a: float, r: float) -> np.ndarray:
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    e[:na] = np.linspace(0, 1, na)
    e[-nr:] *= np.linspace(1, 0, nr)
    return e


def music(total_sec: float) -> np.ndarray:
    bpm = 100
    beat = 60 / bpm
    bar = beat * 4
    n = int((total_sec + 1) * SR)
    t = np.arange(n) / SR
    left = np.zeros(n)
    right = np.zeros(n)

    # Chords: Am9, Fmaj7, C(add9), G6 — two bars each
    chords = [[57, 60, 64, 71], [53, 57, 60, 64], [48, 55, 62, 64], [55, 59, 62, 64]]
    seg = bar * 2
    k = 0
    start = 0.0
    while start < total_sec + 1:
        notes = chords[k % len(chords)]
        s0 = int(start * SR)
        s1 = min(n, int((start + seg + 0.6) * SR))
        tt = t[s0:s1] - start
        e = env_adsr(s1 - s0, 1.2, 1.0)
        for j, m in enumerate(notes):
            f = midi(m)
            det = 1.003
            tone = np.sin(2 * np.pi * f * tt) + 0.35 * np.sin(2 * np.pi * 2 * f * tt) + 0.12 * np.sin(2 * np.pi * 3 * f * tt)
            tone2 = np.sin(2 * np.pi * f * det * tt + 1.3)
            left[s0:s1] += 0.08 * e * (tone + 0.5 * tone2) * (1.0 if j % 2 else 0.8)
            right[s0:s1] += 0.08 * e * (tone + 0.5 * tone2) * (0.8 if j % 2 else 1.0)
        # Sub bass on the root
        f0 = midi(notes[0] - 12)
        bass = np.sin(2 * np.pi * f0 * tt) * env_adsr(s1 - s0, 0.3, 0.8)
        left[s0:s1] += 0.10 * bass
        right[s0:s1] += 0.10 * bass
        start += seg
        k += 1

    # Pluck arpeggio on eighth notes
    step = beat / 2
    i = 0
    tpos = 0.0
    while tpos < total_sec:
        chord = chords[int(tpos // seg) % len(chords)]
        pattern = [0, 2, 1, 3, 2, 1, 3, 2]
        m = chord[pattern[i % 8]] + 12
        s0 = int(tpos * SR)
        ln = int(0.45 * SR)
        s1 = min(n, s0 + ln)
        tt = np.arange(s1 - s0) / SR
        pl = np.sin(2 * np.pi * midi(m) * tt) * np.exp(-tt * 9) + 0.3 * np.sin(2 * np.pi * midi(m) * 2 * tt) * np.exp(-tt * 14)
        amp = 0.045 if tpos < 7 else 0.06
        pan = 0.5 + 0.35 * np.sin(i * 0.9)
        left[s0:s1] += amp * pl * (1 - pan) * 2
        right[s0:s1] += amp * pl * pan * 2
        tpos += step
        i += 1

    # Soft kick on quarter notes after the hook, soft hats after the brand reveal
    tpos = 7.0
    while tpos < total_sec - 1.5:
        s0 = int(tpos * SR)
        ln = int(0.3 * SR)
        tt = np.arange(ln) / SR
        freq = 45 + 70 * np.exp(-tt * 28)
        ph = 2 * np.pi * np.cumsum(freq) / SR
        kick = np.sin(ph) * np.exp(-tt * 13)
        g = 0.20 if tpos > 15 else 0.12
        left[s0 : s0 + ln] += g * kick
        right[s0 : s0 + ln] += g * kick
        tpos += beat

    hats = highpass_fast(rng.standard_normal(n), 7000)
    tpos = 15.0 + beat / 2
    while tpos < min(total_sec - 6, 80):
        s0 = int(tpos * SR)
        ln = int(0.05 * SR)
        tt = np.arange(ln) / SR
        h = hats[s0 : s0 + ln] * np.exp(-tt * 70)
        left[s0 : s0 + ln] += 0.035 * h
        right[s0 : s0 + ln] += 0.03 * h
        tpos += beat

    mix = np.stack([left, right], axis=1)[: int(total_sec * SR)]
    # Gentle fades (the video fades again on top)
    fi, fo = int(1.0 * SR), int(3.0 * SR)
    mix[:fi] *= np.linspace(0, 1, fi)[:, None]
    mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
    return np.tanh(mix * 1.2)


def sfx():
    out = {}
    # whoosh: band-passed noise with a sweep
    ln = int(0.7 * SR)
    tt = np.arange(ln) / SR
    noise = rng.standard_normal(ln)
    env = np.sin(np.pi * np.clip(tt / 0.7, 0, 1)) ** 2
    lo = one_pole_lowpass(noise, 1800)
    out["whoosh"] = highpass_fast(lo, 250) * env
    # click: short tick
    ln = int(0.06 * SR)
    tt = np.arange(ln) / SR
    out["click"] = (np.sin(2 * np.pi * 2600 * tt) * np.exp(-tt * 140) + 0.4 * rng.standard_normal(ln) * np.exp(-tt * 400))
    # pop: soft pitched blip
    ln = int(0.14 * SR)
    tt = np.arange(ln) / SR
    f = 950 - 350 * (tt / 0.14)
    out["pop"] = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 30)
    # riser: filtered noise + rising tone, 1.6 s
    ln = int(1.6 * SR)
    tt = np.arange(ln) / SR
    e = (tt / 1.6) ** 2.2
    f = 220 + 660 * (tt / 1.6) ** 2
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR)
    out["riser"] = (0.5 * highpass_fast(rng.standard_normal(ln), 1200) + tone) * e
    # impact: low boom + air
    ln = int(1.4 * SR)
    tt = np.arange(ln) / SR
    freq = 42 + 60 * np.exp(-tt * 10)
    boom = np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.exp(-tt * 3.2)
    air = lowpass_fast(rng.standard_normal(ln), 3000) * np.exp(-tt * 6) * 0.25
    out["impact"] = boom + air
    return out


def main():
    timings = json.loads((ROOT / "src" / "data" / "voiceover-timings.json").read_text(encoding="utf-8"))
    total = float(timings["totalSec"])
    print(f"Music length: {total:.2f}s")
    write_wav(AUDIO / "music.wav", music(total))
    for name, x in sfx().items():
        write_wav(AUDIO / "sfx" / f"{name}.wav", x, peak_db=-3)
    print("Wrote public/audio/music.wav and public/audio/sfx/*.wav")


if __name__ == "__main__":
    main()
