import React from 'react';
import { useCurrentFrame } from 'remotion';
import { FlowNode } from '../components/FlowNode';
import { KineticHeadline } from '../components/KineticHeadline';
import { MoneyFlow } from '../components/MoneyFlow';
import { SceneTransition } from '../components/SceneTransition';
import { copy } from '../data/copy';
import { enter, prog } from '../lib/motion';
import { C } from '../styles/tokens';

const clientPos: [number, number][] = [
  [200, 590],
  [420, 540],
  [660, 540],
  [880, 590],
];

export const S03Before: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const b = copy.before;
  const lines = prog(f, 0.9, 0.9);
  const down = prog(f, 1.7, 0.6);
  return (
    <SceneTransition duration={duration}>
      <div style={{ position: 'absolute', top: 200, left: 80, right: 80 }}>
        <KineticHeadline lines={[[{ t: b.line1, tone: 'muted' }], [{ t: b.line2 }]]} size={54} weight={700} start={0.1} stagger={0.04} />
      </div>
      {clientPos.map(([x, y], i) => (
        <MoneyFlow key={i} points={[[x, y + 30], [x + (540 - x) * 0.5, 710], [540, 810]]} draw={lines} width={3} opacity={0.9} />
      ))}
      <MoneyFlow points={[[540, 860], [540, 1030]]} draw={down} width={4} pulses={[down]} />
      {clientPos.map(([x, y], i) => (
        <div key={i} style={enter(f, 0.5 + i * 0.08, 0.5, 20)}>
          <FlowNode x={x} y={y} label={b.clients[i]} size="sm" />
        </div>
      ))}
      <div style={enter(f, 1.3, 0.5)}>
        <FlowNode x={540} y={835} label={b.work} size="md" />
      </div>
      <div style={enter(f, 2.0, 0.5)}>
        <FlowNode x={540} y={1070} label={b.wise} size="md" tone="neutral" style={{ color: C.elevateText }} />
      </div>
      <div style={{ position: 'absolute', top: 1170, left: 80, right: 80 }}>
        <KineticHeadline lines={[[{ t: b.used }]]} size={64} weight={700} start={2.2} />
      </div>
    </SceneTransition>
  );
};
