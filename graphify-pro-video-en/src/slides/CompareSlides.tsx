import React from 'react';
import { BarChart } from '../components/ChartAnimation';
import { Icon } from '../components/Icons';
import { LogoMark } from '../components/Logo';
import { dashboardBars, formatContent } from '../data/presentations';
import { FONT } from '../lib/fonts';
import { Card, Pill, SlideCanvas, sc } from './SlideKit';

/** A deliberately weak corporate slide: crowded, inconsistent, no hierarchy. */
export const BadSlide: React.FC = () => {
  const bullets = [
    'Revenue increased during the period compared with the same period of the previous year',
    'Operating costs rose slightly due to a number of internal and external factors',
    'New customer numbers grew in most sectors and in several geographic regions',
    'Customer retention improved according to the latest survey carried out in Q3',
    'Digital channel expansion continues in line with the approved transformation timeline',
    'General notes on performance, risks, opportunities, recommendations and next steps',
    'Please refer to Appendix 3 for the full details behind all of the figures above',
  ];
  const colors = ['#333', '#7a1fa2', '#2e7d32', '#333', '#c62828', '#1565c0', '#555'];
  const pie = [
    { v: 30, c: '#e53935' },
    { v: 22, c: '#fdd835' },
    { v: 18, c: '#43a047' },
    { v: 16, c: '#8e24aa' },
    { v: 14, c: '#fb8c00' },
  ];
  let acc = 0;
  return (
    <div
      style={{
        position: 'relative',
        width: 1600,
        height: 900,
        fontFamily: "'Times New Roman', Georgia, serif",
        background: 'linear-gradient(160deg, #ffffff 0%, #f3f7d9 55%, #d7ecf7 100%)',
        border: '14px solid #2f6fd6',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 26, left: 40, right: 40, fontSize: 40, fontWeight: 700, color: '#d32f2f', textShadow: '3px 3px 0 #ffd54f', textAlign: 'center', fontFamily: FONT }}>
        QUARTERLY PERFORMANCE REPORT AND ACTION PLAN FOLLOW-UP UPDATE
      </div>
      <div style={{ position: 'absolute', top: 110, left: 470, width: 1060, fontSize: 25, lineHeight: 1.5, fontFamily: FONT }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ color: colors[i], fontWeight: i % 3 === 0 ? 700 : 400 }}>
            • {b}
          </div>
        ))}
        <div style={{ marginTop: 10, fontSize: 20, color: '#888' }}>
          Revenue 18.2 then 19.6 then 21.4 then 22.6, costs 12.1, 12.4, 12.9 and 13.0, margin 33%, 37%, 40% and 42%
        </div>
      </div>
      <svg style={{ position: 'absolute', top: 120, left: 60 }} width="120" height="120" viewBox="0 0 100 100">
        <polygon points="50,5 61,38 95,38 67,59 78,92 50,72 22,92 33,59 5,38 39,38" fill="#fbc02d" stroke="#e65100" strokeWidth="3" />
      </svg>
      <div style={{ position: 'absolute', top: 150, left: 210, width: 90, height: 90, borderRadius: 45, background: '#66bb6a', border: '5px dashed #1b5e20' }} />
      <div style={{ position: 'absolute', top: 260, left: 90, width: 110, height: 70, background: '#ab47bc', transform: 'rotate(-12deg)', borderRadius: 8 }} />
      <svg style={{ position: 'absolute', bottom: 50, left: 40 }} width="420" height="360" viewBox="-110 -110 220 200">
        <ellipse cx="0" cy="22" rx="100" ry="55" fill="#777" />
        {pie.map((s, i) => {
          const a0 = (acc / 100) * Math.PI * 2;
          acc += s.v;
          const a1 = (acc / 100) * Math.PI * 2;
          const p = (a: number) => `${Math.cos(a) * 100} ${Math.sin(a) * 55}`;
          return <path key={i} d={`M0 0 L${p(a0)} A100 55 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p(a1)} Z`} fill={s.c} stroke="#fff" strokeWidth="1" />;
        })}
        <text x="-100" y="75" fontSize="10" fill="#444">
          A B C D E F G H I J K L M N
        </text>
      </svg>
      <div style={{ position: 'absolute', bottom: 40, right: 50, fontSize: 18, color: '#999', fontFamily: FONT }}>Source: internal data, not final, version 7 edited</div>
    </div>
  );
};

