import React from 'react';
import { DonutChart } from '../components/ChartAnimation';
import { Icon } from '../components/Icons';
import { reportContent } from '../data/presentations';
import { FONT } from '../lib/fonts';
import { sc } from './SlideKit';

const accents = [sc.blue, sc.cyan, sc.gold];

/** Portrait page 800×1131 (A4 ratio). */
const Page: React.FC<{ children: React.ReactNode; dark?: boolean; width?: number; page?: number }> = ({ children, dark, width = 800, page }) => (
  <div
    style={{
      position: 'relative',
      width,
      height: 1131,
      fontFamily: FONT,
      background: dark ? `linear-gradient(160deg, ${sc.darkBlue}, ${sc.navy})` : '#FFFFFF',
      color: dark ? '#fff' : sc.slideInk,
      overflow: 'hidden',
    }}
  >
    {children}
    {page !== undefined && (
      <div style={{ position: 'absolute', bottom: 40, right: 60, fontSize: 20, color: dark ? '#9FB3CC' : sc.slideMuted }}>{String(page).padStart(2, '0')}</div>
    )}
  </div>
);

export const ReportCover: React.FC = () => {
  const r = reportContent.cover;
  return (
    <Page dark>
      <svg style={{ position: 'absolute', top: 0, left: 0 }} width="800" height="700" viewBox="0 0 800 700">
        <circle cx="180" cy="220" r="260" fill="none" stroke={sc.blue} strokeWidth="2" opacity="0.5" />
        <circle cx="180" cy="220" r="180" fill="none" stroke={sc.cyan} strokeWidth="2" opacity="0.5" />
        <circle cx="180" cy="220" r="90" fill={sc.gold} opacity="0.95" />
        <rect x="380" y="560" width="420" height="10" fill={sc.gold} />
      </svg>
      <div style={{ position: 'absolute', left: 70, bottom: 320, fontSize: 180, fontWeight: 800, lineHeight: 1 }}>{r.year}</div>
      <div style={{ position: 'absolute', left: 70, bottom: 220, fontSize: 70, fontWeight: 700 }}>{r.title}</div>
      <div style={{ position: 'absolute', left: 70, bottom: 150, fontSize: 32, color: '#9FB3CC' }}>{r.sub}</div>
    </Page>
  );
};

export const ReportImpact: React.FC = () => {
  const r = reportContent.impact;
  return (
    <Page width={1600} page={14}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 800, background: sc.slideBg, padding: 80, boxSizing: 'border-box' }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: sc.blue, letterSpacing: 2, textTransform: 'uppercase' }}>{r.chapter}</div>
        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 20, lineHeight: 1.15 }}>{r.title}</div>
        <div style={{ width: 120, height: 10, background: sc.gold, marginTop: 36 }} />
        <div style={{ fontSize: 32, color: sc.slideMuted, lineHeight: 1.6, marginTop: 40 }}>{r.body}</div>
      </div>
      <div style={{ position: 'absolute', top: 80, bottom: 80, right: 80, width: 640, display: 'flex', flexDirection: 'column', gap: 40 }}>
        {r.stats.map((s, i) => (
          <div
            key={s.l}
            style={{
              flex: 1,
              borderRadius: 26,
              background: i === 0 ? sc.slideInk : sc.slideBg,
              color: i === 0 ? '#fff' : sc.slideInk,
              padding: 50,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 120, fontWeight: 800, color: i === 0 ? sc.gold : sc.blue, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 38, marginTop: 10 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </Page>
  );
};

export const ReportEsg: React.FC = () => {
  const r = reportContent.esg;
  return (
    <Page page={22}>
      <div style={{ padding: 70 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: sc.blue, letterSpacing: 2 }}>ESG</div>
        <div style={{ fontSize: 66, fontWeight: 800, marginTop: 10 }}>{r.title}</div>
        <div style={{ width: 100, height: 8, background: sc.gold, marginTop: 26 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 50, marginTop: 70 }}>
          {r.items.map((it, i) => (
            <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <DonutChart
                data={[{ label: 'a', value: r.values[i] }, { label: 'b', value: 100 - r.values[i] }]}
                p={1}
                size={200}
                thickness={24}
                colors={[accents[i], '#E8EEF5']}
                center={<div style={{ fontSize: 44, fontWeight: 800 }}>{r.values[i]}%</div>}
              />
              <div>
                <div style={{ fontSize: 46, fontWeight: 700 }}>{it}</div>
                <div style={{ fontSize: 26, color: sc.slideMuted, marginTop: 6 }}>{r.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export const ReportSummary: React.FC = () => {
  const r = reportContent.summary;
  return (
    <Page page={3}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 380, background: sc.blue }} />
      <div style={{ position: 'absolute', top: 110, left: 70, right: 70, color: '#fff' }}>
        <div style={{ fontSize: 28, opacity: 0.85, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{r.kicker}</div>
        <div style={{ fontSize: 70, fontWeight: 800 }}>{r.title}</div>
      </div>
      <div style={{ position: 'absolute', top: 440, left: 70, right: 70, display: 'flex', flexDirection: 'column', gap: 34 }}>
        {r.points.map((pt, i) => (
          <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: 26, padding: 34, borderRadius: 22, background: sc.slideBg }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 20,
                background: i === 0 ? sc.gold : sc.slideInk,
                color: i === 0 ? sc.navy : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 800,
                flex: 'none',
              }}
            >
              {i + 1}
            </div>
            <div style={{ fontSize: 38, fontWeight: 600 }}>{pt}</div>
          </div>
        ))}
      </div>
    </Page>
  );
};

export const ReportProfile: React.FC = () => {
  const r = reportContent.profile;
  return (
    <Page page={1}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, #fff 0%, #fff 55%, ${sc.slideBg} 55%)` }} />
      <div style={{ position: 'absolute', top: 120, left: 70, right: 70 }}>
        <div style={{ width: 110, height: 110, borderRadius: 30, background: sc.slideInk, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="layers" size={64} color={sc.gold} />
        </div>
        <div style={{ fontSize: 80, fontWeight: 800, marginTop: 50 }}>{r.title}</div>
        <div style={{ fontSize: 36, color: sc.slideMuted, marginTop: 14 }}>{r.sub}</div>
      </div>
      <div style={{ position: 'absolute', bottom: 120, left: 70, right: 70, display: 'flex', gap: 24 }}>
        {r.pillars.map((t, i) => (
          <div key={t} style={{ flex: 1, borderTop: `8px solid ${accents[i]}`, paddingTop: 20, fontSize: 36, fontWeight: 700 }}>
            {t}
          </div>
        ))}
      </div>
    </Page>
  );
};
