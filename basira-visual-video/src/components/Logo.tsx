import React from 'react';
import { brand } from '../config/brand';
import { ltr } from '../lib/text';

const c = brand.colors;

/**
 * Original Basira Visual mark: an insight "lens" (almond shape) with a gold
 * focal point. `draw` animates the stroke from 0 to 1.
 */
export const LogoMark: React.FC<{ size: number; draw?: number; dot?: number; id?: string }> = ({
  size,
  draw = 1,
  dot = 1,
  id = 'lm',
}) => {
  const len = 230;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.blue} />
          <stop offset="100%" stopColor={c.cyan} />
        </linearGradient>
      </defs>
      <path
        d="M6 50 Q50 8 94 50 Q50 92 6 50 Z"
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth={7}
        strokeLinejoin="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - draw)}
      />
      <circle cx="50" cy="50" r={17 * dot} fill={c.gold} />
      <circle cx="56" cy="44" r={5 * dot} fill={c.navy} opacity={0.85} />
    </svg>
  );
};

/** Horizontal wordmark: mark + "Basira Visual" (always LTR). */
export const Wordmark: React.FC<{ height: number; opacity?: number; draw?: number }> = ({
  height,
  opacity = 1,
  draw = 1,
}) => (
  <div style={{ ...ltr, display: 'flex', alignItems: 'center', gap: height * 0.32, opacity }}>
    <LogoMark size={height} draw={draw} id="wm" />
    <div style={{ fontSize: height * 0.62, letterSpacing: 0.5, color: c.white, lineHeight: 1, whiteSpace: 'nowrap' }}>
      <span style={{ fontWeight: 700 }}>Basira</span>{' '}
      <span style={{ fontWeight: 300, color: '#CFE0F5' }}>Visual</span>
    </div>
  </div>
);
