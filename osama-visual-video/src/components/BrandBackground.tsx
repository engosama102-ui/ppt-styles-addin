import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { brand } from '../config/brand';

const c = brand.colors;

const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  );

/** Deterministic pseudo random for grain offset. */
const rand = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export const BrandBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const s = frame / 30;
  const g1x = 30 + Math.sin(s * 0.25) * 12;
  const g1y = 22 + Math.cos(s * 0.2) * 6;
  const g2x = 72 + Math.cos(s * 0.18) * 10;
  const g2y = 74 + Math.sin(s * 0.22) * 6;
  const sweep = ((s * 0.06) % 1.6) - 0.3; // slow light band travelling across

  return (
    <AbsoluteFill style={{ background: c.navy, overflow: 'hidden' }}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${c.navy} 0%, ${c.darkBlue} 55%, ${c.navy} 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${g1x}% ${g1y}%, rgba(23,107,255,0.30) 0%, rgba(23,107,255,0.0) 42%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${g2x}% ${g2y}%, rgba(36,199,217,0.13) 0%, rgba(36,199,217,0) 38%)`,
        }}
      />
      {/* Violet and blue edge glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 45% 30% at 0% 55%, rgba(91,63,217,0.22) 0%, rgba(91,63,217,0) 100%), radial-gradient(ellipse 40% 28% at 100% 38%, rgba(23,107,255,0.18) 0%, rgba(23,107,255,0) 100%)`,
        }}
      />
      {/* Faint dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1.2px, transparent 1.2px)',
          backgroundSize: '40px 40px',
          backgroundPosition: `0px ${(-frame * 0.15) % 40}px`,
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 0%, transparent 100%)',
        }}
      />
      {/* Very faint moving light */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(115deg, transparent ${sweep * 100 - 12}%, rgba(255,255,255,0.035) ${sweep * 100}%, transparent ${sweep * 100 + 12}%)`,
        }}
      />
      {/* Animated grain */}
      <AbsoluteFill
        style={{
          backgroundImage: `url("${GRAIN}")`,
          backgroundPosition: `${Math.floor(rand(frame) * 220)}px ${Math.floor(rand(frame + 7) * 220)}px`,
          opacity: 0.07,
          mixBlendMode: 'overlay',
        }}
      />
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse 85% 75% at 50% 45%, transparent 55%, rgba(3,9,18,0.65) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
