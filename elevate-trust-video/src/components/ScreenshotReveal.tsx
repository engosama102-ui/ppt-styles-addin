import React from 'react';
import { Img, useCurrentFrame } from 'remotion';
import { ASSET_FILES, assetSrc, hasAsset } from '../data/assets';
import { screenshot } from '../data/screenshot';
import { lerp, prog } from '../lib/motion';
import { C, tokens } from '../styles/tokens';

/**
 * Shows ONLY the cropped transaction row of the real screenshot.
 * Pixels outside `crop` are never rendered. `masks` blur anything else
 * private inside the crop. A focus box draws around +$2.99.
 */
export const ScreenshotReveal: React.FC<{ width: number; start: number; focusStart: number; placeholderText: string }> = ({
  width,
  start,
  focusStart,
  placeholderText,
}) => {
  const frame = useCurrentFrame();
  const { crop, focus, masks } = screenshot;
  const k = width / crop.w;
  const h = crop.h * k;
  const open = prog(frame, start, 0.8);
  const zoom = lerp(1.12, 1, prog(frame, start, 1.6));
  const f = prog(frame, focusStart, 0.6);

  if (!hasAsset(ASSET_FILES.screenshot)) {
    return (
      <div
        style={{
          width,
          height: 300,
          borderRadius: tokens.radius.card,
          border: `3px dashed ${C.elevateMuted}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 40,
          boxSizing: 'border-box',
          color: C.elevateMuted,
          fontSize: 30,
          fontWeight: 600,
          opacity: open,
        }}
      >
        {placeholderText}
      </div>
    );
  }

  const rel = (r: { x: number; y: number; w: number; h: number }) => ({
    left: (r.x - crop.x) * k,
    top: (r.y - crop.y) * k,
    width: r.w * k,
    height: r.h * k,
  });
  const fr = rel(focus);
  return (
    <div
      style={{
        position: 'relative',
        width,
        height: h,
        borderRadius: tokens.radius.card,
        overflow: 'hidden',
        boxShadow: `0 40px 90px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,255,255,0.12)`,
        clipPath: `inset(0 0 ${(1 - open) * 100}% 0 round ${tokens.radius.card}px)`,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: `${fr.left + fr.width / 2}px ${fr.top + fr.height / 2}px` }}>
        <Img
          src={assetSrc(ASSET_FILES.screenshot)}
          style={{ position: 'absolute', left: -crop.x * k, top: -crop.y * k, width: screenshot.width * k, height: screenshot.height * k }}
        />
        {masks.map((m, i) => (
          <div key={i} style={{ position: 'absolute', ...rel(m), backdropFilter: 'blur(18px)', background: 'rgba(10,12,18,0.55)', borderRadius: 10 }} />
        ))}
        <div
          style={{
            position: 'absolute',
            left: fr.left - 10,
            top: fr.top - 10,
            width: fr.width + 20,
            height: fr.height + 20,
            borderRadius: 18,
            border: `4px solid ${C.upworkGreen}`,
            boxShadow: `0 0 30px ${C.upworkGreen}66`,
            opacity: f,
            transform: `scale(${1.15 - 0.15 * f})`,
          }}
        />
      </div>
    </div>
  );
};
