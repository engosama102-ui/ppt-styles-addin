import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { brand } from '../config/brand';
import { txt } from '../lib/text';
import { clamp, ease, sec } from '../lib/motion';

const c = brand.colors;
const BAR_W = 940;
const ITEM_W = BAR_W / brand.navigation.length;

/**
 * Slim section bar. `keys` lists the frame at which each tab becomes active,
 * the indicator glides between tabs.
 */
export const TopNavigation: React.FC<{ keys: number[]; showFrom: number; hideAt: number; top?: number }> = ({
  keys,
  showFrom,
  hideAt,
  top = 204,
}) => {
  const frame = useCurrentFrame();
  const inP = interpolate(frame, [showFrom, showFrom + sec(0.6)], [0, 1], { ...clamp, easing: ease });
  const outP = interpolate(frame, [hideAt - sec(0.4), hideAt], [1, 0], { ...clamp, easing: ease });
  const vis = Math.min(inP, outP);
  if (vis <= 0) return null;

  // Continuous active index for the sliding indicator.
  let idx = 0;
  keys.forEach((k, i) => {
    if (i === 0) return;
    idx += interpolate(frame, [k - sec(0.25), k + sec(0.35)], [0, 1], { ...clamp, easing: ease });
  });
  const active = Math.round(idx);
  // Item 0 sits at the left edge.
  const indicatorRight = idx * ITEM_W + ITEM_W * 0.2;

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: (1080 - BAR_W) / 2,
        width: BAR_W,
        height: 76,
        opacity: vis,
        transform: `translateY(${(1 - vis) * -24}px)`,
        borderRadius: 38,
        background: 'rgba(11,31,56,0.72)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
      }}
    >
      <div style={{ ...txt, display: 'flex', height: '100%' }}>
        {brand.navigation.map((item, i) => {
          const d = Math.abs(idx - i);
          const on = Math.max(0, 1 - d);
          return (
            <div
              key={item}
              style={{
                width: ITEM_W,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
                fontWeight: i === active ? 600 : 400,
                color: on > 0.5 ? c.white : c.gray,
                opacity: 0.6 + on * 0.4,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: indicatorRight,
          width: ITEM_W * 0.6,
          height: 4,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${c.cyan}, ${c.gold})`,
          boxShadow: `0 0 14px ${c.gold}88`,
        }}
      />
    </div>
  );
};
