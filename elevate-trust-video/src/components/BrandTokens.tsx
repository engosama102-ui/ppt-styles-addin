import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, cssVars, FONT } from '../styles/tokens';

/** Root wrapper: injects CSS variables and draws the shared background. */
export const BrandTokens: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const gx = 50 + Math.sin(t * 0.18) * 18;
  const gy = 30 + Math.cos(t * 0.15) * 10;
  return (
    <AbsoluteFill style={{ ...(cssVars as React.CSSProperties), background: C.elevateBackground, fontFamily: FONT, color: C.elevateText }}>
      {/* soft brand glow */}
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${gx}% ${gy}%, ${C.elevatePrimary}22 0%, transparent 45%)` }} />
      {/* subtle grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
          backgroundSize: '90px 90px',
          backgroundPosition: '-1px -1px',
          opacity: 0.35,
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, black 0%, transparent 100%)',
        }}
      />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 45%, transparent 60%, rgba(0,0,0,0.6) 100%)' }} />
      {children}
    </AbsoluteFill>
  );
};
