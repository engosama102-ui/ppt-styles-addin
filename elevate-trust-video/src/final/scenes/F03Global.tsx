import React from 'react';
import { useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../../components/KineticHeadline';
import { MoneyFlow } from '../../components/MoneyFlow';
import { SceneTransition } from '../../components/SceneTransition';
import { enter, prog } from '../../lib/motion';
import { C } from '../../styles/tokens';
import { Pill } from '../brand';
import { copy } from '../copy';

const chips: [number, number][] = [
  [180, 720],
  [400, 640],
  [680, 640],
  [900, 720],
];

/** FLOW: earnings from everywhere converge into one line. */
export const F03Global: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const g = copy.global;
  const draw = prog(f, 1.2, 1.4);
  const t = f / 30;
  return (
    <SceneTransition duration={duration}>
      <div style={{ position: 'absolute', top: 150, left: 60, right: 60 }}>
        <KineticHeadline lines={[[{ t: 'As a freelancer' }], [{ t: 'working ' }, { t: 'globally,', tone: 'primary' }]]} size={80} weight={800} start={0.15} stagger={0.12} />
        <div style={{ marginTop: 26 }}>
          <KineticHeadline lines={[[{ t: g.l2, tone: 'muted' }], [{ t: g.l3, tone: 'muted' }]]} size={54} weight={700} start={2.06} stagger={0.1} />
        </div>
      </div>
      {chips.map(([x, y], i) => (
        <MoneyFlow key={i} points={[[x, y + 40], [x + (540 - x) * 0.55, 900], [540, 1060]]} draw={draw} width={4} pulses={draw >= 1 ? [((t * 0.8 + i * 0.25) % 1)] : []} />
      ))}
      {chips.map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)' }}><div style={{ ...enter(f, 0.9 + i * 0.12, 0.5, 20) }}>
          <Pill style={{ fontSize: 40, padding: '16px 30px' }}>
            <span style={{ width: 12, height: 12, borderRadius: 6, background: C.elevatePrimary }} />
            {g.currencies[i]}
          </Pill>
        </div>
        </div>
      ))}
      <div style={{ position: 'absolute', left: 540, top: 1090, transform: 'translate(-50%,-50%)' }}><div style={{ ...enter(f, 2.4, 0.5) }}>
        <div style={{ width: 120, height: 120, borderRadius: 60, background: `radial-gradient(circle, ${C.elevatePrimary} 0%, ${C.elevateGlow} 60%, transparent 72%)`, boxShadow: `0 0 70px ${C.elevatePrimary}AA` }} />
      </div>
      </div>
    </SceneTransition>
  );
};