/** The same content redesigned in the sample system. */
export const GoodSlide: React.FC = () => (
  <SlideCanvas kicker="Quarterly performance" title="Revenue up 24% in one year" page={3}>
    <div style={{ display: 'flex', gap: 50, height: '100%' }}>
      <div style={{ width: 520, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <Card style={{ background: sc.slideInk, color: '#fff' }}>
          <div style={{ fontSize: 116, fontWeight: 800, color: sc.gold, lineHeight: 1.05 }}>+24%</div>
          <div style={{ fontSize: 30, color: '#C9D6E8' }}>Annual revenue growth</div>
        </Card>
        {['Profit margin rises to 42%', 'Customer retention at 88%'].map((t) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, fontWeight: 500 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${sc.blue}1F`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <Icon name="check" size={30} color={sc.blue} stroke={4} />
            </div>
            {t}
          </div>
        ))}
      </div>
      <Card style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ fontSize: 26, color: sc.slideMuted, marginBottom: 20 }}>Revenue, $M</div>
        <BarChart data={dashboardBars} p={1} width={740} height={400} showValues fontSize={26} />
      </Card>
    </div>
  </SlideCanvas>
);

const F = formatContent;
const bars = F.bars.map((v, i) => ({ label: F.barLabels[i], value: v }));

const Points: React.FC<{ size?: number }> = ({ size = 30 }) => (
  <>
    {F.points.map((t) => (
      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: size }}>
        <span style={{ width: size * 0.45, height: size * 0.45, borderRadius: size, background: sc.gold, flex: 'none' }} />
        {t}
      </div>
    ))}
  </>
);

/** 16:9 deck version of the story. */
export const FormatDeck: React.FC = () => (
  <SlideCanvas page={12}>
    <div style={{ position: 'absolute', top: -130, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ width: 640, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Pill>{F.kicker}</Pill>
        <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.15 }}>{F.title}</div>
        <div style={{ fontSize: 30, color: sc.slideMuted }}>{F.sub}</div>
        <Points />
      </div>
      <Card style={{ width: 640, height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 90, fontWeight: 800, color: sc.blue, lineHeight: 1.05 }}>{F.kpi}</div>
          <div style={{ fontSize: 28, color: sc.slideMuted }}>{F.kpiLabel}</div>
        </div>
        <BarChart data={bars} p={1} width={568} height={300} fontSize={24} />
      </Card>
    </div>
  </SlideCanvas>
);

/** 1:1 social post version (800×800). */
export const FormatSocial: React.FC = () => (
  <div style={{ width: 800, height: 800, background: sc.slideBg, fontFamily: FONT, color: sc.slideInk, position: 'relative', overflow: 'hidden', padding: 60, boxSizing: 'border-box' }}>
    <div style={{ position: 'absolute', top: 0, left: 60, width: 80, height: 10, background: sc.gold }} />
    <Pill size={20}>{F.kicker}</Pill>
    <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.15, marginTop: 22 }}>{F.title}</div>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 30, marginTop: 40 }}>
      <div>
        <div style={{ fontSize: 110, fontWeight: 800, color: sc.blue, lineHeight: 1 }}>{F.kpi}</div>
        <div style={{ fontSize: 26, color: sc.slideMuted, marginTop: 8 }}>{F.kpiLabel}</div>
      </div>
      <BarChart data={bars} p={1} width={330} height={250} fontSize={20} />
    </div>
    <div style={{ position: 'absolute', left: 60, bottom: 50, display: 'flex', alignItems: 'center', gap: 14 }}>
      <LogoMark size={40} onLight id="fs" />
      <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1 }}>GRAPHIFY PRO</span>
    </div>
  </div>
);

/** 9:16 story version (450×800). */
export const FormatStory: React.FC = () => (
  <div style={{ width: 450, height: 800, background: `linear-gradient(180deg, ${sc.slideInk}, #231E5C)`, fontFamily: FONT, color: '#fff', position: 'relative', overflow: 'hidden', padding: 40, boxSizing: 'border-box' }}>
    <div style={{ position: 'absolute', top: 0, left: 40, width: 70, height: 8, background: sc.gold }} />
    <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2, color: sc.cyan, marginTop: 20 }}>{F.kicker}</div>
    <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.15, marginTop: 14 }}>{F.title}</div>
    <div style={{ fontSize: 120, fontWeight: 800, color: sc.gold, lineHeight: 1, marginTop: 60 }}>{F.kpi}</div>
    <div style={{ fontSize: 22, color: '#C9D6E8', marginTop: 10 }}>{F.kpiLabel}</div>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 190, marginTop: 50 }}>
      {F.bars.map((v, i) => (
        <div key={i} style={{ flex: 1, height: `${v}%`, borderRadius: 8, background: i === F.bars.length - 1 ? sc.gold : sc.cyan }} />
      ))}
    </div>
    <div style={{ position: 'absolute', left: 40, bottom: 36, display: 'flex', alignItems: 'center', gap: 12 }}>
      <LogoMark size={32} id="fst" />
      <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>GRAPHIFY PRO</span>
    </div>
  </div>
);
