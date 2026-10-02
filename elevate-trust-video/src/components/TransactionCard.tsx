import React from 'react';
import { C, tokens } from '../styles/tokens';

/**
 * Editorial notification card for the hook. This is a motion-graphic
 * treatment of the reward, not a copy of the app UI. The real app
 * screenshot appears later in the proof scene.
 */
export const TransactionCard: React.FC<{ amount: string; label: string; date: string; countP: number; style?: React.CSSProperties }> = ({
  amount,
  label,
  date,
  countP,
  style,
}) => {
  const value = 2.99 * countP;
  const shown = countP >= 1 ? amount : `+$${value.toFixed(2)}`;
  return (
    <div
      style={{
        width: 840,
        padding: '40px 44px',
        borderRadius: tokens.radius.card,
        background: `linear-gradient(160deg, ${C.elevateSurface}, #0D0F16)`,
        border: '1.5px solid rgba(255,255,255,0.10)',
        boxShadow: `0 40px 90px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03), 0 0 80px ${C.elevatePrimary}1F`,
        display: 'flex',
        alignItems: 'center',
        gap: 34,
        ...style,
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 26,
          background: `${C.upworkGreen}22`,
          border: `2px solid ${C.upworkGreen}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 'none',
        }}
      >
        {/* gift icon */}
        <svg width="50" height="50" viewBox="0 0 48 48" fill="none" stroke={C.upworkGreen} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="18" width="34" height="24" rx="3" />
          <path d="M5 12h38v6H5zM24 12v30M24 12c-3-6-12-6-10 0M24 12c3-6 12-6 10 0" />
        </svg>
      </div>
      <div style={{ flex: 1, whiteSpace: 'nowrap' }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.16em', color: C.upworkGreen }}>{label}</div>
        <div style={{ fontSize: 26, color: C.elevateMuted, marginTop: 8 }}>{date}</div>
      </div>
      <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{shown}</div>
    </div>
  );
};
