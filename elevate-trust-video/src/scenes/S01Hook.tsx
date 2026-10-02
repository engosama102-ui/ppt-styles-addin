import React from 'react';
import { useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../components/KineticHeadline';
import { SceneTransition } from '../components/SceneTransition';
import { TransactionCard } from '../components/TransactionCard';
import { copy } from '../data/copy';
import { enter, lerp, prog } from '../lib/motion';
import { C } from '../styles/tokens';

export const S01Hook: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const h = copy.hook;
  // fast entrance, then everything slows into a gentle drift
  const cardIn = prog(f, 0.35, 0.45);
  const count = prog(f, 0.45, 0.5);
  const settle = prog(f, 1.3, 1.6);
  return (
    <SceneTransition duration={duration} inF={1}>
      <div style={{ position: 'absolute', top: 310, width: '100%', textAlign: 'center', fontSize: 28, letterSpacing: '0.2em', color: C.elevateMuted, fontWeight: 500, ...enter(f, 0.05, 0.4, 10) }}>
        {h.date.toUpperCase()}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 400,
          left: 120,
          opacity: cardIn * lerp(1, 0.55, settle),
          transform: `translateY(${(1 - cardIn) * 120}px) scale(${lerp(1, 0.86, settle)})`,
          transformOrigin: 'center top',
        }}
      >
        <TransactionCard amount={h.amount} label={h.label} date={h.date} countP={count} />
      </div>
      <div style={{ position: 'absolute', top: 760, left: 0, right: 0 }}>
        <KineticHeadline lines={[[{ t: h.question }]]} size={150} weight={800} start={1.35} />
      </div>
      <div style={{ position: 'absolute', top: 980, left: 80, right: 80 }}>
        <KineticHeadline lines={[[{ t: h.answer }]]} size={54} weight={600} start={2.0} stagger={0.07} />
      </div>
    </SceneTransition>
  );
};
