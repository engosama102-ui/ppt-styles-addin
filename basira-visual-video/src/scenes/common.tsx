import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { clamp, ease } from '../lib/motion';

export type SceneProps = { duration: number };

/** Default scene lengths (seconds) from the brief. Used to scale choreography. */
export const BASE_DURATION: Record<string, number> = {
  hook: 7,
  cost: 8,
  intro: 7,
  presentations: 11,
  reports: 10,
  data: 10,
  templates: 10,
  localization: 8,
  process: 9,
  beforeAfter: 5,
  cta: 5,
};

/**
 * Returns a function that converts a beat time (seconds, planned for the
 * default scene length) into the actual scene time when narration made the
 * scene longer or shorter. Entrances in the first second are not scaled.
 */
export const useBeats = (id: string, duration: number) => {
  const k = duration / 30 / BASE_DURATION[id];
  return (s: number) => (s < 1 ? s : 1 + (s - 1) * k);
};

/** Scene wrapper: soft blur-fade in and out so cuts feel controlled. */
export const SceneFrame: React.FC<{ duration: number; children: React.ReactNode; inFrames?: number; outFrames?: number }> = ({
  duration,
  children,
  inFrames = 10,
  outFrames = 9,
}) => {
  const frame = useCurrentFrame();
  const i = interpolate(frame, [0, inFrames], [0, 1], { ...clamp, easing: ease });
  const o = interpolate(frame, [duration - outFrames, duration], [1, 0], { ...clamp, easing: ease });
  const v = Math.min(i, o);
  const scale = 1 + (1 - i) * 0.02 - (1 - o) * 0.02;
  return (
    <AbsoluteFill style={{ opacity: v, transform: `scale(${scale})`, filter: v < 1 ? `blur(${(1 - v) * 6}px)` : undefined }}>
      {children}
    </AbsoluteFill>
  );
};

/** Horizontal centering helper for absolutely positioned blocks. */
export const Center: React.FC<{ top: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ top, children, style }) => (
  <div style={{ position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: 'center', ...style }}>{children}</div>
);
