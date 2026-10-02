import React from 'react';
import { useCurrentFrame } from 'remotion';
import { prog } from '../lib/motion';
import { C } from '../styles/tokens';

export type Seg = { t: string; tone?: 'primary' | 'green' | 'muted' | 'past' };

const toneColor = (tone?: Seg['tone']) =>
  tone === 'primary' ? C.elevateAccentText : tone === 'green' ? C.upworkGreen : tone === 'muted' ? C.elevateMuted : tone === 'past' ? C.past : C.elevateText;

/**
 * Word-by-word masked reveal. Each word rises out of its own mask,
 * while tracking tightens slightly as the line settles.
 */
export const KineticHeadline: React.FC<{
  lines: Seg[][];
  start?: number;
  size?: number;
  weight?: number;
  stagger?: number;
  lineGap?: number;
  align?: 'left' | 'center';
  lineHeight?: number;
  style?: React.CSSProperties;
}> = ({ lines, start = 0, size = 64, weight = 700, stagger = 0.05, lineGap = 0.12, align = 'center', lineHeight = 1.12, style }) => {
  const frame = useCurrentFrame();
  let w = 0;
  return (
    <div style={{ fontSize: size, fontWeight: weight, lineHeight, textAlign: align, letterSpacing: '-0.02em', ...style }}>
      {lines.map((segs, li) => (
        <div key={li} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', columnGap: size * 0.26 }}>
          {segs.flatMap((seg, si) =>
            seg.t.split(' ').filter(Boolean).map((word, wi) => {
              const t0 = start + li * lineGap + w++ * stagger;
              const p = prog(frame, t0, 0.55);
              return (
                <span key={`${si}-${wi}`} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: size * 0.12, marginBottom: -size * 0.12 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      transform: `translateY(${(1 - p) * 105}%)`,
                      color: toneColor(seg.tone),
                      letterSpacing: `${(1 - p) * 0.06}em`,
                    }}
                  >
                    {word}
                  </span>
                </span>
              );
            }),
          )}
        </div>
      ))}
    </div>
  );
};
