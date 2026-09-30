import React from 'react';
import { BarChart } from '../components/ChartAnimation';
import { Icon } from '../components/Icons';
import { dashboardBars, localizationSlide } from '../data/presentations';
import { FONT } from '../lib/fonts';
import { lerp } from '../lib/motion';
import { Card, Num, Pill, SlideCanvas, sc } from './SlideKit';

/** A deliberately weak corporate slide: crowded, inconsistent, no hierarchy. */
export const BadSlide: React.FC = () => {
  const bullets = [
    'تم تحقيق نمو في الإيرادات خلال الفترة الماضية مقارنة بالفترة السابقة من العام',
    'ارتفاع التكاليف التشغيلية بنسبة بسيطة نتيجة عدة عوامل داخلية وخارجية',
    'زيادة عدد العملاء الجدد في أغلب القطاعات والمناطق الجغرافية المختلفة',
    'تحسن معدل الاحتفاظ بالعملاء وفق آخر استبيان تم تنفيذه في الربع الثالث',
    'التوسع في القنوات الرقمية ومتابعة خطة التحول حسب الجدول الزمني المعتمد',
    'ملاحظات عامة حول الأداء والمخاطر والفرص والتوصيات والخطوات القادمة',
    'يرجى مراجعة الملحق رقم ٣ للاطلاع على التفاصيل الكاملة لجميع الأرقام',
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
        fontFamily: FONT,
        direction: 'rtl',
        background: 'linear-gradient(160deg, #ffffff 0%, #f3f7d9 55%, #d7ecf7 100%)',
        border: '14px solid #2f6fd6',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 26, right: 40, left: 40, fontSize: 38, fontWeight: 700, color: '#d32f2f', textShadow: '3px 3px 0 #ffd54f', textAlign: 'center' }}>
        تقرير الأداء الربع سنوي للإدارة العامة وخطة العمل والمتابعة والتطوير
      </div>
      <div style={{ position: 'absolute', top: 110, right: 50, width: 860, fontSize: 25, lineHeight: 1.55, textAlign: 'right' }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ color: colors[i], fontWeight: i % 3 === 0 ? 700 : 400 }}>
            • {b}
          </div>
        ))}
        <div style={{ marginTop: 10, fontSize: 21, color: '#888' }}>
          الإيرادات 18.2 ثم 19.6 ثم 21.4 ثم 22.6 والتكاليف 12.1 و 12.4 و 12.9 و 13.0 وهامش الربح 33% و 37% و 40% و 42%
        </div>
      </div>
      {/* random clip-art style shapes */}
      <svg style={{ position: 'absolute', top: 120, left: 60 }} width="120" height="120" viewBox="0 0 100 100">
        <polygon points="50,5 61,38 95,38 67,59 78,92 50,72 22,92 33,59 5,38 39,38" fill="#fbc02d" stroke="#e65100" strokeWidth="3" />
      </svg>
      <div style={{ position: 'absolute', top: 150, left: 220, width: 90, height: 90, borderRadius: 45, background: '#66bb6a', border: '5px dashed #1b5e20' }} />
      <div style={{ position: 'absolute', top: 120, left: 360, width: 110, height: 70, background: '#ab47bc', transform: 'rotate(-12deg)', borderRadius: 8 }} />
      {/* confusing 3D-ish pie */}
      <svg style={{ position: 'absolute', bottom: 60, left: 80 }} width="420" height="360" viewBox="-110 -110 220 200">
        <ellipse cx="0" cy="22" rx="100" ry="55" fill="#777" />
        {pie.map((s, i) => {
          const a0 = (acc / 100) * Math.PI * 2;
          acc += s.v;
          const a1 = (acc / 100) * Math.PI * 2;
          const p = (a: number) => `${Math.cos(a) * 100} ${Math.sin(a) * 55}`;
          return <path key={i} d={`M0 0 L${p(a0)} A100 55 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p(a1)} Z`} fill={s.c} stroke="#fff" strokeWidth="1" />;
        })}
        <text x="-100" y="75" fontSize="11" fill="#444" fontFamily={FONT}>
          أ ب ج د هـ و ز ح ط ي ك ل م ن
        </text>
      </svg>
      <div style={{ position: 'absolute', bottom: 40, right: 50, fontSize: 18, color: '#999' }}>المصدر: بيانات داخلية غير نهائية - نسخة 7 معدلة</div>
    </div>
  );
};

