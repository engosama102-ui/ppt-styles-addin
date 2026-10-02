import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { ASSET_FILES, assetSrc, hasAsset } from '../data/assets';
import { C, cssVars, tokens } from '../styles/tokens';

export const DISPLAY: React.CSSProperties = {
  fontFamily: `'${tokens.font.display}', sans-serif`,
  fontStretch: '125%',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '-0.01em',
};

/** Official logo when public/assets/elevate-logo.svg exists, otherwise the name set in type. */
export const ElevateWordmark: React.FC<{ size: number; color?: string }> = ({ size, color = C.elevateText }) => {
  if (hasAsset(ASSET_FILES.elevateLogo)) return <Img src={assetSrc(ASSET_FILES.elevateLogo)} style={{ height: size * 1.1, width: 'auto', display: 'block' }} />;
  return (
    <span style={{ fontSize: size, color, letterSpacing: '-0.03em', lineHeight: 1, whiteSpace: 'nowrap' }}>
      <span style={{ fontWeight: 800 }}>Elevate</span>
      <span style={{ fontWeight: 500 }}>Pay</span>
    </span>
  );
};

/** Upwork mark exactly as it appears in the Elevate app (cropped from the real screenshot). */
export const UpworkMark: React.FC<{ size: number }> = ({ size }) => (
  <Img src={staticFile('assets/upwork-mark-from-app.png')} style={{ width: size, height: size, display: 'block', flex: 'none' }} />
);

export const UpworkLockup: React.FC<{ size: number }> = ({ size }) =>
  hasAsset(ASSET_FILES.upworkLogo) ? (
    <Img src={assetSrc(ASSET_FILES.upworkLogo)} style={{ height: size * 1.1, width: 'auto' }} />
  ) : (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3 }}>
      <UpworkMark size={size * 1.25} />
      <span style={{ fontSize: size, fontWeight: 700, letterSpacing: '-0.02em', color: C.elevateText }}>Upwork</span>
    </span>
  );

/** Elevate-style card: indigo surface, top glow, thin primary edge. */
export const BrandCard: React.FC<{ style?: React.CSSProperties; children: React.ReactNode; glow?: number }> = ({ style, children, glow = 1 }) => (
  <div
    style={{
      borderRadius: 32,
      background: `radial-gradient(ellipse 90% 70% at 50% 0%, ${C.elevateGlow} 0%, ${C.elevateSurface} 70%)`,
      border: `2px solid ${C.elevatePrimary}AA`,
      boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 ${60 * glow}px ${C.elevatePrimary}${Math.round(0x55 * glow).toString(16).padStart(2, '0')}`,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Pill in the app's style (navy #0E0F33, white label). */
export const Pill: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 16,
      padding: '18px 34px',
      borderRadius: 999,
      background: C.elevateSurface,
      border: '1.5px solid rgba(255,255,255,0.10)',
      color: C.elevateText,
      fontWeight: 700,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Hero-style background: near-black to indigo to royal, top glow, moving rails, grid, grain. */
export const V2Background: React.FC<{ glow?: number; tilt?: number; parallax?: number }> = ({ glow = 1, tilt = 0, parallax = 0 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const seed = (n: number) => {
    const x = Math.sin(n * 91.7) * 43758.5;
    return x - Math.floor(x);
  };
  return (
    <AbsoluteFill style={{ ...(cssVars as React.CSSProperties), background: C.elevateBackground, overflow: 'hidden' }}>
      <AbsoluteFill style={{ background: `linear-gradient(${120 + tilt}deg, ${C.elevateBackground} 0%, ${C.elevateIndigo} 55%, ${C.elevateSecondary} 100%)`, opacity: 0.9 }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 45% at 50% -5%, ${C.elevateGlow} 0%, transparent 70%)`, opacity: 0.75 * glow }} />
      <AbsoluteFill
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '108px 108px',
          backgroundPosition: `${-parallax * 0.4}px ${(t * 6) % 108}px`,
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)',
        }}
      />
      {/* moving financial rails */}
      {[0.18, 0.5, 0.82].map((y, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${y * 100}%`,
            height: 1,
            background: `linear-gradient(90deg, transparent ${((t * 0.12 + i * 0.3) % 1.4) * 100 - 30}%, ${C.elevatePrimary}66 ${((t * 0.12 + i * 0.3) % 1.4) * 100 - 15}%, transparent ${((t * 0.12 + i * 0.3) % 1.4) * 100}%)`,
            opacity: 0.6,
          }}
        />
      ))}
      <AbsoluteFill
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>")}")`,
          backgroundPosition: `${Math.floor(seed(f) * 200)}px ${Math.floor(seed(f + 3) * 200)}px`,
          opacity: 0.05,
          mixBlendMode: 'overlay',
        }}
      />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse 95% 85% at 50% 45%, transparent 55%, rgba(0,0,0,0.65) 100%)' }} />
    </AbsoluteFill>
  );
};
