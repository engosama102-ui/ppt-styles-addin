import React from 'react';
import { DonutChart } from '../components/ChartAnimation';
import { Icon } from '../components/Icons';
import { reportContent } from '../data/presentations';
import { FONT } from '../lib/fonts';
import { Num, sc } from './SlideKit';

/** Portrait page 800×1131 (A4 ratio). */
const Page: React.FC<{ children: React.ReactNode; dark?: boolean; width?: number; page?: number }> = ({ children, dark, width = 800, page }) => (
  <div
    style={{
      position: 'relative',
      width,
      height: 1131,
      fontFamily: FONT,
      direction: 'rtl',
      textAlign: 'right',
      background: dark ? `linear-gradient(160deg, ${sc.darkBlue}, ${sc.navy})` : '#FFFFFF',
      color: dark ? '#fff' : sc.slideInk,
      overflow: 'hidden',
    }}
  >
    {children}
    {page !== undefined && (
      <div style={{ position: 'absolute', bottom: 40, left: 60, fontSize: 20, color: dark ? '#9FB3CC' : sc.slideMuted, direction: 'ltr' }}>
        {String(page).padStart(2, '0')}
      </div>
    )}
  </div>
);

export const ReportCover: React.FC = () => {
  const r = reportContent.cover;
  return (
    <Page dark>
      <svg style={{ position: 'absolute', top: 0, left: 0 }} width="800" height="700" viewBox="0 0 800 700">
        <circle cx="620" cy="220" r="260" fill="none" stroke={sc.blue} strokeWidth="2" opacity="0.5" />
        <circle cx="620" cy="220" r="180" fill="none" stroke={sc.cyan} strokeWidth="2" opacity="0.5" />
        <circle cx="620" cy="220" r="90" fill={sc.gold} opacity="0.95" />
        <rect x="0" y="560" width="420" height="10" fill={sc.gold} />
      </svg>
      <div style={{ position: 'absolute', right: 70, bottom: 320, fontSize: 180, fontWeight: 700, color: sc.white, lineHeight: 1 }}>
        <Num>{r.year}</Num>
      </div>
      <div style={{ position: 'absolute', right: 70, bottom: 220, fontSize: 72, fontWeight: 700 }}>{r.title}</div>
      <div style={{ position: 'absolute', right: 70, bottom: 150, fontSize: 36, color: '#9FB3CC' }}>{r.sub}</div>
    </Page>
  );
};

export const ReportImpact: React.FC = () => {
  const r = reportContent.impact;
  return (
    <Page width={1600} page={14}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 800, background: sc.slideBg, padding: 80, boxSizing: 'border-box' }}>
        <div style={{ fontSize: 28, fontWeight: 600, color: sc.blue }}>الفصل الثالث</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 20, lineHeight: 1.2 }}>{r.title}</div>
        <div style={{ width: 120, height: 10, background: sc.gold, marginTop: 36 }} />
        <div style={{ fontSize: 34, color: sc.slideMuted, lineHeight: 1.7, marginTop: 40 }}>
          أثر يمكن قياسه في المجتمع والاقتصاد المحلي عبر برامج نوعية وشراكات طويلة المدى.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 80, bottom: 80, left: 80, width: 640, display: 'flex', flexDirection: 'column', gap: 40 }}>
        {r.stats.map((s, i) => (
          <div key={s.l} style={{ flex: 1, borderRadius: 26, background: i === 0 ? sc.slideInk : sc.slideBg, color: i === 0 ? '#fff' : sc.slideInk, padding: 50, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 120, fontWeight: 700, color: i === 0 ? sc.gold : sc.blue, lineHeight: 1 }}>
              <Num>{s.v}</Num>
            </div>
            <div style={{ fontSize: 40, marginTop: 10 }}>{s.l}</div>
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
        <div style={{ fontSize: 26, fontWeight: 600, color: sc.blue }}>ESG</div>
        <div style={{ fontSize: 70, fontWeight: 700, marginTop: 10 }}>{r.title}</div>
        <div style={{ width: 100, height: 8, background: sc.gold, marginTop: 26 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 50, marginTop: 70 }}>
          {r.items.map((it, i) => (
            <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <DonutChart
                data={[{ label: 'a', value: r.values[i] }, { label: 'b', value: 100 - r.values[i] }]}
                p={1}
                size={200}
                thickness={24}
                colors={[[sc.cyan, sc.blue, sc.gold][i], '#E8EEF5']}
                center={<div style={{ fontSize: 48, fontWeight: 700 }}><Num>{r.values[i]}%</Num></div>}
              />
              <div>
                <div style={{ fontSize: 50, fontWeight: 700 }}>{it}</div>
                <div style={{ fontSize: 28, color: sc.slideMuted, marginTop: 6 }}>مؤشر الأداء مقابل المستهدف</div>
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
      <div style={{ position: 'absolute', top: 110, right: 70, left: 70, color: '#fff' }}>
        <div style={{ fontSize: 30, opacity: 0.8 }}>نظرة سريعة</div>
        <div style={{ fontSize: 76, fontWeight: 700 }}>{r.title}</div>
      </div>
      <div style={{ position: 'absolute', top: 440, right: 70, left: 70, display: 'flex', flexDirection: 'column', gap: 34 }}>
        {r.points.map((pt, i) => (
          <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: 26, padding: 34, borderRadius: 22, background: sc.slideBg }}>
            <div style={{ width: 70, height: 70, borderRadius: 20, background: i === 0 ? sc.gold : sc.slideInk, color: i === 0 ? sc.navy : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, fontWeight: 700 }}>
              {i + 1}
            </div>
            <div style={{ fontSize: 40, fontWeight: 600 }}>{pt}</div>
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
      <div style={{ position: 'absolute', top: 120, right: 70, left: 70 }}>
        <div style={{ width: 110, height: 110, borderRadius: 30, background: sc.slideInk, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="layers" size={64} color={sc.gold} />
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 50 }}>{r.title}</div>
        <div style={{ fontSize: 38, color: sc.slideMuted, marginTop: 14 }}>{r.sub}</div>
      </div>
      <div style={{ position: 'absolute', bottom: 120, right: 70, left: 70, display: 'flex', gap: 24 }}>
        {['الرؤية', 'الرسالة', 'القيم'].map((t, i) => (
          <div key={t} style={{ flex: 1, borderTop: `8px solid ${[sc.blue, sc.cyan, sc.gold][i]}`, paddingTop: 20, fontSize: 38, fontWeight: 700 }}>
            {t}
          </div>
        ))}
      </div>
    </Page>
  );
};
