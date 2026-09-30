import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SceneTitle } from '../components/ArabicHeadline';
import { BarChart, Counter, DonutChart } from '../components/ChartAnimation';
import { brand } from '../config/brand';
import { dashboardBars, dashboardKpis, denseTable, donut, timeline } from '../data/presentations';
import { data as dataScene } from '../data/scenes';
import { easeOut, progress } from '../lib/motion';
import { rtl } from '../lib/text';
import { SceneFrame, SceneProps, useBeats } from './common';

const c = brand.colors;

const Panel: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
  <div
    style={{
      background: c.slideBg,
      borderRadius: 22,
      boxShadow: '0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.10)',
      boxSizing: 'border-box',
      position: 'absolute',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Scene06Data: React.FC<SceneProps> = ({ duration }) => {
  const frame = useCurrentFrame();
  const b = useBeats('data', duration);
  const L = 80;
  const W = 920;
  const top = 560;

  const tableIn = progress(frame, 0.3, 0.6, easeOut);
  const tableOut = progress(frame, b(2.4), 0.8);
  const kpiIn = (i: number) => progress(frame, b(2.9) + i * 0.15, 0.6, easeOut);
  const count = progress(frame, b(3.1), 1.6, easeOut);
  const charts = progress(frame, b(3.8), 0.7, easeOut);
  const bars = progress(frame, b(4.1), 1.4);
  const donutP = progress(frame, b(4.4), 1.4);
  const tl = progress(frame, b(5.6), 0.6, easeOut);
  const tlLine = progress(frame, b(5.9), 1.6);

  return (
    <SceneFrame duration={duration}>
      <SceneTitle n={dataScene.number} lines={dataScene.title} />

      {/* Dense table that dissolves into the dashboard */}
      {tableOut < 1 && (
        <Panel
          style={{
            top,
            left: L,
            width: W,
            padding: 30,
            opacity: tableIn * (1 - tableOut),
            transform: `translateY(${(1 - tableIn) * 40}px) scale(${1 - tableOut * 0.08})`,
            filter: tableOut > 0 ? `blur(${tableOut * 10}px)` : undefined,
          }}
        >
          <div style={{ ...rtl, fontSize: 24, color: c.slideInk }}>
            <div style={{ display: 'flex', fontWeight: 700, borderBottom: `2px solid ${c.slideLine}`, paddingBottom: 10 }}>
              {denseTable.head.map((h, i) => (
                <div key={h} style={{ flex: i === 0 ? 1.6 : 1 }}>
                  {h}
                </div>
              ))}
            </div>
            {denseTable.rows.map((r, ri) => (
              <div key={ri} style={{ display: 'flex', padding: '13px 0', borderBottom: `1px solid ${c.slideLine}`, color: ri % 2 ? '#56657A' : c.slideInk, transform: `scaleY(${1 - Math.max(0, Math.min(1, tableOut * 2 - ri * 0.12))})` }}>
                {r.map((cell, ci) => (
                  <div key={ci} style={{ flex: ci === 0 ? 1.6 : 1, direction: ci === 0 ? 'rtl' : 'ltr', textAlign: 'right' }}>
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Panel>
      )}

      {/* KPI cards */}
      <div style={{ position: 'absolute', top, left: L, width: W, display: 'flex', gap: 16, direction: 'rtl' }}>
        {dashboardKpis.map((k, i) => {
          const p = kpiIn(i);
          return (
            <div
              key={k.label}
              style={{
                ...rtl,
                flex: 1,
                height: 170,
                borderRadius: 20,
                padding: '20px 22px',
                boxSizing: 'border-box',
                background: i === 0 ? c.gold : 'rgba(255,255,255,0.06)',
                border: i === 0 ? 'none' : '1.5px solid rgba(255,255,255,0.12)',
                color: i === 0 ? c.navy : c.white,
                opacity: p,
                transform: `translateY(${(1 - p) * 40}px)`,
              }}
            >
              <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.1 }}>
                <Counter value={k.value} p={count} decimals={k.decimals} suffix={k.suffix} noGrouping={k.noGrouping} />
              </div>
              <div style={{ fontSize: 24, marginTop: 10, color: i === 0 ? c.navy : c.gray }}>{k.label}</div>
            </div>
          );
        })}
      </div>

      {/* Bar chart + donut */}
      <Panel style={{ top: top + 196, right: L, width: 560, height: 340, padding: 28, opacity: charts, transform: `translateY(${(1 - charts) * 40}px)` }}>
        <div style={{ ...rtl, fontSize: 26, fontWeight: 700, color: c.slideInk }}>الإيرادات الفصلية</div>
        <div style={{ marginTop: 16 }}>
          <BarChart data={dashboardBars} p={bars} width={504} height={240} showValues fontSize={22} />
        </div>
      </Panel>
      <Panel
        style={{
          top: top + 196,
          left: L,
          width: 344,
          height: 340,
          padding: 24,
          opacity: charts,
          transform: `translateY(${(1 - charts) * 40}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ ...rtl, fontSize: 26, fontWeight: 700, color: c.slideInk, alignSelf: 'stretch' }}>قنوات البيع</div>
        <div style={{ marginTop: 12 }}>
          <DonutChart
            data={donut}
            p={donutP}
            size={190}
            thickness={30}
            center={
              <div style={{ fontSize: 40, fontWeight: 700, color: c.slideInk }}>
                <Counter value={68} p={donutP} suffix="%" />
              </div>
            }
          />
        </div>
        <div style={{ ...rtl, display: 'flex', gap: 14, fontSize: 20, color: c.slideMuted, marginTop: 14 }}>
          {donut.map((d, i) => (
            <span key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 12, borderRadius: 6, background: [c.blue, c.cyan, c.gold][i] }} />
              {d.label}
            </span>
          ))}
        </div>
      </Panel>

      {/* Timeline / process strip */}
      <Panel style={{ top: top + 556, left: L, width: W, height: 150, padding: '26px 50px', opacity: tl, transform: `translateY(${(1 - tl) * 30}px)` }}>
        <div style={{ position: 'relative', height: '100%' }}>
          <div style={{ position: 'absolute', top: 18, right: 20, left: 20, height: 6, borderRadius: 3, background: c.slideLine }} />
          <div
            style={{
              position: 'absolute',
              top: 18,
              right: 20,
              width: `calc((100% - 40px) * ${tlLine})`,
              height: 6,
              borderRadius: 3,
              background: `linear-gradient(270deg, ${c.blue}, ${c.gold})`,
            }}
          />
          <div style={{ ...rtl, position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between' }}>
            {timeline.map((s, i) => {
              const on = tlLine >= i / (timeline.length - 1) - 0.01;
              return (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: 120 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 21, background: on ? (i === timeline.length - 1 ? c.gold : c.blue) : '#fff', border: `4px solid ${on ? '#fff' : c.slideLine}`, boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }} />
                  <div style={{ fontSize: 26, fontWeight: 600, color: c.slideInk }}>{s}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Panel>

      <div style={{ ...rtl, position: 'absolute', top: top + 722, right: L, fontSize: 22, color: c.gray, opacity: tl * 0.8 }}>{dataScene.note}</div>
    </SceneFrame>
  );
};
