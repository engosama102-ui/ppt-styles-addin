import React from 'react';
import { brand } from '../config/brand';
import { FONT } from '../lib/fonts';

export const sc = brand.colors;

/**
 * Base 1600×900 slide in the sample design system:
 * light surface, navy ink, blue/cyan accents, gold for the key figure.
 */
export const SlideCanvas: React.FC<{
  kicker?: string;
  title?: string;
  page?: number;
  dir?: 'rtl' | 'ltr';
  dark?: boolean;
  children?: React.ReactNode;
  footerNote?: string;
}> = ({ kicker, title, page, dir = 'rtl', dark, children, footerNote }) => {
  const ink = dark ? sc.white : sc.slideInk;
  const muted = dark ? '#9FB3CC' : sc.slideMuted;
  const isRtl = dir === 'rtl';
  return (
    <div
      style={{
        position: 'relative',
        width: 1600,
        height: 900,
        background: dark ? `linear-gradient(135deg, ${sc.darkBlue}, ${sc.navy})` : sc.slideBg,
        fontFamily: FONT,
        direction: dir,
        unicodeBidi: 'plaintext',
        textAlign: isRtl ? 'right' : 'left',
        color: ink,
        overflow: 'hidden',
      }}
    >
      {/* brand accent */}
      <div style={{ position: 'absolute', top: 0, [isRtl ? 'right' : 'left']: 110, width: 90, height: 10, background: sc.gold }} />
      {kicker && (
        <div style={{ position: 'absolute', top: 70, left: 110, right: 110, fontSize: 26, fontWeight: 600, color: sc.blue, letterSpacing: isRtl ? 0 : 2 }}>
          {kicker}
        </div>
      )}
      {title && (
        <div style={{ position: 'absolute', top: 108, left: 110, right: 110, fontSize: 60, fontWeight: 700, lineHeight: 1.25, color: ink }}>
          {title}
        </div>
      )}
      <div style={{ position: 'absolute', top: 240, left: 110, right: 110, bottom: 120 }}>{children}</div>
      {page !== undefined && (
        <>
          <div style={{ position: 'absolute', bottom: 70, left: 110, right: 110, height: 2, background: dark ? 'rgba(255,255,255,0.12)' : sc.slideLine }} />
          <div
            style={{
              position: 'absolute',
              bottom: 26,
              left: 110,
              right: 110,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 22,
              color: muted,
            }}
          >
            <span>{footerNote ?? (isRtl ? 'مثال توضيحي' : 'Illustrative example')}</span>
            <span style={{ direction: 'ltr' }}>{String(page).padStart(2, '0')}</span>
          </div>
        </>
      )}
    </div>
  );
};

export const Card: React.FC<{ style?: React.CSSProperties; children: React.ReactNode; dark?: boolean }> = ({ style, children, dark }) => (
  <div
    style={{
      background: dark ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
      borderRadius: 22,
      border: `2px solid ${dark ? 'rgba(255,255,255,0.1)' : sc.slideLine}`,
      boxShadow: dark ? 'none' : '0 10px 30px rgba(11,31,56,0.06)',
      padding: 36,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Pill: React.FC<{ children: React.ReactNode; color?: string; bg?: string; size?: number }> = ({ children, color = sc.blue, bg, size = 24 }) => (
  <span
    style={{
      display: 'inline-block',
      fontSize: size,
      fontWeight: 600,
      color,
      background: bg ?? `${color}1A`,
      padding: '6px 18px',
      borderRadius: 30,
    }}
  >
    {children}
  </span>
);

export const Num: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <span style={{ direction: 'ltr', unicodeBidi: 'isolate', display: 'inline-block', ...style }}>{children}</span>
);
