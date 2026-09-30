import { CSSProperties } from 'react';
import { Easing, interpolate, spring } from 'remotion';
import { FPS } from '../data/timeline';

export const ease = Easing.bezier(0.45, 0, 0.2, 1);
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** 0 → 1 over [startSec, startSec + durSec] with ease-in-out. */
export const progress = (frame: number, startSec: number, durSec: number, easing = ease) =>
  interpolate(frame, [startSec * FPS, (startSec + durSec) * FPS], [0, 1], { ...clamp, easing });

/** Controlled spring with no visible bounce. */
export const springIn = (frame: number, startSec: number, damping = 200, durSec?: number) =>
  spring({
    frame: frame - Math.round(startSec * FPS),
    fps: FPS,
    config: { damping, stiffness: 120, mass: 0.9 },
    durationInFrames: durSec ? Math.round(durSec * FPS) : undefined,
  });

/** Blur-to-sharp entrance that rises slightly. */
export const reveal = (frame: number, startSec: number, opts: { dy?: number; blur?: number; dur?: number; scale?: number } = {}): CSSProperties => {
  const { dy = 36, blur = 14, dur = 0.7, scale = 0.97 } = opts;
  const p = progress(frame, startSec, dur, easeOut);
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * dy}px) scale(${scale + (1 - scale) * p})`,
    filter: p < 1 ? `blur(${(1 - p) * blur}px)` : undefined,
  };
};

/** Fade out over the last `durSec` of a scene. */
export const exitFade = (frame: number, duration: number, durSec = 0.35) =>
  interpolate(frame, [duration - durSec * FPS, duration], [1, 0], { ...clamp, easing: ease });

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

export const sec = (s: number) => Math.round(s * FPS);
