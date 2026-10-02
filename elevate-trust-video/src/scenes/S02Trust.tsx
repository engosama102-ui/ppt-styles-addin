import React from 'react';
import { useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../components/KineticHeadline';
import { MoneyFlow } from '../components/MoneyFlow';
import { SceneTransition } from '../components/SceneTransition';
import { copy } from '../data/copy';
import { lerp, prog } from '../lib/motion';
import { C } from '../styles/tokens';

export const S02Trust: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const t = copy.trust;
  const word = prog(f, 0.1, 0.9);
  const line = prog(f, 1.9, 1.5);
  const ticks = [160, 350, 540, 730, 920];
  return (
    <SceneTransition duration={duration}>
      <div
        style={{
          position: 'absolute',
          top: 250,
          width: '100%',
          textAlign: 'center',
          fontSize: 250,
          fontWeight: 800,
          letterSpacing: `${lerp(0.12, -0.03, word)}em`,
          opacity: word,
          transform: `scale(${0.96 + 0.04 * word})`,
        }}
      >
        {t.word}
      </div>
      <div style={{ position: 'absolute', top: 560, left: 80, right: 80 }}>
        <KineticHeadline lines={[[{ t: t.line1, tone: 'muted' }]]} size={60} weight={600} start={0.8} />
      </div>
      <div style={{ position: 'absolute', top: 720, left: 80, right: 80 }}>
        <KineticHeadline lines={[[{ t: t.line2 }, { t: t.years, tone: 'primary' }]]} size={76} weight={800} start={1.7} stagger={0.08} />
      </div>
      {/* the trust line: time passing */}
      <MoneyFlow points={[[120, 940], [960, 940]]} draw={line} width={4} pulses={[line > 0.02 ? line : 0]} />
      {ticks.map((x, i) => {
        const on = line >= (x - 120) / 840;
        return (
          <div
            key={x}
            style={{
              position: 'absolute',
              left: x - 9,
              top: 931,
              width: 18,
              height: 18,
              borderRadius: 9,
              background: on ? C.elevatePrimary : C.elevateSurface,
              border: `2px solid ${on ? C.elevatePrimary : 'rgba(255,255,255,0.2)'}`,
              opacity: prog(f, 1.8 + i * 0.05, 0.3),
            }}
          />
        );
      })}
    </SceneTransition>
  );
};
