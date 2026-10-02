import React from 'react';
import { useCurrentFrame } from 'remotion';
import { FlowNode } from '../components/FlowNode';
import { KineticHeadline } from '../components/KineticHeadline';
import { MoneyFlow } from '../components/MoneyFlow';
import { SceneTransition } from '../components/SceneTransition';
import { copy } from '../data/copy';
import { enter, lerp, prog } from '../lib/motion';
import { C } from '../styles/tokens';

export const S04Change: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const c = copy.change;
  const fadeWise = prog(f, 1.2, 1.2);
  const toElevate = prog(f, 1.3, 1.3);
  const grow = prog(f, 2.2, 0.8);
  const t = f / 30;
  return (
    <SceneTransition duration={duration}>
      <div style={{ position: 'absolute', top: 120, left: 80, right: 80, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <KineticHeadline lines={[[{ t: c.line1 }]]} size={56} weight={800} start={0.1} />
        <div style={{ opacity: 1 }}>
          <KineticHeadline lines={[[{ t: c.line2, tone: 'muted' }]]} size={42} weight={600} start={1.0} />
        </div>
        <KineticHeadline lines={[[{ t: c.line3 }], [{ t: 'from Wise to ' }, { t: 'Elevate.', tone: 'primary' }]]} size={46} weight={700} start={1.9} stagger={0.05} />
      </div>
      {/* source */}
      <FlowNode x={540} y={600} label={copy.before.source} size="sm" style={enter(f, 0.2, 0.5, 16)} />
      {/* old path to Wise fades into the past */}
      <MoneyFlow points={[[540, 630], [400, 720], [270, 830]]} draw={prog(f, 0.3, 0.6)} color={C.past} width={3} opacity={1 - fadeWise * 0.5} />
      {/* new path to Elevate */}
      <MoneyFlow points={[[540, 630], [680, 760], [780, 980]]} draw={toElevate} width={5} pulses={[(t * 0.55) % 1].map((p) => (toElevate >= 1 ? p : 0))} />
      <div style={{ opacity: lerp(1, 0.7, fadeWise), transform: `translateY(${-fadeWise * 30}px) scale(${lerp(1, 0.88, fadeWise)})` }}>
        <FlowNode x={250} y={860} label="Wise" sub={c.past} size="md" tone="past" />
      </div>
      <div style={{ opacity: toElevate, transform: `scale(${lerp(0.9, 1.08, grow)})`, transformOrigin: '780px 1030px' }}>
        <FlowNode x={780} y={1030} label="Elevate Pay" sub={c.now} size="lg" tone="elevate" />
      </div>
    </SceneTransition>
  );
};
