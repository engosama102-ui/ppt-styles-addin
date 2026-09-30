import React from 'react';
import { useCurrentFrame } from 'remotion';
import { brand } from '../config/brand';
import { HeadlineLines } from '../data/scenes';
import { easeOut, progress } from '../lib/motion';
import { txt } from '../lib/text';

const c = brand.colors;

/**
 * Large headline. Each line is revealed through a mask with a
 * blur-to-sharp rise; highlighted segments turn gold and get an underline
 * that draws from left to right.
 */
export const Headline: React.FC<{
  lines: HeadlineLines;
  startSec?: number;
  stagger?: number;
  size?: number;
  weight?: number;
  align?: 'center' | 'right';
  color?: string;
  lineHeight?: number;
  underline?: boolean;
}> = ({ lines, startSec = 0, stagger = 0.18, size = 84, weight = 700, align = 'center', color = c.white, lineHeight = 1.32, underline = true }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ ...txt, textAlign: align, fontSize: size, fontWeight: weight, color, lineHeight }}>
      {lines.map((segments, li) => {
        const s = startSec + li * stagger;
        const p = progress(frame, s, 0.75, easeOut);
        const u = progress(frame, s + 0.45, 0.55);
        return (
          <div key={li} style={{ overflow: 'hidden', paddingBottom: size * 0.16, marginBottom: -size * 0.1 }}>
            <div
              style={{
                transform: `translateY(${(1 - p) * 70}%)`,
                opacity: Math.min(1, p * 1.4),
                filter: p < 1 ? `blur(${(1 - p) * 10}px)` : undefined,
              }}
            >
              {segments.map((seg, si) =>
                seg.hl ? (
                  <span key={si} style={{ position: 'relative', display: 'inline-block', color: c.gold }}>
                    {seg.t}
                    {underline && (
                      <span
                        style={{
                          position: 'absolute',
                          right: 0,
                          left: 0,
                          bottom: size * 0.02,
                          height: Math.max(4, size * 0.07),
                          borderRadius: 4,
                          background: c.gold,
                          transformOrigin: 'left center',
                          transform: `scaleX(${u})`,
                          opacity: 0.9,
                        }}
                      />
                    )}
                  </span>
                ) : (
                  <span key={si}>{seg.t}</span>
                ),
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Small gold number badge used above service titles. */
export const NumberBadge: React.FC<{ n: string; startSec?: number }> = ({ n, startSec = 0 }) => {
  const frame = useCurrentFrame();
  const p = progress(frame, startSec, 0.5, easeOut);
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 14,
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
        fontFamily: txt.fontFamily,
      }}
    >
      <div style={{ width: 70 * p, height: 3, background: c.gold, borderRadius: 2 }} />
      <div
        style={{
          fontSize: 30,
          fontWeight: 700,
          color: c.navy,
          background: c.gold,
          padding: '4px 16px',
          borderRadius: 12,
          letterSpacing: 1,
        }}
      >
        {n}
      </div>
      <div style={{ width: 70 * p, height: 3, background: c.gold, borderRadius: 2 }} />
    </div>
  );
};

/** Badge + headline, centered, used at the top of every service scene. */
export const SceneTitle: React.FC<{ n?: string; lines: HeadlineLines; top?: number; size?: number; startSec?: number }> = ({
  n,
  lines,
  top = 318,
  size = 76,
  startSec = 0.1,
}) => (
  <div style={{ position: 'absolute', top, left: 70, right: 70, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
    {n && <NumberBadge n={n} startSec={startSec} />}
    <Headline lines={lines} size={size} startSec={startSec + 0.15} />
  </div>
);
