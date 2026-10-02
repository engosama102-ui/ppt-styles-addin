import { CSSProperties } from 'react';
import { Easing, interpolate } from 'remotion';
import { FPS } from '../data/timeline';

export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** 0 → 1 between two seconds. */
export const prog = (frame: number, start: number, dur: number, easing = easeOut) =>
  interpolate(frame, [start * FPS, (start + dur) * FPS], [0, 1], { ...clamp, easing });

/** Rise + fade + slight scale (0.96 → 1). */
export const enter = (frame: number, start: number, dur = 0.6, dy = 28): CSSProperties => {
  const p = prog(frame, start, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * dy}px) scale(${0.96 + 0.04 * p})` };
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
