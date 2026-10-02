import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { clamp, easeInOut } from '../lib/motion';

/** Controlled cut: short blur-fade in and out. */
export const SceneTransition: React.FC<{ duration: number; children: React.ReactNode; inF?: number; outF?: number }> = ({
  duration,
  children,
  inF = 8,
  outF = 8,
}) => {
  const f = useCurrentFrame();
  const i = interpolate(f, [0, inF], [0, 1], { ...clamp, easing: easeInOut });
  const o = outF ? interpolate(f, [duration - outF, duration], [1, 0], { ...clamp, easing: easeInOut }) : 1;
  const v = Math.min(i, o);
  return <AbsoluteFill style={{ opacity: v, filter: v < 1 ? `blur(${(1 - v) * 8}px)` : undefined }}>{children}</AbsoluteFill>;
};
