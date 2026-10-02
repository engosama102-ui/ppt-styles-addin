import React from 'react';
import { useCurrentFrame } from 'remotion';
import { LogoLockup } from '../components/LogoLockup';
import { SceneTransition } from '../components/SceneTransition';
import { copy } from '../data/copy';
import { enter, prog } from '../lib/motion';
import { C, tokens } from '../styles/tokens';

/** Final social frame. Everything is on screen by 1.3 s and holds. */
export const S09Final: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const c = copy.final;
  return (
    <SceneTransition duration={duration} outF={0}>
      <div style={{ position: 'absolute', top: 170, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <LogoLockup height={66} progress={prog(f, 0.05, 0.6)} />
      </div>
      <div style={{ position: 'absolute', top: 320, width: '100%', textAlign: 'center', fontSize: 64, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', ...enter(f, 0.3, 0.6) }}>
        {c.tagline1}
        <br />
        <span style={{ color: C.elevatePrimary }}>{c.tagline2}</span>
      </div>
      <div style={{ position: 'absolute', top: 520, left: 120, right: 120, textAlign: 'center', fontSize: 34, lineHeight: 1.4, color: C.elevateMuted, ...enter(f, 0.55, 0.6) }}>
        {c.invite}
      </div>
      <div style={{ position: 'absolute', top: 780, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, ...enter(f, 0.8, 0.6) }}>
        <div style={{ fontSize: 42, fontWeight: 600 }}>{c.mention}</div>
        <div
          style={{
            fontSize: 70,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            padding: '20px 48px',
            borderRadius: tokens.radius.pill,
            background: `linear-gradient(135deg, ${C.elevatePrimary}, ${C.elevateSecondary})`,
            color: '#fff',
            boxShadow: `0 20px 60px ${C.elevatePrimary}55`,
          }}
        >
          {c.hashtag}
        </div>
        <div style={{ fontSize: 28, color: C.elevateMuted, display: 'flex', gap: 22 }}>
          {c.small.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', top: 1200, width: '100%', textAlign: 'center', fontSize: 22, color: C.elevateMuted, opacity: 0.8 * prog(f, 1.1, 0.5) }}>
        {c.disclaimer}
      </div>
    </SceneTransition>
  );
};
