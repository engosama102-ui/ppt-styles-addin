import React from 'react';
import { BarChart } from '../components/ChartAnimation';
import { Icon, IconName } from '../components/Icons';
import { SlideSlot } from '../components/PresentationMockup';
import { deckSections, marketBars, modelSteps, roadmap, strategyPillars, summaryKpis } from '../data/presentations';
import { Card, Num, Pill, SlideCanvas, sc } from './SlideKit';

export const StrategySlide: React.FC = () => (
  <SlideCanvas kicker="01 | نظرة استراتيجية" title="ثلاث ركائز تقود المرحلة القادمة" page={4}>
    <div style={{ display: 'flex', gap: 40, height: '100%' }}>
      {strategyPillars.map((p, i) => (
        <Card key={p.title} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22, borderTop: `8px solid ${[sc.blue, sc.cyan, sc.gold][i]}` }}>
          <div style={{ width: 84, height: 84, borderRadius: 22, background: `${[sc.blue, sc.cyan, sc.gold][i]}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={(['chart', 'layers', 'users'] as IconName[])[i]} size={50} color={[sc.blue, '#12A2B3', '#C99700'][i]} />
          </div>
          <div style={{ fontSize: 50, fontWeight: 700 }}>{p.title}</div>
          <div style={{ fontSize: 32, color: sc.slideMuted, lineHeight: 1.5 }}>{p.body}</div>
          <div style={{ marginTop: 'auto', fontSize: 70, fontWeight: 700, color: sc.slideLine }}>
            <Num>0{i + 1}</Num>
          </div>
        </Card>
      ))}
    </div>
  </SlideCanvas>
);

export const MarketSlide: React.FC<{ p?: number }> = ({ p = 1 }) => (
  <SlideCanvas kicker="02 | فرصة السوق" title="سوق ينمو بمعدل مضاعف" page={7}>
    <div style={{ display: 'flex', gap: 60, height: '100%' }}>
      <div style={{ width: 520, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
        <Pill>حجم السوق المستهدف</Pill>
        <div style={{ fontSize: 150, fontWeight: 700, color: sc.slideInk, lineHeight: 1.1 }}>
          <Num>12.4</Num>
          <span style={{ fontSize: 60, color: sc.blue }}> مليار</span>
        </div>
        <div style={{ fontSize: 32, color: sc.slideMuted, lineHeight: 1.5 }}>نمو سنوي مركب يقارب <b style={{ color: '#C99700' }}><Num>24%</Num></b> حتى عام 2026</div>
      </div>
      <Card style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
        <BarChart data={marketBars} p={p} width={740} height={470} fontSize={26} />
      </Card>
    </div>
  </SlideCanvas>
);

export const ModelSlide: React.FC = () => (
  <SlideCanvas kicker="03 | نموذج العمل" title="قيمة تنتقل من الشريك إلى العميل" page={11}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 22, height: '72%' }}>
      {modelSteps.map((s, i) => (
        <React.Fragment key={s}>
          <Card style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 24, background: i === 3 ? sc.slideInk : '#fff', color: i === 3 ? '#fff' : sc.slideInk }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: i === 3 ? sc.gold : sc.blue }}>
              <Num>0{i + 1}</Num>
            </div>
            <div style={{ fontSize: 46, fontWeight: 700 }}>{s}</div>
          </Card>
          {i < modelSteps.length - 1 && <Icon name="arrow" size={54} color={sc.cyan} stroke={4} />}
        </React.Fragment>
      ))}
    </div>
    <div style={{ marginTop: 34, fontSize: 30, color: sc.slideMuted }}>نموذج إيرادات قائم على الاشتراك مع خدمات إضافية مرنة</div>
  </SlideCanvas>
);

export const RoadmapSlide: React.FC = () => (
  <SlideCanvas kicker="04 | خارطة الطريق" title="ثلاث مراحل حتى 2027" page={15}>
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ position: 'absolute', top: 120, left: 40, right: 40, height: 8, borderRadius: 4, background: `linear-gradient(270deg, ${sc.blue}, ${sc.cyan}, ${sc.gold})` }} />
      <div style={{ display: 'flex', gap: 50, position: 'absolute', inset: 0 }}>
        {roadmap.map((r, i) => (
          <div key={r.year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ fontSize: 56, fontWeight: 700, color: i === 2 ? '#C99700' : sc.slideInk }}>
              <Num>{r.year}</Num>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: '#fff', border: `8px solid ${[sc.blue, sc.cyan, sc.gold][i]}`, marginTop: 4 }} />
            <Card style={{ width: '100%', marginTop: 20 }}>
              <div style={{ fontSize: 44, fontWeight: 700 }}>{r.title}</div>
              <div style={{ fontSize: 30, color: sc.slideMuted, marginTop: 10 }}>{r.body}</div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </SlideCanvas>
);

export const SummarySlide: React.FC = () => (
  <SlideCanvas kicker="05 | الملخص التنفيذي" title="نمو مربح بمخاطر محسوبة" page={19}>
    <div style={{ display: 'flex', gap: 36 }}>
      {summaryKpis.map((k, i) => (
        <Card key={k.label} style={{ flex: 1, background: i === 0 ? sc.slideInk : '#fff', color: i === 0 ? '#fff' : sc.slideInk }}>
          <div style={{ fontSize: 110, fontWeight: 700, color: i === 0 ? sc.gold : sc.blue, lineHeight: 1.1 }}>
            <Num>{k.value}</Num>
          </div>
          <div style={{ fontSize: 34, marginTop: 8, color: i === 0 ? '#C9D6E8' : sc.slideMuted }}>{k.label}</div>
        </Card>
      ))}
    </div>
    <div style={{ marginTop: 40, fontSize: 36, fontWeight: 500, lineHeight: 1.5, borderRight: `8px solid ${sc.gold}`, paddingRight: 28 }}>
      التوصية: اعتماد خطة التوسع للمرحلة الثانية خلال الربع القادم
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
  const row1 = [1600 - 120 - THUMB_W, 1600 - 120 - THUMB_W * 2 - 50, 120];
  const start2 = (1600 - (THUMB_W * 2 + 50)) / 2;
  const row2 = [start2 + THUMB_W + 50, start2];
  return [
    ...row1.map((x) => ({ x, y: y1, w: THUMB_W, h: THUMB_H })),
    ...row2.map((x) => ({ x, y: y2, w: THUMB_W, h: THUMB_H })),
  ];
})();

/** Agenda slide: every section is a live thumbnail that can be zoomed into. */
export const OverviewSlide: React.FC<{ activeIndex?: number; highlight?: number }> = ({ activeIndex = -1, highlight = 0 }) => (
  <SlideCanvas>
    <div style={{ position: 'absolute', top: -170, right: 10, fontSize: 26, fontWeight: 600, color: sc.blue }}>عرض المستثمرين</div>
    <div style={{ position: 'absolute', top: -132, right: 10, fontSize: 60, fontWeight: 700, color: sc.slideInk }}>جدول الأعمال</div>
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
              boxShadow: `0 10px 26px rgba(11,31,56,0.12), 0 0 0 ${2 + on * 3}px ${on > 0 ? sc.gold : sc.slideLine}`,
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, width: 1600, height: 900, transform: `scale(${r.w / 1600})`, transformOrigin: '0 0' }}>
              <SlideSlot id={s.id}>
                <Comp />
              </SlideSlot>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, fontSize: 28, fontWeight: 600, color: sc.slideInk, direction: 'rtl' }}>
            <span style={{ color: sc.blue, direction: 'ltr' }}>{s.no}</span>
            {s.title}
          </div>
        </div>
      );
    })}
    </div>
  </SlideCanvas>
);
