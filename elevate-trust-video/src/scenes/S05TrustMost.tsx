import React from 'react';
import { useCurrentFrame } from 'remotion';
import { FlowNode } from '../components/FlowNode';
import { KineticHeadline } from '../components/KineticHeadline';
import { MoneyFlow } from '../components/MoneyFlow';
import { SceneTransition } from '../components/SceneTransition';
import { copy } from '../data/copy';
import { enter, prog } from '../lib/motion';
import { C } from '../styles/tokens';

const src: [number, number][] = [
  [210, 420],
  [540, 380],
  [870, 420],
];

export const S05TrustMost: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const c = copy.trustMost;
  const draw = prog(f, 0.6, 0.9);
  const t = f / 30;
  return (
    <SceneTransition duration={duration}>
      <div style={{ position: 'absolute', top: 230, width: '100%', textAlign: 'center', fontSize: 34, fontWeight: 500, color: C.elevateMuted, fontStyle: 'italic', ...enter(f, 0.05, 0.5, 10) }}>
        {c.later}
      </div>
      {src.map(([x, y], i) => (
        <MoneyFlow
          key={i}
          points={[[x, y + 30], [x + (540 - x) * 0.4, 560], [540, 650]]}
          draw={draw}
          width={3.5}
          color={i === 1 ? C.upworkGreen : C.elevatePrimary}
          pulses={draw >= 1 ? [((t * 0.7 + i * 0.33) % 1)] : []}
        />
      ))}
      {src.map(([x, y], i) => (
        <div key={i} style={enter(f, 0.25 + i * 0.1, 0.5, 16)}>
          <FlowNode x={x} y={y} label={c.sources[i]} size="sm" tone={i === 1 ? 'upwork' : 'neutral'} />
        </div>
      ))}
      <div style={enter(f, 1.1, 0.6)}>
        <FlowNode x={540} y={700} label="Elevate Pay" size="lg" tone="elevate" />
      </div>
      <div style={{ position: 'absolute', top: 870, left: 70, right: 70 }}>
        <KineticHeadline
          lines={[[{ t: c.lineA }, { t: c.emphasis, tone: 'primary' }], [{ t: c.lineB }]]}
          size={64}
          weight={800}
          start={1.5}
          stagger={0.06}
        />
      </div>
      <div style={{ position: 'absolute', top: 1100, width: '100%', textAlign: 'center', fontSize: 30, color: C.elevateMuted, letterSpacing: '0.06em', ...enter(f, 2.5, 0.5, 10) }}>
        {c.micro}
      </div>
    </SceneTransition>
  );
};
