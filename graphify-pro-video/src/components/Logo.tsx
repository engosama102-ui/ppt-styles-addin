import React from 'react';
import { brand } from '../config/brand';
import { ltr } from '../lib/text';

const c = brand.colors;

/**
 * Graphify Pro mark: a cyan half circle with a quarter circle in the
 * lower right. On dark backgrounds the quarter is white (reversed logo);
 * on light backgrounds it uses the logo indigo.
 * `draw` reveals the half circle top to bottom, `dot` grows the quarter.
 */
export const LogoMark: React.FC<{ size: number; draw?: number; dot?: number; id?: string; onLight?: boolean }> = ({
  size,
  draw = 1,
  dot = 1,
  id = 'lm',
  onLight = false,
}) => (
  <svg width={size} height={size} viewBox="0 0 140 140" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <clipPath id={`${id}-clip`}>
        <rect x="0" y="0" width="140" height={140 * draw} />
      </clipPath>
    </defs>
    <path d="M70 0 A70 70 0 0 0 70 140 Z" fill={c.cyan} clipPath={`url(#${id}-clip)`} />
    <path
      d="M70 70 H140 A70 70 0 0 1 70 140 Z"
      fill={onLight ? c.indigo : c.white}
      transform={`translate(70 70) scale(${dot}) translate(-70 -70)`}
    />
  </svg>
);

/** Horizontal wordmark: mark + brand name (always LTR). */
export const Wordmark: React.FC<{ height: number; opacity?: number; draw?: number }> = ({
  height,
  opacity = 1,
  draw = 1,
}) => (
  <div style={{ ...ltr, display: 'flex', alignItems: 'center', gap: height * 0.36, opacity }}>
    <LogoMark size={height} draw={draw} id="wm" />
    <div style={{ fontSize: height * 0.56, color: c.white, lineHeight: 1, whiteSpace: 'nowrap' }}>
      <BrandName />
    </div>
  </div>
);

/** Brand name from the config in the logo typeface (Montserrat, uppercase). */
export const BrandName: React.FC = () => (
  <span
    style={{
      direction: 'ltr',
      unicodeBidi: 'isolate',
      fontFamily: `'${brand.fonts.brand}', sans-serif`,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    }}
  >
    {brand.name}
  </span>
);
