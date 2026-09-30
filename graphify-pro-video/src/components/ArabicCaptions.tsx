import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { brand } from '../config/brand';
import { captions } from '../data/timeline';
import { clamp, easeOut } from '../lib/motion';
import { rtl } from '../lib/text';

const c = brand.colors;

/** Distance from the bottom edge, clear of platform UI (Reels, TikTok, LinkedIn). */
export const CAPTION_BOTTOM = 390;

export const ArabicCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const cap = captions.find((k) => frame >= k.from && frame < k.to);
  if (!cap) return null;
  const inP = interpolate(frame, [cap.from, cap.from + 8], [0, 1], { ...clamp, easing: easeOut });
  const outP = interpolate(frame, [cap.to - 5, cap.to], [1, 0], clamp);
  const o = Math.min(inP, outP);
  const words = cap.text.split(' ');
  const hl = new Set(cap.hl ?? []);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: CAPTION_BOTTOM,
        display: 'flex',
        justifyContent: 'center',
        opacity: o,
        transform: `translateY(${(1 - inP) * 22}px)`,
      }}
    >
      <div
        style={{
          ...rtl,
          textAlign: 'center',
          maxWidth: 880,
          padding: '16px 36px 20px',
          borderRadius: 24,
          background: 'rgba(5,14,27,0.74)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
          fontSize: 50,
          fontWeight: 600,
          lineHeight: 1.45,
          color: c.white,
        }}
      >
        {words.map((w, i) => (
          <React.Fragment key={i}>
            <span style={{ color: hl.has(w) ? c.gold : c.white }}>{w}</span>
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
