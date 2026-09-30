import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { SceneTitle } from '../components/ArabicHeadline';
import { PAGE_H, PAGE_W, Scaled, SlideSlot } from '../components/PresentationMockup';
import { brand } from '../config/brand';
import { reports } from '../data/scenes';
import { clamp, ease, lerp, progress, reveal } from '../lib/motion';
import { rtl } from '../lib/text';
import { SummarySlide } from '../slides/DeckSlides';
import { ReportCover, ReportEsg, ReportImpact, ReportProfile, ReportSummary } from '../slides/ReportPages';
import { SceneFrame, SceneProps, useBeats } from './common';

const c = brand.colors;
const PAGE_DW = 390; // displayed page width
const PAGE_DH = (PAGE_DW * PAGE_H) / PAGE_W;

const pages = [
  { id: 'reportCover', el: <ReportCover />, spread: false },
  { id: 'reportImpact', el: <ReportImpact />, spread: true },
  { id: 'reportEsg', el: <ReportEsg />, spread: false },
  { id: 'reportSummary', el: <ReportSummary />, spread: false },
  { id: 'reportProfile', el: <ReportProfile />, spread: false },
];

export const Scene05Reports: React.FC<SceneProps> = ({ duration }) => {
  const frame = useCurrentFrame();
  const b = useBeats('reports', duration);
  const t = frame / 30;
  const stageTop = 690;
  const cx = 540;

  // 1) Slide → portrait page morph
  const morph = progress(frame, b(1.4), 0.8);
  const fan = progress(frame, b(2.3), 0.8);
  // 2) Carousel focus index moves through the pages
  let focus = 0;
  [b(3.4), b(4.8), b(6.2), b(7.6)].forEach((k) => {
    focus += interpolate(t, [k, k + 0.7], [0, 1], { ...clamp, easing: ease });
  });

  const mw = lerp(920, PAGE_DW, morph);
  const mh = lerp((920 * 9) / 16, PAGE_DH, morph);

  return (
    <SceneFrame duration={duration}>
      <SceneTitle n={reports.number} lines={reports.title} size={70} />

      {fan < 1 && (
        <div
          style={{
            position: 'absolute',
            top: stageTop + (PAGE_DH - mh) / 2,
            left: cx - mw / 2,
            width: mw,
            height: mh,
            borderRadius: lerp(18, 10, morph),
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.1)',
            opacity: 1 - fan,
            ...(morph === 0 ? reveal(frame, 0.3, { dy: 60 }) : {}),
          }}
        >
          <div style={{ position: 'absolute', inset: 0, opacity: 1 - morph }}>
            <Scaled w={1600} h={900} width={mw}>
              <SummarySlide />
            </Scaled>
          </div>
          <div style={{ position: 'absolute', inset: 0, opacity: morph }}>
            <Scaled w={PAGE_W} h={PAGE_H} width={mw}>
              <ReportCover />
            </Scaled>
          </div>
        </div>
      )}

      {fan > 0 &&
        pages.map((pg, i) => {
          const d = i - focus; // distance from focused page
          const ad = Math.abs(d);
          const scale = (1 - Math.min(ad, 2) * 0.17) * lerp(0.9, 1, fan);
          // RTL carousel: next pages sit on the left.
          const x = cx - d * 300 * lerp(0.2, 1, fan);
          const w = pg.spread ? PAGE_DW * 1.55 : PAGE_DW;
          const h = pg.spread ? (w * PAGE_H) / (PAGE_W * 2) : PAGE_DH;
          const op = Math.max(0, 1 - Math.max(0, ad - 1.2) * 0.9) * fan;
          return (
            <div
              key={pg.id}
              style={{
                position: 'absolute',
                top: stageTop + (PAGE_DH - h) / 2,
                left: x - w / 2,
                width: w,
                height: h,
                transform: `scale(${scale})`,
                zIndex: 10 - Math.round(ad * 2),
                opacity: op,
                filter: ad > 0.5 ? `brightness(${1 - Math.min(ad, 2) * 0.22})` : undefined,
                borderRadius: 10,
                overflow: 'hidden',
                boxShadow: '0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.10)',
                background: '#fff',
              }}
            >
              <Scaled w={pg.spread ? PAGE_W * 2 : PAGE_W} h={PAGE_H} width={w}>
                <SlideSlot id={pg.id} w={pg.spread ? PAGE_W * 2 : PAGE_W} h={PAGE_H}>
                  {pg.el}
                </SlideSlot>
              </Scaled>
            </div>
          );
        })}

      {/* active page label */}
      <div style={{ position: 'absolute', top: stageTop + PAGE_DH + 40, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: fan }}>
        {reports.pageLabels.map((l, i) => {
          const on = Math.max(0, 1 - Math.abs(focus - i) * 2);
          if (on <= 0) return null;
          return (
            <div
              key={l}
              style={{
                ...rtl,
                position: 'absolute',
                opacity: on,
                transform: `translateY(${(1 - on) * 12}px)`,
                fontSize: 36,
                fontWeight: 600,
                color: c.white,
                padding: '8px 26px',
                borderRadius: 14,
                border: `1.5px solid ${c.gold}`,
                background: 'rgba(255,201,40,0.10)',
                whiteSpace: 'nowrap',
              }}
            >
              {l}
            </div>
          );
        })}
      </div>
    </SceneFrame>
  );
};
