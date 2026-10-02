import React from 'react';
import { useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../../components/KineticHeadline';
import { MoneyFlow } from '../../components/MoneyFlow';
import { SceneTransition } from '../../components/SceneTransition';
import { lerp, prog } from '../../lib/motion';
import { C } from '../../styles/tokens';
import { DISPLAY } from '../brand';
import { copy } from '../copy';

/**
 * Local 0 = 32.20. "But the trust came first." 32.32-34.29.
 * Emotional close: the TRUST word and the trust line from the opening return.
 */
export const F09Close: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const c = copy.close;
  const ghost = prog(f, 0.0, 1.2);
  const line = prog(f, 0.5, 1.6);
  return (
    <SceneTransition duration={duration}>
      {/* the TRUST motif, large and quiet behind the statement */}
      <div
        style={{
          position: 'absolute',
          top: 250,
          width: '100%',
          textAlign: 'center',
          ...DISPLAY,
          fontSize: 230,
          lineHeight: 1,
          color: C.elevateAccentText,
          opacity: 0.16 * ghost,
          letterSpacing: `${lerp(0.1, -0.02, ghost)}em`,
        }}
      >
        TRUST
      </div>
      <div style={{ position: 'absolute', top: 470, left: 50, right: 50 }}>
        <KineticHeadline lines={[[{ t: c.a }], [{ t: c.b, tone: 'primary' }]]} size={110} weight={800} start={0.12} stagger={0.22} />
      </div>
      <MoneyFlow points={[[110, 860], [970, 860]]} draw={line} width={5} pulses={[line > 0.02 && line < 1 ? line : 0]} />
      {[110, 325, 540, 755, 970].map((x) => {
        const on = line >= (x - 110) / 860 - 0.001;
        return <div key={x} style={{ position: 'absolute', left: x - 11, top: 849, width: 22, height: 22, borderRadius: 11, background: on ? C.elevatePrimary : C.elevateSurface, border: `2px solid ${on ? C.elevateAccentText : 'rgba(255,255,255,0.2)'}`, boxShadow: on ? `0 0 18px ${C.elevatePrimary}` : 'none', opacity: prog(f, 0.45, 0.3) }} />;
      })}
    </SceneTransition>
  );
};
