import React from 'react';
import { useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../components/KineticHeadline';
import { SceneTransition } from '../components/SceneTransition';
import { copy } from '../data/copy';
import { lerp, prog } from '../lib/motion';

/** Three short statements; each new one dims the previous. */
export const S08Cta: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const c = copy.cta;
  const dimA = prog(f, 1.1, 0.5);
  const dimB = prog(f, 2.2, 0.5);
  return (
    <SceneTransition duration={duration}>
      <div style={{ position: 'absolute', top: 260, left: 70, right: 70, opacity: lerp(1, 0.35, dimA) }}>
        <KineticHeadline lines={[[{ t: c.a1 }], [{ t: c.a2 }]]} size={54} weight={700} start={0.1} stagger={0.04} />
      </div>
      <div style={{ position: 'absolute', top: 520, left: 70, right: 70, opacity: lerp(1, 0.35, dimB) }}>
        <KineticHeadline lines={[[{ t: c.b1 }], [{ t: c.b2 }]]} size={54} weight={700} start={1.1} stagger={0.04} />
      </div>
      <div style={{ position: 'absolute', top: 820, left: 70, right: 70 }}>
        <KineticHeadline lines={[[{ t: "For me, that's" }], [{ t: 'Elevate Pay.', tone: 'primary' }]]} size={80} weight={800} start={2.2} stagger={0.06} />
      </div>
    </SceneTransition>
  );
};
