import React from 'react';
import { brand } from '../config/brand';
import { FONT } from '../lib/fonts';

const c = brand.colors;

/** Vertical bar chart. `p` grows bars from 0 to full with a small stagger. */
export const BarChart: React.FC<{
  data: { label: string; value: number }[];
  p: number;
  width: number;
  height: number;
  color?: string;
  highlightLast?: boolean;
  labelColor?: string;
  showValues?: boolean;
  reverseOrder?: boolean;
  fontSize?: number;
}> = ({ data, p, width, height, color = c.blue, highlightLast = true, labelColor = c.slideMuted, showValues = false, reverseOrder = false, fontSize = 24 }) => {
  const max = Math.max(...data.map((d) => d.value));
  const n = data.length;
  const gap = width / n;
  const bw = gap * 0.56;
  const chartH = height - fontSize * 2;
  const ordered = reverseOrder ? [...data].reverse() : data;
  return (
    <svg width={width} height={height} style={{ overflow: 'visible', fontFamily: FONT }}>
      <line x1={0} x2={width} y1={chartH} y2={chartH} stroke={c.slideLine} strokeWidth={2} />
      {ordered.map((d, i) => {
        const order = reverseOrder ? n - 1 - i : i;
        const local = Math.min(1, Math.max(0, p * 1.4 - order * 0.1));
        const h = (d.value / max) * (chartH - 20) * local;
        const x = i * gap + (gap - bw) / 2;
        const isLast = highlightLast && order === n - 1;
        return (
          <g key={d.label}>
            <rect x={x} y={chartH - h} width={bw} height={h} rx={bw * 0.12} fill={isLast ? c.gold : color} opacity={isLast ? 1 : 0.9} />
            {showValues && local > 0.8 && (
              <text x={x + bw / 2} y={chartH - h - 12} textAnchor="middle" fontSize={fontSize} fontWeight={700} fill={c.slideInk}>
                {d.value}
              </text>
            )}
            <text x={x + bw / 2} y={chartH + fontSize * 1.5} textAnchor="middle" fontSize={fontSize} fill={labelColor}>
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Donut chart drawn clockwise from 12 o'clock. */
export const DonutChart: React.FC<{
  data: { label: string; value: number }[];
  p: number;
  size: number;
  thickness?: number;
  colors?: string[];
  center?: React.ReactNode;
}> = ({ data, p, size, thickness = 26, colors = [c.blue, c.cyan, c.gold], center }) => {
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;
  const total = data.reduce((a, b) => a + b.value, 0);
  let acc = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={c.slideLine} strokeWidth={thickness} />
        {data.map((d, i) => {
          const frac = d.value / total;
          const shown = Math.max(0, Math.min(frac, p - acc));
          const el = (
            <circle
              key={d.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth={thickness}
              strokeDasharray={`${Math.max(0, shown * circ - 4)} ${circ}`}
              strokeDashoffset={-acc * circ}
            />
          );
          acc += frac;
          return el;
        })}
      </svg>
      {center && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{center}</div>
      )}
    </div>
  );
};

/** Animated number counter. */
export const Counter: React.FC<{ value: number; p: number; decimals?: number; suffix?: string; noGrouping?: boolean; style?: React.CSSProperties }> = ({
  value,
  p,
  decimals = 0,
  suffix = '',
  noGrouping,
  style,
}) => {
  const v = value * p;
  const txt = noGrouping
    ? v.toFixed(decimals)
    : v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span style={{ direction: 'ltr', unicodeBidi: 'isolate', display: 'inline-block', fontVariantNumeric: 'tabular-nums', ...style }}>
      {txt}
      {suffix}
    </span>
  );
};

/** Simple line chart. */
export const LineChart: React.FC<{ points: number[]; p: number; width: number; height: number; color?: string; strokeWidth?: number }> = ({
  points,
  p,
  width,
  height,
  color = c.cyan,
  strokeWidth = 5,
}) => {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const pts = points.map((v, i) => [(i / (points.length - 1)) * width, height - ((v - min) / (max - min || 1)) * height]);
  const d = pts.map((q, i) => `${i ? 'L' : 'M'}${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(' ');
  const len = width * 1.6;
  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
    </svg>
  );
};