/** The same content redesigned in the Osama Visual sample system. */
export const GoodSlide: React.FC = () => (
  <SlideCanvas kicker="الأداء الفصلي" title={'الإيرادات تنمو \u206624%\u2069 خلال عام'} page={3}>
    <div style={{ display: 'flex', gap: 50, height: '100%' }}>
      <div style={{ width: 520, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <Card style={{ background: sc.slideInk, color: '#fff' }}>
          <div style={{ fontSize: 120, fontWeight: 700, color: sc.gold, lineHeight: 1.05 }}>
            <Num>+24%</Num>
          </div>
          <div style={{ fontSize: 32, color: '#C9D6E8' }}>نمو الإيرادات السنوي</div>
        </Card>
        {['هامش الربح يرتفع إلى \u206642%\u2069', 'الاحتفاظ بالعملاء \u206688%\u2069'].map((t) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 32, fontWeight: 500 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${sc.blue}1F`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="check" size={30} color={sc.blue} stroke={4} />
            </div>
            {t}
          </div>
        ))}
      </div>
      <Card style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ fontSize: 28, color: sc.slideMuted, marginBottom: 20 }}>الإيرادات بالمليون</div>
        <BarChart data={dashboardBars} p={1} width={740} height={400} showValues fontSize={28} />
      </Card>
    </div>
  </SlideCanvas>
);

const LocChart: React.FC<{ labels: string[]; rtlOrder: boolean; kpi: string; kpiLabel: string }> = ({ labels, rtlOrder, kpi, kpiLabel }) => (
  <Card style={{ width: 660, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div>
      <div style={{ fontSize: 90, fontWeight: 700, color: sc.blue, lineHeight: 1.05 }}>
        <Num>{kpi}</Num>
      </div>
      <div style={{ fontSize: 30, color: sc.slideMuted }}>{kpiLabel}</div>
    </div>
    <BarChart
      data={localizationSlide.bars.map((v, i) => ({ label: labels[i], value: v }))}
      p={1}
      width={588}
      height={300}
      rtlOrder={rtlOrder}
      fontSize={26}
    />
  </Card>
);

const Points: React.FC<{ items: string[]; title: string; sub: string; dir: 'rtl' | 'ltr' }> = ({ items, title, sub, dir }) => (
  <div style={{ width: 620, direction: dir, textAlign: dir === 'rtl' ? 'right' : 'left', display: 'flex', flexDirection: 'column', gap: 26 }}>
    <Pill>{dir === 'rtl' ? 'الخطة الإقليمية' : 'REGIONAL PLAN'}</Pill>
    <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.2 }}>{title}</div>
    <div style={{ fontSize: 32, color: sc.slideMuted }}>{sub}</div>
    {items.map((t) => (
      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32 }}>
        <span style={{ width: 14, height: 14, borderRadius: 7, background: sc.gold, flex: 'none' }} />
        {t}
      </div>
    ))}
  </div>
);

export const EnglishSlide: React.FC = () => {
  const L = localizationSlide;
  return (
    <SlideCanvas dir="ltr" page={12}>
      <div style={{ position: 'absolute', top: -130, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Points items={L.enPoints} title={L.en.title} sub={L.en.sub} dir="ltr" />
        <div style={{ height: 600 }}>
          <LocChart labels={L.enBarLabels} rtlOrder={false} kpi={L.en.kpi} kpiLabel={L.en.kpiLabel} />
        </div>
      </div>
    </SlideCanvas>
  );
};

/**
 * Arabic version. `morph` 0 → 1 moves the chart from the English position
 * (right) to the Arabic position (left) while the text column moves right.
 */
export const ArabicSlide: React.FC<{ morph?: number }> = ({ morph = 1 }) => {
  const L = localizationSlide;
  const w = 1380; // content width
  const chartX = lerp(w - 660, 0, morph);
  const textX = lerp(0, w - 620, morph);
  return (
    <SlideCanvas dir="rtl" page={12}>
      <div style={{ position: 'absolute', top: -130, left: 0, width: w, bottom: 0, direction: 'ltr' }}>
        <div style={{ position: 'absolute', left: textX, top: 60 }}>
          <Points items={L.arPoints} title={L.ar.title} sub={L.ar.sub} dir="rtl" />
        </div>
        <div style={{ position: 'absolute', left: chartX, top: 0, bottom: 0, display: 'flex', alignItems: 'center', direction: 'rtl' }}>
          <div style={{ height: 600 }}>
            <LocChart labels={L.arBarLabels} rtlOrder kpi={L.ar.kpi} kpiLabel={L.ar.kpiLabel} />
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
};
