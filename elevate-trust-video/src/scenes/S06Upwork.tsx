import React from 'react';
import { useCurrentFrame } from 'remotion';
import { FlowNode } from '../components/FlowNode';
import { KineticHeadline } from '../components/KineticHeadline';
import { BrandMark } from '../components/LogoLockup';
import { MoneyFlow } from '../components/MoneyFlow';
import { SceneTransition } from '../components/SceneTransition';
import { copy } from '../data/copy';
import { enter, prog } from '../lib/motion';
import { C } from '../styles/tokens';

export const S06Upwork: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const c = copy.upwork;
  const rail = prog(f, 0.4, 1.0);
  const t = f / 30;
  // Upwork-green pulses travel through the Elevate rail
  const pulses = rail >= 1 ? [((t - 1.4) * 0.6) % 1, ((t - 1.4) * 0.6 + 0.5) % 1].filter((p) => p > 0) : [];
  return (
    <SceneTransition duration={duration}>
      <MoneyFlow points={[[540, 260], [540, 760]]} draw={rail} width={6} pulses={pulses} pulseColor={C.upworkGreen} />
      <div style={enter(f, 0.1, 0.5)}>
        <FlowNode x={540} y={230} label="" tone="upwork" size="lg" logo={<BrandMark which="upwork" height={50} />} />
      </div>
      <div style={enter(f, 0.6, 0.5)}>
        <FlowNode x={540} y={500} label="" tone="elevate" size="lg" logo={<BrandMark which="elevate" height={50} />} />
      </div>
      <div style={enter(f, 1.1, 0.5)}>
        <FlowNode x={540} y={770} label={c.nodes[2]} size="md" />
      </div>
      <div style={{ position: 'absolute', top: 930, left: 80, right: 80 }}>
        <KineticHeadline lines={[[{ t: 'Now my ' }, { t: 'Upwork', tone: 'green' }, { t: 'earnings' }], [{ t: c.line2 }]]} size={68} weight={800} start={1.4} />
      </div>
    </SceneTransition>
  );
};
