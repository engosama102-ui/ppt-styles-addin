import React from 'react';
import { Img, staticFile } from 'remotion';
import { brand } from '../config/brand';

export const SLIDE_W = 1600;
export const SLIDE_H = 900;
export const PAGE_W = 800;
export const PAGE_H = 1131;

/**
 * Shows a configured image from brand.slideImages when one is set,
 * otherwise the built-in React sample design.
 */
export const SlideSlot: React.FC<{ id: string; children: React.ReactNode; w?: number; h?: number }> = ({
  id,
  children,
  w = SLIDE_W,
  h = SLIDE_H,
}) => {
  const src = brand.slideImages[id];
  if (src) return <Img src={staticFile(src)} style={{ width: w, height: h, objectFit: 'cover', display: 'block' }} />;
  return <>{children}</>;
};

/** Scales a fixed-size canvas into a box of the given width. */
export const Scaled: React.FC<{ w: number; h: number; width: number; children: React.ReactNode }> = ({ w, h, width, children }) => {
  const k = width / w;
  return (
    <div style={{ position: 'relative', width, height: h * k, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h, transform: `scale(${k})`, transformOrigin: '0 0' }}>
        {children}
      </div>
    </div>
  );
};

/** Clean, perspective-free 16:9 slide mockup. */
export const PresentationMockup: React.FC<{
  width: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  radius?: number;
  glow?: boolean;
}> = ({ width, children, style, radius = 18, glow = true }) => (
  <div
    style={{
      width,
      height: (width * SLIDE_H) / SLIDE_W,
      borderRadius: radius,
      overflow: 'hidden',
      position: 'relative',
      boxShadow: glow
        ? '0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.10), 0 0 80px rgba(23,107,255,0.18)'
        : '0 20px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)',
      background: brand.colors.slideBg,
      ...style,
    }}
  >
    <Scaled w={SLIDE_W} h={SLIDE_H} width={width}>
      {children}
    </Scaled>
  </div>
);

/** Portrait report page mockup. */
export const ReportMockup: React.FC<{ width: number; children: React.ReactNode; style?: React.CSSProperties; ratio?: number }> = ({
  width,
  children,
  style,
  ratio = 1,
}) => (
  <div
    style={{
      width,
      height: (width * PAGE_H) / (PAGE_W * ratio),
      borderRadius: 10,
      overflow: 'hidden',
      position: 'relative',
      background: '#fff',
      boxShadow: '0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.10)',
      ...style,
    }}
  >
    <Scaled w={PAGE_W * ratio} h={PAGE_H} width={width}>
      {children}
    </Scaled>
  </div>
);
