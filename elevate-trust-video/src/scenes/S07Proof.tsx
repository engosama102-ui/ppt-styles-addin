import React from 'react';
import { useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../components/KineticHeadline';
import { SceneTransition } from '../components/SceneTransition';
import { ScreenshotReveal } from '../components/ScreenshotReveal';
import { copy } from '../data/copy';
import { enter } from '../lib/motion';
import { C } from '../styles/tokens';

export const S07Proof: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const c = copy.proof;
  return (
    <SceneTransition duration={duration}>
      <div style={{ position: 'absolute', top: 150, width: '100%', textAlign: 'center', fontSize: 26, letterSpacing: '0.16em', color: C.elevateMuted, fontWeight: 600, ...enter(f, 0.05, 0.4, 10) }}>
        {c.kicker.toUpperCase()}
      </div>
      <div style={{ position: 'absolute', top: 230, left: 80 }}>
        <ScreenshotReveal width={920} start={0.2} focusStart={1.0} placeholderText={c.placeholder} />
      </div>
      <div style={{ position: 'absolute', top: 700, left: 80, right: 80 }}>
        <KineticHeadline lines={[[{ t: c.yes, tone: 'muted' }]]} size={48} weight={600} start={1.5} />
      </div>
      <div style={{ position: 'absolute', top: 790, left: 70, right: 70 }}>
        <KineticHeadline lines={[[{ t: '$2.99 back is a' }], [{ t: 'nice bonus. 😉', tone: 'primary' }]]} size={70} weight={800} start={2.0} stagger={0.06} />
      </div>
      <div style={{ position: 'absolute', top: 1040, width: '100%', textAlign: 'center', fontSize: 34, color: C.elevateText, fontWeight: 500, ...enter(f, 3.0, 0.5, 10) }}>
        {c.small}
      </div>
    </SceneTransition>
  );
};
