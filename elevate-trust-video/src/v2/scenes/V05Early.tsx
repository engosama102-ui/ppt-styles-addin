import React from 'react';
import { useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../../components/KineticHeadline';
import { SceneTransition } from '../../components/SceneTransition';
import { enter, prog } from '../../lib/motion';
import { C } from '../../styles/tokens';
import { DISPLAY, ElevateWordmark } from '../brand';
import { copy } from '../copy';

/** QUIET HERO: long-term trust. Elevate is present across the whole timeline. */
export const V05Early: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const e = copy.early;
  const draw = prog(f, 0.7, 1.8);
  const t = f / 30;
  const L = 100;
  const R = 980;
  const y = 700;
  // payments ticking along the bar once drawn; each leaves a mark
  const marks = Array.from({ length: 14 }, (_, i) => L + 30 + (i * (R - L - 60)) / 13);
  return (
    <SceneTransition duration={duration}>
      <div style={{ position: 'absolute', top: 150, left: 40, right: 40 }}>
        <KineticHeadline
          lines={[[{ t: "I've trusted" }], [{ t: 'Elevate', tone: 'primary' }], [{ t: 'since the early days.' }]]}
          size={66}
          start={0.05}
          stagger={0.06}
          style={{ ...DISPLAY, fontStretch: '105%', lineHeight: 1.08 }}
        />
      </div>
      {/* labels */}
      <div style={{ position: 'absolute', top: y - 92, left: L, ...DISPLAY, fontSize: 28, fontWeight: 700, color: C.elevateMuted, letterSpacing: '0.08em', ...enter(f, 0.6, 0.4, 8) }}>{e.from}</div>
      <div style={{ position: 'absolute', top: y - 92, right: 1080 - R, ...DISPLAY, fontSize: 28, fontWeight: 700, color: C.elevateText, letterSpacing: '0.08em', opacity: prog(f, 2.2, 0.4) }}>{e.to} →</div>
      {/* the Elevate bar spans the whole timeline */}
      <div
        style={{
          position: 'absolute',
          left: L,
          top: y - 34,
          width: (R - L) * draw,
          height: 68,
          borderRadius: 34,
          background: `linear-gradient(90deg, ${C.elevateSurface}, ${C.elevateGlow} 60%, ${C.elevatePrimary})`,
          border: `1.5px solid ${C.elevatePrimary}AA`,
          boxShadow: `0 0 50px ${C.elevatePrimary}55`,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 26,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ opacity: prog(f, 0.9, 0.4) }}>
          <ElevateWordmark size={34} />
        </div>
      </div>
      {marks.map((x, i) => {
        const at = (x - L) / (R - L);
        const lit = draw >= at && t > 0.7 + at * 1.8;
        return <div key={i} style={{ position: 'absolute', left: x - 5, top: y + 48, width: 10, height: 10, borderRadius: 5, background: lit ? C.elevateAccentText : 'transparent', boxShadow: lit ? `0 0 12px ${C.elevatePrimary}` : 'none' }} />;
      })}
      <div style={{ position: 'absolute', top: 860, left: 60, right: 60 }}>
        <KineticHeadline lines={[[{ t: e.stayed }]]} size={120} weight={800} start={2.1} />
      </div>
      <div style={{ position: 'absolute', top: 1060, width: '100%', textAlign: 'center', fontSize: 46, fontWeight: 600, color: C.elevateMuted, ...enter(f, 2.8, 0.5, 12) }}>{e.grew}</div>
    </SceneTransition>
  );
};
