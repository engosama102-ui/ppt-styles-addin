import React from 'react';
import { BarChart } from '../components/ChartAnimation';
import { Icon, IconName } from '../components/Icons';
import { SlideSlot } from '../components/PresentationMockup';
import { deckSections, marketBars, modelSteps, roadmap, strategyPillars, summaryKpis } from '../data/presentations';
import { Card, Num, Pill, SlideCanvas, sc } from './SlideKit';

const accents = [sc.blue, sc.cyan, sc.gold];

export const StrategySlide: React.FC = () => (
  <SlideCanvas kicker="01 | Strategy overview" title="Three pillars drive the next phase" page={4}>
    <div style={{ display: 'flex', gap: 40, height: '100%' }}>
      {strategyPillars.map((p, i) => (
        <Card key={p.title} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22, borderTop: `8px solid ${accents[i]}` }}>
          <div style={{ width: 84, height: 84, borderRadius: 22, background: `${accents[i]}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={(['chart', 'layers', 'users'] as IconName[])[i]} size={50} color={[sc.blue, '#0E97A8', '#C99700'][i]} />
          </div>
          <div style={{ fontSize: 46, fontWeight: 700 }}>{p.title}</div>
          <div style={{ fontSize: 30, color: sc.slideMuted, lineHeight: 1.45 }}>{p.body}</div>
          <div style={{ marginTop: 'auto', fontSize: 70, fontWeight: 800, color: sc.slideLine }}>0{i + 1}</div>
        </Card>
      ))}
    </div>
  </SlideCanvas>
);

export const MarketSlide: React.FC<{ p?: number }> = ({ p = 1 }) => (
  <SlideCanvas kicker="02 | Market opportunity" title="A market growing twice as fast" page={7}>
    <div style={{ display: 'flex', gap: 60, height: '100%' }}>
      <div style={{ width: 540, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
        <Pill>Target market size</Pill>
        <div style={{ fontSize: 150, fontWeight: 800, color: sc.slideInk, lineHeight: 1.05 }}>
          $12.4<span style={{ fontSize: 70, color: sc.blue }}>B</span>
        </div>
        <div style={{ fontSize: 30, color: sc.slideMuted, lineHeight: 1.45 }}>
          Compound annual growth of about <b style={{ color: '#C99700' }}>24%</b> through 2026
        </div>
      </div>
      <Card style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
        <BarChart data={marketBars} p={p} width={720} height={470} fontSize={24} />
      </Card>
    </div>
  </SlideCanvas>
);

export const ModelSlide: React.FC = () => (
  <SlideCanvas kicker="03 | Business model" title="Value flows from partner to customer" page={11}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 22, height: '72%' }}>
      {modelSteps.map((s, i) => (
        <React.Fragment key={s}>
          <Card
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 24,
              background: i === 3 ? sc.slideInk : '#fff',
              color: i === 3 ? '#fff' : sc.slideInk,
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 700, color: i === 3 ? sc.gold : sc.blue }}>0{i + 1}</div>
            <div style={{ fontSize: 40, fontWeight: 700 }}>{s}</div>
          </Card>
          {i < modelSteps.length - 1 && <Icon name="arrow" size={54} color={sc.cyan} stroke={4} style={{ transform: 'rotate(180deg)' }} />}
        </React.Fragment>
      ))}
    </div>
    <div style={{ marginTop: 34, fontSize: 28, color: sc.slideMuted }}>Subscription revenue with flexible add-on services</div>
  </SlideCanvas>
);

export const RoadmapSlide: React.FC = () => (
  <SlideCanvas kicker="04 | Roadmap" title="Three phases to 2027" page={15}>
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ position: 'absolute', top: 120, left: 40, right: 40, height: 8, borderRadius: 4, background: `linear-gradient(90deg, ${sc.blue}, ${sc.cyan}, ${sc.gold})` }} />
      <div style={{ display: 'flex', gap: 50, position: 'absolute', inset: 0 }}>
        {roadmap.map((r, i) => (
          <div key={r.year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ fontSize: 54, fontWeight: 800, color: i === 2 ? '#C99700' : sc.slideInk }}>{r.year}</div>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: '#fff', border: `8px solid ${accents[i]}`, marginTop: 4, boxSizing: 'border-box' }} />
            <Card style={{ width: '100%', marginTop: 20 }}>
              <div style={{ fontSize: 40, fontWeight: 700 }}>{r.title}</div>
              <div style={{ fontSize: 28, color: sc.slideMuted, marginTop: 10 }}>{r.body}</div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </SlideCanvas>
);

export const SummarySlide: React.FC = () => (
  <SlideCanvas kicker="05 | Executive summary" title="Profitable growth, measured risk" page={19}>
    <div style={{ display: 'flex', gap: 36 }}>
      {summaryKpis.map((k, i) => (
        <Card key={k.label} style={{ flex: 1, background: i === 0 ? sc.slideInk : '#fff', color: i === 0 ? '#fff' : sc.slideInk }}>
          <div style={{ fontSize: 104, fontWeight: 800, color: i === 0 ? sc.gold : sc.blue, lineHeight: 1.1 }}>
            <Num>{k.value}</Num>
          </div>
          <div style={{ fontSize: 30, marginTop: 8, color: i === 0 ? '#C9D6E8' : sc.slideMuted }}>{k.label}</div>
        </Card>
      ))}
    </div>
    <div style={{ marginTop: 40, fontSize: 34, fontWeight: 500, lineHeight: 1.45, borderLeft: `8px solid ${sc.gold}`, paddingLeft: 28 }}>
      Recommendation: approve phase-two expansion next quarter
    </div>
  </SlideCanvas>
);

export const deckComponents: Record<string, React.FC> = {
  presentationStrategy: StrategySlide,
  presentationMarket: MarketSlide,
  presentationModel: ModelSlide,
  presentationRoadmap: RoadmapSlide,
  presentationSummary: SummarySlide,
};

/** Geometry of the agenda thumbnails (used by the Section Zoom camera). */
export const THUMB_W = 380;
export const THUMB_H = (THUMB_W * 9) / 16;
export const overviewRects = (() => {
  const y1 = 250;
  const y2 = y1 + THUMB_H + 76;
  const row1 = [120, 120 + THUMB_W + 50, 120 + (THUMB_W + 50) * 2];
  const start2 = (1600 - (THUMB_W * 2 + 50)) / 2;
  const row2 = [start2, start2 + THUMB_W + 50];
  return [
    ...row1.map((x) => ({ x, y: y1, w: THUMB_W, h: THUMB_H })),
    ...row2.map((x) => ({ x, y: y2, w: THUMB_W, h: THUMB_H })),
  ];
})();

/** Agenda slide: every section is a live thumbnail that can be zoomed into. */
export const OverviewSlide: React.FC<{ activeIndex?: number; highlight?: number }> = ({ activeIndex = -1, highlight = 0 }) => (
  <SlideCanvas>
    <div style={{ position: 'absolute', top: -170, left: 10, fontSize: 24, fontWeight: 700, color: sc.blue, letterSpacing: 2 }}>INVESTOR DECK</div>
    <div style={{ position: 'absolute', top: -132, left: 10, fontSize: 56, fontWeight: 700, color: sc.slideInk }}>Agenda</div>
    <div style={{ position: 'absolute', top: -240, left: -110, width: 1600, height: 900 }}>
      {deckSections.map((s, i) => {
        const r = overviewRects[i];
        const Comp = deckComponents[s.id];
        const on = i === activeIndex ? highlight : 0;
        return (
          <div key={s.id} style={{ position: 'absolute', left: r.x, top: r.y, width: r.w }}>
            <div
              style={{
                width: r.w,
                height: r.h,
                borderRadius: 10,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: `0 10px 26px rgba(19,16,51,0.12), 0 0 0 ${2 + on * 3}px ${on > 0 ? sc.gold : sc.slideLine}`,
              }}
            >
              <div style={{ position: 'absolute', left: 0, top: 0, width: 1600, height: 900, transform: `scale(${r.w / 1600})`, transformOrigin: '0 0' }}>
                <SlideSlot id={s.id}>
                  <Comp />
                </SlideSlot>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, fontSize: 26, fontWeight: 600, color: sc.slideInk }}>
              <span style={{ color: sc.blue, fontWeight: 700 }}>{s.no}</span>
              {s.title}
            </div>
          </div>
        );
      })}
    </div>
  </SlideCanvas>
);
