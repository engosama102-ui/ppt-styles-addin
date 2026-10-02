import React from 'react';
import { useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../../components/KineticHeadline';
import { SceneTransition } from '../../components/SceneTransition';
import { enter, lerp, prog } from '../../lib/motion';
import { C } from '../../styles/tokens';
import { DISPLAY, UpworkMark } from '../brand';
import { copy } from '../copy';

/** IMPACT: the reward slams in, then the film immediately questions it. */
export const F01Hook: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const h = copy.hook;
  const cardIn = prog(f, 0.05, 0.45);
  const count = prog(f, 0.25, 1.15);
  const settle = prog(f, 3.2, 1.2);
  // glow on "ninety-nine" and again on "It's nice"
  const flash = Math.max(0, 1 - Math.abs(f - 42) / 10, 0.7 * (1 - Math.abs(f - 70) / 12));
  const value = count >= 1 ? h.amount : `+$${(2.99 * count).toFixed(2)}`;
  return (
    <SceneTransition duration={duration} inF={1}>
      <div style={{ position: 'absolute', top: 150, width: '100%', textAlign: 'center', fontSize: 30, letterSpacing: '0.24em', fontWeight: 600, color: C.elevateMuted, ...enter(f, 0.0, 0.35, 10) }}>
        {h.date.toUpperCase()}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 70,
          width: 940,
          opacity: cardIn * lerp(1, 0.5, settle),
          transform: `translateY(${(1 - cardIn) * 160}px) scale(${lerp(1, 0.88, settle)})`,
          transformOrigin: 'center top',
        }}
      >
        <div
          style={{
            borderRadius: 36,
            padding: '38px 44px',
            background: C.elevateSurface,
            border: '1.5px solid rgba(255,255,255,0.12)',
            boxShadow: `0 40px 90px rgba(0,0,0,0.7), 0 0 ${40 + flash * 80}px ${C.elevatePrimary}${flash > 0.05 ? '88' : '33'}`,
            display: 'flex',
            alignItems: 'center',
            gap: 30,
          }}
        >
          <UpworkMark size={120} />
          <div style={{ flex: 1, whiteSpace: 'nowrap' }}>
            <div style={{ fontSize: 44, fontWeight: 700 }}>{h.title}</div>
            <div style={{ fontSize: 30, color: C.elevateMuted, marginTop: 6 }}>{h.sub} 🎉</div>
          </div>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: '-0.03em', color: '#C9F59A', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 560, left: 0, right: 0 }}>
        <KineticHeadline lines={[[{ t: h.question }]]} size={210} start={2.95} style={{ ...DISPLAY, fontStretch: '110%' }} />
      </div>
      <div style={{ position: 'absolute', top: 900, left: 60, right: 60 }}>
        <KineticHeadline lines={[[{ t: "But that's not why" }], [{ t: 'I trust ' }, { t: 'Elevate.', tone: 'primary' }]]} size={78} weight={800} start={3.46} stagger={0.17} />
      </div>
    </SceneTransition>
  );
};
