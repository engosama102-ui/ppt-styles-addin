import React from 'react';
import { useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../../components/KineticHeadline';
import { SceneTransition } from '../../components/SceneTransition';
import { lerp, prog } from '../../lib/motion';
import { BrandCard, ElevateWordmark } from '../brand';
import { copy } from '../copy';

/**
 * Local 0 = 34.55. "If you freelance globally," 34.65-36.01 · "Elevate is worth checking out." 36.53-38.22.
 * Resolves into the Elevate brand.
 */
export const F10Cta: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const c = copy.cta;
  const up = prog(f, 1.85, 0.5); // first line moves up to make room for the brand
  const brand = prog(f, 1.9, 0.6);
  return (
    <SceneTransition duration={duration} outF={4}>
      <div style={{ position: 'absolute', top: lerp(420, 170, up), left: 50, right: 50, opacity: lerp(1, 0.55, up) }}>
        <KineticHeadline lines={[[{ t: c.a }], [{ t: c.b }]]} size={lerp(100, 72, up)} weight={800} start={0.1} stagger={0.2} />
      </div>
      <div style={{ position: 'absolute', left: 540, top: 600, transform: `translate(-50%,-50%) scale(${0.92 + 0.08 * brand})`, opacity: brand }}>
        <BrandCard glow={1.4} style={{ padding: '56px 90px' }}>
          <ElevateWordmark size={120} />
        </BrandCard>
      </div>
      <div style={{ position: 'absolute', top: 820, left: 50, right: 50 }}>
        <KineticHeadline lines={[[{ t: c.c }], [{ t: c.d, tone: 'primary' }]]} size={84} weight={800} start={1.98} stagger={0.24} />
      </div>
    </SceneTransition>
  );
};
