import React from 'react';
import { C, tokens } from '../styles/tokens';

export type NodeTone = 'neutral' | 'past' | 'elevate' | 'upwork';

/** A labeled stop on the money flow. Positioned by its center. */
export const FlowNode: React.FC<{
  x: number;
  y: number;
  label: string;
  tone?: NodeTone;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
  sub?: string;
  logo?: React.ReactNode;
}> = ({ x, y, label, tone = 'neutral', size = 'md', style, sub, logo }) => {
  const fs = size === 'lg' ? 44 : size === 'md' ? 32 : 26;
  const pad = size === 'lg' ? '26px 44px' : size === 'md' ? '18px 32px' : '12px 22px';
  const border =
    tone === 'elevate' ? C.elevatePrimary : tone === 'upwork' ? C.upworkGreen : tone === 'past' ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.18)';
  const bg = tone === 'elevate' ? `linear-gradient(135deg, ${C.elevatePrimary}33, ${C.elevateSecondary}22)` : C.elevateSurface;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        padding: pad,
        borderRadius: tokens.radius.node,
        background: bg,
        border: `2px solid ${border}`,
        color: tone === 'past' ? '#A9AEBC' : C.elevateText,
        fontSize: fs,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        boxShadow: tone === 'elevate' ? `0 0 50px ${C.elevatePrimary}44` : '0 12px 30px rgba(0,0,0,0.4)',
        ...style,
      }}
    >
      {tone === 'upwork' && !logo && <span style={{ width: 12, height: 12, borderRadius: 6, background: C.upworkGreen }} />}
      {tone === 'elevate' && !logo && <span style={{ width: 12, height: 12, borderRadius: 6, background: C.elevatePrimary }} />}
      {logo}
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        {label}
        {sub && <span style={{ fontSize: fs * 0.55, color: C.elevateMuted, fontWeight: 500, marginTop: 4 }}>{sub}</span>}
      </span>
    </div>
  );
};
