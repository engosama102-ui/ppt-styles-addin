import React from 'react';
import { C } from '../styles/tokens';

type Pt = [number, number];

/** Dense Catmull-Rom sampling so the line curves smoothly through its points. */
const sample = (pts: Pt[], steps = 24): Pt[] => {
  if (pts.length < 3) {
    const out: Pt[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      out.push([pts[0][0] + (pts[1][0] - pts[0][0]) * t, pts[0][1] + (pts[1][1] - pts[0][1]) * t]);
    }
    return out;
  }
  const out: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
};

const lengthOf = (s: Pt[]) => {
  let L = 0;
  for (let i = 1; i < s.length; i++) L += Math.hypot(s[i][0] - s[i - 1][0], s[i][1] - s[i - 1][1]);
  return L;
};

const pointAt = (s: Pt[], d: number): Pt => {
  let acc = 0;
  for (let i = 1; i < s.length; i++) {
    const seg = Math.hypot(s[i][0] - s[i - 1][0], s[i][1] - s[i - 1][1]);
    if (acc + seg >= d) {
      const t = (d - acc) / (seg || 1);
      return [s[i - 1][0] + (s[i][0] - s[i - 1][0]) * t, s[i - 1][1] + (s[i][1] - s[i - 1][1]) * t];
    }
    acc += seg;
  }
  return s[s.length - 1];
};

/**
 * The trust line: a thin money-flow path that draws itself (`draw` 0 → 1)
 * and can carry glowing pulses (`pulses`, each 0 → 1 along the path).
 */
export const MoneyFlow: React.FC<{
  points: Pt[];
  draw: number;
  color?: string;
  width?: number;
  opacity?: number;
  pulses?: number[];
  pulseColor?: string;
  dashed?: boolean;
  w?: number;
  h?: number;
}> = ({ points, draw, color = C.elevatePrimary, width = 4, opacity = 1, pulses = [], pulseColor, dashed, w = 1080, h = 1350 }) => {
  const s = sample(points);
  const L = lengthOf(s);
  const d = s.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  return (
    <svg width={w} height={h} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', opacity }}>
      <path d={d} fill="none" stroke={color} strokeOpacity={0.18} strokeWidth={width * 3.5} strokeLinecap="round" strokeDasharray={`${L * draw} ${L}`} />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? '2 14' : `${L * draw} ${L}`}
        style={dashed ? { clipPath: undefined } : undefined}
      />
      {pulses
        .filter((p) => p > 0 && p < 1)
        .map((p, i) => {
          const [x, y] = pointAt(s, L * p);
          const pc = pulseColor ?? color;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={18} fill={pc} opacity={0.18} />
              <circle cx={x} cy={y} r={8} fill={pc} />
            </g>
          );
        })}
    </svg>
  );
};
