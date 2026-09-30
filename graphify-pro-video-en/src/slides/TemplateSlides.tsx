import React from 'react';
import { BarChart } from '../components/ChartAnimation';
import { Icon, IconName } from '../components/Icons';
import { templateContent } from '../data/presentations';
import { FONT } from '../lib/fonts';
import { Num, sc } from './SlideKit';

export const templateKinds = ['cover', 'agenda', 'divider', 'text', 'chart', 'infographic', 'team', 'timeline', 'closing'] as const;
export type TemplateKind = (typeof templateKinds)[number];

type Content = (typeof templateContent)[number];

const Frame: React.FC<{ dark?: boolean; accent?: boolean; children: React.ReactNode; page: number }> = ({ dark, children, page }) => (
  <div
    style={{
      position: 'relative',
      width: 1600,
      height: 900,
      fontFamily: FONT,
      direction: 'ltr',
      textAlign: 'left',
      background: dark ? `linear-gradient(135deg, ${sc.darkBlue}, ${sc.navy})` : sc.slideBg,
      color: dark ? '#fff' : sc.slideInk,
      overflow: 'hidden',
    }}
  >
    <div style={{ position: 'absolute', top: 0, left: 110, width: 90, height: 12, background: sc.gold }} />
    {children}
    <div style={{ position: 'absolute', bottom: 40, left: 110, fontSize: 26, color: dark ? '#9FB3CC' : sc.slideMuted, direction: 'ltr' }}>
      {String(page).padStart(2, '0')}
    </div>
  </div>
);

const H: React.FC<{ children: React.ReactNode; top?: number; size?: number }> = ({ children, top = 110, size = 70 }) => (
  <div style={{ position: 'absolute', top, right: 110, left: 110, fontSize: size, fontWeight: 700 }}>{children}</div>
);

/** One slide of the sample template system in a given layout. */
export const TemplateSlide: React.FC<{ kind: TemplateKind; content: Content }> = ({ kind, content: c }) => {
  switch (kind) {
    case 'cover':
      return (
        <Frame dark page={1}>
          <svg style={{ position: 'absolute', right: -120, top: 120 }} width="700" height="700">
            <circle cx="350" cy="350" r="300" fill="none" stroke={sc.blue} strokeWidth="4" opacity="0.6" />
            <circle cx="350" cy="350" r="190" fill="none" stroke={sc.cyan} strokeWidth="4" opacity="0.6" />
            <circle cx="350" cy="350" r="80" fill={sc.gold} />
          </svg>
          <H top={340} size={110}>{c.cover}</H>
          <div style={{ position: 'absolute', top: 500, left: 110, fontSize: 48, color: '#9FB3CC' }}>{c.coverSub}</div>
        </Frame>
      );
    case 'agenda':
      return (
        <Frame page={2}>
          <H>Agenda</H>
          <div style={{ position: 'absolute', top: 280, right: 110, left: 110, display: 'flex', gap: 30 }}>
            {c.agenda.map((a, i) => (
              <div key={a} style={{ flex: 1, height: 420, borderRadius: 26, background: i === 0 ? sc.slideInk : '#fff', color: i === 0 ? '#fff' : sc.slideInk, padding: 40, boxSizing: 'border-box', border: `3px solid ${sc.slideLine}` }}>
                <div style={{ fontSize: 80, fontWeight: 700, color: i === 0 ? sc.gold : sc.blue }}>
                  <Num>0{i + 1}</Num>
                </div>
                <div style={{ fontSize: 54, fontWeight: 700, marginTop: 150 }}>{a}</div>
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'divider':
      return (
        <Frame dark page={3}>
          <div style={{ position: 'absolute', top: 240, left: 110, fontSize: 260, fontWeight: 700, color: sc.gold, lineHeight: 1 }}>
            <Num>02</Num>
          </div>
          <H top={560} size={110}>{c.divider}</H>
        </Frame>
      );
    case 'text':
      return (
        <Frame page={4}>
          <H>{c.text}</H>
          <div style={{ position: 'absolute', top: 290, right: 110, left: 110, display: 'flex', flexDirection: 'column', gap: 40 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: 12, background: [sc.blue, sc.cyan, sc.gold][i] }} />
                <div style={{ height: 30, width: [900, 760, 820][i], borderRadius: 15, background: sc.slideLine }} />
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'chart':
      return (
        <Frame page={5}>
          <H>{c.chart}</H>
          <div style={{ position: 'absolute', top: 280, left: 110 }}>
            <BarChart data={[{ label: '1', value: 40 }, { label: '2', value: 60 }, { label: '3', value: 75 }, { label: '4', value: 100 }]} p={1} width={1380} height={500} fontSize={30} />
          </div>
        </Frame>
      );
    case 'infographic':
      return (
        <Frame page={6}>
          <H>{c.infographic}</H>
          <div style={{ position: 'absolute', top: 320, right: 110, left: 110, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {(['target', 'structure', 'design', 'check'] as IconName[]).map((ic, i) => (
              <div key={ic} style={{ width: 280, height: 280, borderRadius: 140, background: i === 3 ? sc.gold : '#fff', border: `6px solid ${[sc.blue, sc.cyan, sc.blue, sc.gold][i]}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={ic} size={130} color={i === 3 ? sc.navy : sc.blue} stroke={3} />
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'team':
      return (
        <Frame page={7}>
          <H>{c.team}</H>
          <div style={{ position: 'absolute', top: 290, right: 110, left: 110, display: 'flex', gap: 40 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
                <div style={{ width: 230, height: 230, borderRadius: 115, background: `linear-gradient(160deg, ${sc.slideLine}, #C3CEDC)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="users" size={110} color="#8A99AD" />
                </div>
                <div style={{ height: 28, width: 220, borderRadius: 14, background: sc.slideInk, opacity: 0.8 }} />
                <div style={{ height: 22, width: 160, borderRadius: 11, background: sc.slideLine }} />
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'timeline':
      return (
        <Frame page={8}>
          <H>{c.timeline}</H>
          <div style={{ position: 'absolute', top: 470, right: 110, left: 110, height: 12, borderRadius: 6, background: `linear-gradient(90deg, ${sc.blue}, ${sc.gold})` }} />
          <div style={{ position: 'absolute', top: 430, right: 110, left: 110, display: 'flex', justifyContent: 'space-between' }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ width: 90, height: 90, borderRadius: 45, background: '#fff', border: `12px solid ${i === 3 ? sc.gold : sc.blue}`, boxSizing: 'border-box' }} />
            ))}
          </div>
        </Frame>
      );
    case 'closing':
    default:
      return (
        <Frame dark page={9}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
            <div style={{ fontSize: 130, fontWeight: 700 }}>{c.closing}</div>
            <div style={{ width: 200, height: 12, background: sc.gold, borderRadius: 6 }} />
          </div>
        </Frame>
      );
  }
};
