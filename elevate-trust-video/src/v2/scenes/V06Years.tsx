import React from 'react';
import { useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../../components/KineticHeadline';
import { MoneyFlow } from '../../components/MoneyFlow';
import { SceneTransition } from '../../components/SceneTransition';
import { enter, prog } from '../../lib/motion';
import { C } from '../../styles/tokens';
import { BrandCard, ElevateWordmark, Pill, UpworkMark } from '../brand';
import { copy } from '../copy';

const src: [number, number][] = [
  [250, 370],
  [540, 240],
  [830, 370],
];

/** FLOW: everything I earn lands in one place. */
export const V06Years: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const c = copy.years;
  const draw = prog(f, 0.5, 0.8);
  const t = f / 30;
  return (
    <SceneTransition duration={duration}>
      <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', fontSize: 40, fontStyle: 'italic', color: C.elevateMuted, ...enter(f, 0.0, 0.4, 10) }}>{c.later}</div>
      {src.map(([x, y], i) => (
        <MoneyFlow key={i} points={[[x, y + 36], [x + (540 - x) * 0.5, 470], [540, 540]]} draw={draw} width={4} color={i === 2 ? C.upworkGreen : C.elevatePrimary} pulses={draw >= 1 ? [((t * 0.9 + i * 0.3) % 1)] : []} />
      ))}
      {src.map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)' }}><div style={{ ...enter(f, 0.15 + i * 0.08, 0.45, 16) }}>
          <Pill style={{ fontSize: 36 }}>
            {i === 2 ? <UpworkMark size={44} /> : <span style={{ width: 12, height: 12, borderRadius: 6, background: C.elevatePrimary }} />}
            {c.sources[i]}
          </Pill>
        </div>
        </div>
      ))}
      <div style={{ position: 'absolute', left: 540, top: 640, transform: `translate(-50%,-50%) scale(${0.95 + 0.05 * prog(f, 0.9, 0.6)})`, opacity: prog(f, 0.8, 0.5) }}>
        <BrandCard style={{ padding: '40px 70px' }}>
          <ElevateWordmark size={84} />
        </BrandCard>
      </div>
      <div style={{ position: 'absolute', top: 820, left: 50, right: 50 }}>
        <KineticHeadline lines={[[{ t: c.a }, { t: c.em, tone: 'primary' }], [{ t: c.b }]]} size={72} weight={800} start={1.2} stagger={0.05} />
      </div>
      <div style={{ position: 'absolute', top: 1080, width: '100%', textAlign: 'center', fontSize: 38, color: C.elevateMuted, letterSpacing: '0.04em', ...enter(f, 2.1, 0.5, 10) }}>{c.micro}</div>
    </SceneTransition>
  );
};
