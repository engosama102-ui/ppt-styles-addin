import React from 'react';
import { useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../../components/KineticHeadline';
import { SceneTransition } from '../../components/SceneTransition';
import { enter, prog } from '../../lib/motion';
import { C } from '../../styles/tokens';
import { DISPLAY, ElevateWordmark } from '../brand';
import { copy } from '../copy';

/** Local 0 = 23.40 s. "Years later," at 23.61. Time passes; Elevate spans the whole line. */
export const F05Early: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const e = copy.early;
  const draw = prog(f, 0.2, 1.3);
  const t = f / 30;
  const L = 100;
  const R = 980;
  const y = 700;
  const marks = Array.from({ length: 14 }, (_, i) => L + 30 + (i * (R - L - 60)) / 13);
  return (
    <SceneTransition duration={duration}>
      <div style={{ position: 'absolute', top: 230, left: 50, right: 50 }}>
        <KineticHeadline lines={[[{ t: e.later }]]} size={110} weight={800} start={0.21} stagger={0.2} />
      </div>
      <div style={{ position: 'absolute', top: y - 100, left: L, ...DISPLAY, fontSize: 30, fontWeight: 700, color: C.elevateMuted, letterSpacing: '0.08em', ...enter(f, 0.15, 0.4, 8) }}>{e.from}</div>
      <div style={{ position: 'absolute', top: y - 100, right: 1080 - R, ...DISPLAY, fontSize: 30, fontWeight: 700, color: C.elevateText, letterSpacing: '0.08em', opacity: prog(f, 1.3, 0.3) }}>{e.to} →</div>
      <div
        style={{
          position: 'absolute',
          left: L,
          top: y - 40,
          width: (R - L) * draw,
          height: 80,
          borderRadius: 40,
          background: `linear-gradient(90deg, ${C.elevateSurface}, ${C.elevateGlow} 60%, ${C.elevatePrimary})`,
          border: `1.5px solid ${C.elevatePrimary}AA`,
          boxShadow: `0 0 50px ${C.elevatePrimary}55`,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 30,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ opacity: prog(f, 0.35, 0.3) }}>
          <ElevateWordmark size={40} />
        </div>
      </div>
      {marks.map((x, i) => {
        const at = (x - L) / (R - L);
        const lit = t > 0.2 + at * 1.3;
        return <div key={i} style={{ position: 'absolute', left: x - 6, top: y + 58, width: 12, height: 12, borderRadius: 6, background: lit ? C.elevateAccentText : 'transparent', boxShadow: lit ? `0 0 12px ${C.elevatePrimary}` : 'none' }} />;
      })}
      <div style={{ position: 'absolute', top: 860, width: '100%', textAlign: 'center', fontSize: 46, fontWeight: 600, color: C.elevateMuted, ...enter(f, 0.7, 0.5, 12) }}>{e.h1}</div>
    </SceneTransition>
  );
};
