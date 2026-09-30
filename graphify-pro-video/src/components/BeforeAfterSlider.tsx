import React from 'react';
import { brand } from '../config/brand';
import { rtl } from '../lib/text';
import { SLIDE_H, SLIDE_W, Scaled } from './PresentationMockup';

const c = brand.colors;

/**
 * Split comparison. `divider` is the divider position from the left edge
 * (0 → 1). The "before" design fills the left side and the "after" design
 * fills the right side.
 */
export const BeforeAfterSlider: React.FC<{
  width: number;
  divider: number;
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel: string;
  afterLabel: string;
  labelOpacity?: number;
}> = ({ width, divider, before, after, beforeLabel, afterLabel, labelOpacity = 1 }) => {
  const height = (width * SLIDE_H) / SLIDE_W;
  const x = divider * width;
  const tag = (text: string, side: 'left' | 'right', bg: string, fg: string): React.ReactNode => (
    <div
      style={{
        ...rtl,
        position: 'absolute',
        top: 18,
        [side]: 18,
        padding: '6px 20px',
        borderRadius: 12,
        fontSize: 30,
        fontWeight: 700,
        background: bg,
        color: fg,
        opacity: labelOpacity,
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
      }}
    >
      {text}
    </div>
  );
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.10), 0 0 80px rgba(23,107,255,0.18)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <Scaled w={SLIDE_W} h={SLIDE_H} width={width}>
          {before}
        </Scaled>
      </div>
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${x}px)` }}>
        <Scaled w={SLIDE_W} h={SLIDE_H} width={width}>
          {after}
        </Scaled>
      </div>
      {divider > 0.02 && tag(beforeLabel, 'left', '#3A4452', c.white)}
      {divider < 0.98 && tag(afterLabel, 'right', c.gold, c.navy)}
      {/* divider */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: x - 2, width: 4, background: c.white, boxShadow: `0 0 20px ${c.cyan}` }} />
      <div
        style={{
          position: 'absolute',
          top: height / 2 - 30,
          left: x - 30,
          width: 60,
          height: 60,
          borderRadius: 30,
          background: c.white,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <svg width="34" height="20" viewBox="0 0 34 20">
          <path d="M10 3L3 10l7 7M24 3l7 7-7 7" fill="none" stroke={c.navy} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};
