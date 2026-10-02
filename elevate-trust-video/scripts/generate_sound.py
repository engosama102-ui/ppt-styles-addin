"""
Synthesize original, royalty-free music and sound effects (NumPy only).

Output:
  public/audio/music.wav           calm, optimistic, forward-moving bed (~32 s)
  public/audio/sfx/*.wav           notify, coin, whoosh, tick, click, bass

Usage: python scripts/generate_sound.py [seconds]
"""
import sys
import wave
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "audio"
SR = 44100
rng = np.random.default_rng(11)


def write(path: Path, x: np.ndarray, peak_db: float = -1.0):
    path.parent.mkdir(parents=True, exist_ok=True)
    if x.ndim == 1:
        x = np.stack([x, x], 1)
    x = x / (np.max(np.abs(x)) or 1) * 10 ** (peak_db / 20)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


def hz(m):
    return 440 * 2 ** ((m - 69) / 12)


def lowpass(x, fc):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    return np.fft.irfft(X / (1 + (f / fc) ** 4), len(x))


def highpass(x, fc):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    r = (f / fc) ** 4
    return np.fft.irfft(X * r / (1 + r), len(x))


def env(n, a, r):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    e[:na] = np.linspace(0, 1, na)
    e[-nr:] *= np.linspace(1, 0, nr)
    return e


def music(sec):
    bpm = 92
    beat = 60 / bpm
    n = int((sec + 1) * SR)
    L = np.zeros(n)
    R = np.zeros(n)
    # Dmaj9 - Bm7 - Gmaj7 - A6, one bar each (optimistic, unresolved, forward)
    chords = [[50, 57, 61, 64, 66], [47, 54, 57, 62, 66], [43, 50, 54, 59, 62], [45, 52, 57, 61, 66]]
    bar = beat * 4
    k, t0 = 0, 0.0
    while t0 < sec + 1:
        notes = chords[k % 4]
        s0, s1 = int(t0 * SR), min(n, int((t0 + bar + 0.8) * SR))
        tt = np.arange(s1 - s0) / SR
        e = env(s1 - s0, 0.9, 0.9)
        for j, m in enumerate(notes[1:]):
            f = hz(m)
            tone = np.sin(2 * np.pi * f * tt) + 0.25 * np.sin(2 * np.pi * 2 * f * tt + 0.4) + 0.4 * np.sin(2 * np.pi * f * 1.004 * tt + 1.1)
            pan = 0.35 + 0.3 * (j % 2)
            L[s0:s1] += 0.05 * e * tone * (1 - pan) * 2
            R[s0:s1] += 0.05 * e * tone * pan * 2
        sub = np.sin(2 * np.pi * hz(notes[0] - 12) * tt) * env(s1 - s0, 0.2, 0.6)
        L[s0:s1] += 0.09 * sub
        R[s0:s1] += 0.09 * sub
        t0 += bar
        k += 1
    # soft pluck arpeggio on 8ths from 3 s
    t, i = 3.0, 0
    while t < sec - 1:
        notes = chords[int(t // bar) % 4]
        m = notes[[1, 3, 2, 4, 3, 2, 4, 3][i % 8]] + 12
        s0 = int(t * SR)
        ln = int(0.5 * SR)
        tt = np.arange(ln) / SR
        p = (np.sin(2 * np.pi * hz(m) * tt) * np.exp(-tt * 8) + 0.25 * np.sin(4 * np.pi * hz(m) * tt) * np.exp(-tt * 13)) * 0.045
        pan = 0.5 + 0.3 * np.sin(i * 1.3)
        L[s0:s0 + ln] += p * (1 - pan) * 2
        R[s0:s0 + ln] += p * pan * 2
        t += beat / 2
        i += 1
    # very soft kick + shaker after 7 s
    noise = highpass(rng.standard_normal(n), 6000)
    t = 7.0
    while t < sec - 2:
        s0 = int(t * SR)
        ln = int(0.25 * SR)
        tt = np.arange(ln) / SR
        kick = np.sin(2 * np.pi * np.cumsum(45 + 60 * np.exp(-tt * 30)) / SR) * np.exp(-tt * 14) * 0.13
        L[s0:s0 + ln] += kick
        R[s0:s0 + ln] += kick
        h0 = int((t + beat / 2) * SR)
        hl = int(0.06 * SR)
        hh = noise[h0:h0 + hl] * np.exp(-np.arange(hl) / SR * 60) * 0.02
        L[h0:h0 + hl] += hh
        R[h0:h0 + hl] += hh * 0.8
        t += beat
    mix = np.stack([L, R], 1)[: int(sec * SR)]
    fi, fo = int(1.2 * SR), int(2.5 * SR)
    mix[:fi] *= np.linspace(0, 1, fi)[:, None]
    mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
    return np.tanh(mix * 1.3)


def sfx():
    o = {}
    t = lambda d: np.arange(int(d * SR)) / SR
    # notify: two soft chime tones
    a = t(0.7)
    o["notify"] = sum(
        np.where(a >= d, np.sin(2 * np.pi * f * (a - d)) * np.exp(-np.maximum(a - d, 0) * 6), 0) for f, d in [(hz(81), 0), (hz(88), 0.11)]
    )
    # coin: bright ping with partials (the satisfying +$2.99 moment)
    a = t(1.0)
    o["coin"] = sum(w * np.sin(2 * np.pi * hz(93) * r * a) * np.exp(-a * dk) for r, w, dk in [(1, 1, 5), (2.01, 0.4, 8), (3.02, 0.2, 12)]) + 0.5 * np.sin(
        2 * np.pi * hz(88) * a
    ) * np.exp(-a * 9)
    # whoosh: filtered noise swell
    a = t(0.6)
    o["whoosh"] = highpass(lowpass(rng.standard_normal(len(a)), 2200), 300) * np.sin(np.pi * a / 0.6) ** 2
    # tick: tiny money-flow tick
    a = t(0.05)
    o["tick"] = np.sin(2 * np.pi * 3200 * a) * np.exp(-a * 160)
    # click: gentle UI click
    a = t(0.08)
    o["click"] = np.sin(2 * np.pi * 1800 * a) * np.exp(-a * 90) + 0.3 * rng.standard_normal(len(a)) * np.exp(-a * 500)
    # bass: soft sub transition
    a = t(1.2)
    o["bass"] = np.sin(2 * np.pi * np.cumsum(40 + 30 * np.exp(-a * 6)) / SR) * np.exp(-a * 3)
    return o


if __name__ == "__main__":
    sec = float(sys.argv[1]) if len(sys.argv) > 1 else 32.0
    write(OUT / "music.wav", music(sec))
    for k, v in sfx().items():
        write(OUT / "sfx" / f"{k}.wav", v, -3)
    print(f"music {sec}s + {len(sfx())} sfx written to public/audio")
