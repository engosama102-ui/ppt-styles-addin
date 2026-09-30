import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { brand } from '../config/brand';
import { clamp, ease, easeOut, progress } from '../lib/motion';
import { rtl } from '../lib/text';
import { Icon, IconName } from './Icons';

const c = brand.colors;

/**
 * Vertical process with a progress line that travels through each step.
 * `stepTimes` are local seconds at which each step becomes active.
 */
export const ProgressSteps: React.FC<{
  steps: { label: string; sub: string; icon: string }[];
  stepTimes: number[];
  rowH?: number;
}> = ({ steps, stepTimes, rowH = 150 }) => {
  const frame = useCurrentFrame();
  const fps = 30;
  const n = steps.length;
  // Progress line position measured in rows.
  let pos = 0;
  stepTimes.forEach((t, i) => {
    if (i === 0) return;
    pos += interpolate(frame, [(t - 0.5) * fps, t * fps], [0, 1], { ...clamp, easing: ease });
  });
  const lineStart = progress(frame, stepTimes[0] - 0.3, 0.4);
  const ICON = 92;
  const railRight = 40 + ICON / 2;

  return (
    <div style={{ position: 'relative', width: 900, height: rowH * n }}>
      {/* rail */}
      <div
        style={{
          position: 'absolute',
          right: railRight - 2,
          top: ICON / 2,
          width: 4,
          height: rowH * (n - 1),
          background: 'rgba(255,255,255,0.10)',
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: railRight - 2,
          top: ICON / 2,
          width: 4,
          height: rowH * pos * lineStart,
          background: `linear-gradient(180deg, ${c.cyan}, ${c.gold})`,
          borderRadius: 2,
          boxShadow: `0 0 16px ${c.gold}66`,
        }}
      />
      {steps.map((s, i) => {
        const appear = progress(frame, stepTimes[0] - 0.6 + i * 0.12, 0.5, easeOut);
        const on = interpolate(frame, [(stepTimes[i] - 0.3) * fps, stepTimes[i] * fps], [0, 1], clamp);
        return (
          <div
            key={s.label}
            style={{
              ...rtl,
              position: 'absolute',
              top: i * rowH,
              right: 40,
              left: 0,
              height: ICON,
              display: 'flex',
              alignItems: 'center',
              gap: 34,
              opacity: appear * (0.45 + 0.55 * on),
              transform: `translateX(${(1 - appear) * -40}px)`,
            }}
          >
            <div
              style={{
                width: ICON,
                height: ICON,
                flex: 'none',
                borderRadius: 26,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: on > 0.5 ? c.gold : c.darkBlue,
                border: `2px solid ${on > 0.5 ? c.gold : 'rgba(255,255,255,0.14)'}`,
                boxShadow: on > 0.5 ? `0 0 30px ${c.gold}55` : 'none',
                transform: `scale(${1 + 0.06 * on})`,
              }}
            >
              <Icon name={s.icon as IconName} size={46} color={on > 0.5 ? c.navy : c.cyan} stroke={3.2} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 44, fontWeight: 700, color: c.white, lineHeight: 1.25 }}>
                <span style={{ color: c.gold, marginLeft: 16, fontWeight: 600 }}>{i + 1}</span>
                {s.label}
              </div>
              <div style={{ fontSize: 28, color: c.gray, lineHeight: 1.3 }}>{s.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
