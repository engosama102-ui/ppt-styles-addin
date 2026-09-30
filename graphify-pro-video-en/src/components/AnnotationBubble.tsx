import React from 'react';
import { useCurrentFrame } from 'remotion';
import { brand } from '../config/brand';
import { easeOut, progress } from '../lib/motion';
import { txt } from '../lib/text';

const c = brand.colors;

/**
 * Comment bubble with a pointer line to a target point.
 * Coordinates are in the parent's pixel space (parent must be position: relative).
 * The line draws first, then the bubble pops in.
 */
export const AnnotationBubble: React.FC<{
  text: string;
  x: number;
  y: number;
  tx: number;
  ty: number;
  startSec: number;
  tone?: 'warn' | 'good' | 'info';
  fontSize?: number;
}> = ({ text, x, y, tx, ty, startSec, tone = 'warn', fontSize = 30 }) => {
  const frame = useCurrentFrame();
  const line = progress(frame, startSec, 0.35);
  const pop = progress(frame, startSec + 0.2, 0.45, easeOut);
  if (line <= 0) return null;
  const accent = tone === 'warn' ? '#FF6B6B' : tone === 'good' ? c.gold : c.cyan;
  const len = Math.hypot(tx - x, ty - y);
  const minX = Math.min(x, tx) - 20;
  const minY = Math.min(y, ty) - 20;
  return (
    <>
      <svg
        style={{ position: 'absolute', left: minX, top: minY, overflow: 'visible', pointerEvents: 'none' }}
        width={Math.abs(tx - x) + 40}
        height={Math.abs(ty - y) + 40}
      >
        <line
          x1={x - minX}
          y1={y - minY}
          x2={tx - minX}
          y2={ty - minY}
          stroke={accent}
          strokeWidth={2.5}
          strokeDasharray={`${len * line} ${len}`}
        />
        <circle cx={tx - minX} cy={ty - minY} r={8 * line} fill={accent} />
        <circle cx={tx - minX} cy={ty - minY} r={16 * line} fill="none" stroke={accent} strokeWidth={2} opacity={0.4} />
      </svg>
      <div
        style={{
          ...txt,
          position: 'absolute',
          left: x,
          top: y,
          transform: `translate(-50%, -50%) scale(${0.85 + 0.15 * pop})`,
          opacity: pop,
          whiteSpace: 'nowrap',
          fontSize,
          fontWeight: 600,
          color: c.white,
          background: 'rgba(11,31,56,0.94)',
          border: `1.5px solid ${accent}`,
          padding: '10px 22px',
          borderRadius: 16,
          boxShadow: `0 14px 30px rgba(0,0,0,0.4), 0 0 24px ${accent}33`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: 5, background: accent, flex: 'none' }} />
        {text}
      </div>
    </>
  );
};
