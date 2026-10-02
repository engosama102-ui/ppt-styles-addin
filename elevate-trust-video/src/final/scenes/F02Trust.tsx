import React from 'react';
import { useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../../components/KineticHeadline';
import { MoneyFlow } from '../../components/MoneyFlow';
import { SceneTransition } from '../../components/SceneTransition';
import { lerp, prog } from '../../lib/motion';
import { C } from '../../styles/tokens';
import { DISPLAY } from '../brand';
import { copy } from '../copy';

/** QUIET: huge type, slow tracking, one line of time. */
export const F02Trust: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const t = copy.trust;
  const w = prog(f, 0.12, 1.5);
  const line = prog(f, 2.5, 1.5);
  return (
    <SceneTransition duration={duration}>
      <div style={{ position: 'absolute', top: 210, width: '100%', textAlign: 'center', ...DISPLAY, fontSize: 230, lineHeight: 1, letterSpacing: `${lerp(0.14, -0.02, w)}em`, opacity: w, transform: `scale(${0.96 + 0.04 * w})` }}>
        {t.word}
      </div>
      <div style={{ position: 'absolute', top: 500, left: 60, right: 60 }}>
        <KineticHeadline lines={[[{ t: t.line1, tone: 'muted' }]]} size={70} weight={600} start={0.62} stagger={0.12} />
      </div>
      <div style={{ position: 'absolute', top: 700, left: 60, right: 60 }}>
        <KineticHeadline lines={[[{ t: t.line2 }], [{ t: t.years, tone: 'primary' }]]} size={104} weight={800} start={2.48} stagger={0.17} />
      </div>
      <MoneyFlow points={[[110, 1060], [970, 1060]]} draw={line} width={5} pulses={[line > 0.02 && line < 1 ? line : 0]} />
      {[110, 325, 540, 755, 970].map((x, i) => {
        const on = line >= (x - 110) / 860 - 0.001;
        return <div key={x} style={{ position: 'absolute', left: x - 11, top: 1049, width: 22, height: 22, borderRadius: 11, background: on ? C.elevatePrimary : C.elevateSurface, border: `2px solid ${on ? C.elevateAccentText : 'rgba(255,255,255,0.2)'}`, boxShadow: on ? `0 0 18px ${C.elevatePrimary}` : 'none', opacity: prog(f, 2.45 + i * 0.04, 0.3) }} />;
      })}
    </SceneTransition>
  );
};
