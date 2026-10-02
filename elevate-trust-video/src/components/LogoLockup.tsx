import React from 'react';
import { Img } from 'remotion';
import { ASSET_FILES, assetSrc, hasAsset } from '../data/assets';
import { C } from '../styles/tokens';

/**
 * Uses official logo files when present in public/assets.
 * Without them it shows the plain brand NAMES in text (no recreated logos).
 */
export const BrandMark: React.FC<{ which: 'elevate' | 'upwork'; height: number }> = ({ which, height }) => {
  const file = which === 'elevate' ? ASSET_FILES.elevateLogo : ASSET_FILES.upworkLogo;
  if (hasAsset(file)) return <Img src={assetSrc(file)} style={{ height, width: 'auto', display: 'block' }} />;
  return (
    <span style={{ fontSize: height * 0.72, fontWeight: 700, letterSpacing: '-0.02em', color: which === 'upwork' ? C.upworkGreen : C.elevateText, lineHeight: 1 }}>
      {which === 'elevate' ? 'Elevate Pay' : 'Upwork'}
    </span>
  );
};

export const LogoLockup: React.FC<{ height?: number; progress?: number }> = ({ height = 64, progress = 1 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: height * 0.55, opacity: progress, transform: `scale(${0.96 + 0.04 * progress})` }}>
    <BrandMark which="elevate" height={height} />
    <span style={{ fontSize: height * 0.6, color: C.elevateMuted, fontWeight: 300 }}>×</span>
    <BrandMark which="upwork" height={height} />
  </div>
);
