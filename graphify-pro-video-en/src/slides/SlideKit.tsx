import React from 'react';
import { brand } from '../config/brand';
import { FONT } from '../lib/fonts';

export const sc = brand.colors;

/**
 * Base 1600×900 slide in the sample design system:
 * light surface, indigo ink, blue/cyan accents, gold for the key figure.
 */
export const SlideCanvas: React.FC<{
  kicker?: string;
  title?: string;
  page?: number;
  dark?: boolean;
  children?: React.ReactNode;
  footerNote?: string;
}> = ({ kicker, title, page, dark, children, footerNote }) => {
  const ink = dark ? sc.white : sc.slideInk;
  const muted = dark ? '#9FB3CC' : sc.slideMuted;
  return (
    <div
      style={{
        position: 'relative',
        width: 1600,
        height: 900,
        background: dark ? `linear-gradient(135deg, ${sc.darkBlue}, ${sc.navy})` : sc.slideBg,
        fontFamily: FONT,
        direction: 'ltr',
        textAlign: 'left',
        color: ink,
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 110, width: 90, height: 10, background: sc.gold }} />
      {kicker && (
        <div style={{ position: 'absolute', top: 70, left: 110, right: 110, fontSize: 24, fontWeight: 700, color: sc.blue, letterSpacing: 2, textTransform: 'uppercase' }}>
          {kicker}
        </div>
      )}
      {title && (
        <div style={{ position: 'absolute', top: 108, left: 110, right: 110, fontSize: 56, fontWeight: 700, lineHeight: 1.2, color: ink }}>
          {title}
        </div>
      )}
      <div style={{ position: 'absolute', top: 240, left: 110, right: 110, bottom: 120 }}>{children}</div>
      {page !== undefined && (
        <>
          <div style={{ position: 'absolute', bottom: 70, left: 110, right: 110, height: 2, background: dark ? 'rgba(255,255,255,0.12)' : sc.slideLine }} />
          <div style={{ position: 'absolute', bottom: 26, left: 110, right: 110, display: 'flex', justifyContent: 'space-between', fontSize: 20, color: muted }}>
            <span>{footerNote ?? 'Illustrative example'}</span>
            <span>{String(page).padStart(2, '0')}</span>
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
      boxShadow: dark ? 'none' : '0 10px 30px rgba(19,16,51,0.06)',
      padding: 36,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Pill: React.FC<{ children: React.ReactNode; color?: string; bg?: string; size?: number }> = ({ children, color = sc.blue, bg, size = 22 }) => (
  <span
    style={{
      display: 'inline-block',
      fontSize: size,
      fontWeight: 700,
      letterSpacing: 1,
      color,
      background: bg ?? `${color}1A`,
      padding: '6px 18px',
      borderRadius: 30,
      textTransform: 'uppercase',
      alignSelf: 'flex-start',
    }}
  >
    {children}
  </span>
);

export const Num: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <span style={{ display: 'inline-block', ...style }}>{children}</span>
);
