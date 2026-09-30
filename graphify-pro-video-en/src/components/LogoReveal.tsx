import React from 'react';
import { useCurrentFrame } from 'remotion';
import { brand } from '../config/brand';
import { easeOut, progress, springIn } from '../lib/motion';
import { txt } from '../lib/text';
import { BrandName, LogoMark } from './Logo';

const c = brand.colors;

/**
 * Premium brand reveal: mark draws in, wordmark wipes open left to right,
 * a gradient line travels underneath, descriptor rises last.
 */
export const LogoReveal: React.FC<{ startSec: number; markSize?: number; descriptor?: string; pulse?: number }> = ({
  startSec,
  markSize = 190,
  descriptor = brand.descriptor,
  pulse = 0,
}) => {
  const frame = useCurrentFrame();
  const s = springIn(frame, startSec, 18);
  const draw = progress(frame, startSec, 0.9);
  const dot = springIn(frame, startSec + 0.45, 14);
  const wipe = progress(frame, startSec + 0.5, 0.8);
  const line = progress(frame, startSec + 0.9, 0.9);
  const shimmer = ((frame / 30 - startSec - 1.2) * 0.6) % 1.4;
  const desc = progress(frame, startSec + 1.3, 0.7, easeOut);
  const glow = 0.35 + 0.15 * Math.sin(frame / 12) + pulse * 0.4;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          transform: `scale(${(0.6 + 0.4 * s) * (1 + pulse * 0.05)})`,
          opacity: Math.min(1, s * 1.5),
          filter: `drop-shadow(0 0 ${40 * glow}px rgba(36,199,217,${glow}))`,
        }}
      >
        <LogoMark size={markSize} draw={draw} dot={dot} id="reveal" />
      </div>
      <div
        style={{
          ...txt,
          marginTop: 44,
          fontSize: 100,
          lineHeight: 1.1,
          color: c.white,
          whiteSpace: 'nowrap',
          clipPath: `inset(-20% ${100 - wipe * 100}% -20% 0)`,
        }}
      >
        <BrandName />
      </div>
      <div style={{ position: 'relative', width: 640, height: 6, marginTop: 26, borderRadius: 3, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'left center',
            transform: `scaleX(${line})`,
            background: `linear-gradient(90deg, ${c.blue}, ${c.cyan}, ${c.gold})`,
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 160,
            left: `${shimmer * 100 - 20}%`,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)',
            opacity: line,
          }}
        />
      </div>
      <div
        style={{
          ...txt,
          textAlign: 'center',
          marginTop: 40,
          fontSize: 42,
          fontWeight: 500,
          color: c.gray,
          opacity: desc,
          transform: `translateY(${(1 - desc) * 24}px)`,
          filter: desc < 1 ? `blur(${(1 - desc) * 8}px)` : undefined,
        }}
      >
        {descriptor}
      </div>
    </div>
  );
};
