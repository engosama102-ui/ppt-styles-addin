import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneTransition } from '../../components/SceneTransition';
import { enter, prog } from '../../lib/motion';
import { C } from '../../styles/tokens';
import { DISPLAY, ElevateWordmark, UpworkLockup } from '../brand';
import { copy } from '../copy';

/** BRAND CARD on the music tail after the voice ends (38.30 → 40.80). Everything is in by 0.5 s. */
export const F11Final: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const c = copy.final;
  return (
    <SceneTransition duration={duration} outF={0}>
      {/* CTA-card glow, as on the giveaway page */}
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 80% 45% at 50% 0%, ${C.elevateGlow} 0%, transparent 75%)`, opacity: prog(f, 0, 0.5) }} />
      <div style={{ position: 'absolute', top: 240, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34, ...enter(f, 0.0, 0.4) }}>
        <ElevateWordmark size={86} />
        <span style={{ fontSize: 56, color: C.elevateMuted, fontWeight: 300 }}>×</span>
        <UpworkLockup size={66} />
      </div>
      <div style={{ position: 'absolute', top: 450, width: '100%', textAlign: 'center', ...DISPLAY, fontSize: 60, lineHeight: 1.12, ...enter(f, 0.1, 0.4) }}>
        {c.tagline1}
        <br />
        <span style={{ color: C.elevateAccentText }}>{c.tagline2}</span>
      </div>
      <div style={{ position: 'absolute', top: 740, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, ...enter(f, 0.15, 0.4) }}>
        <div style={{ fontSize: 52, fontWeight: 700 }}>{c.mention}</div>
        <div
          style={{
            fontSize: 78,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            padding: '24px 54px',
            borderRadius: 999,
            background: C.elevatePrimary,
            color: '#fff',
            boxShadow: `0 24px 70px ${C.elevatePrimary}77`,
          }}
        >
          {c.hashtag}
        </div>
        <div style={{ fontSize: 34, color: C.elevateMuted, display: 'flex', gap: 26 }}>
          {c.small.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', top: 1220, width: '100%', textAlign: 'center', fontSize: 26, color: C.elevateMuted, opacity: 0.85 * prog(f, 0.2, 0.4) }}>{c.disclaimer}</div>
    </SceneTransition>
  );
};
