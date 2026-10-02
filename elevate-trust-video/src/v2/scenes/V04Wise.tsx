import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../../components/KineticHeadline';
import { MoneyFlow } from '../../components/MoneyFlow';
import { SceneTransition } from '../../components/SceneTransition';
import { clamp, easeInOut, lerp, prog } from '../../lib/motion';
import { C } from '../../styles/tokens';
import { BrandCard, ElevateWordmark } from '../brand';
import { copy } from '../copy';

const PAN = 1100; // world distance between Wise and Elevate

/** FLOW, main moment: money leaves Wise, the camera follows, lands on Elevate. */
export const V04Wise: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const w = copy.wise;
  const t = f / 30;
  const cam = interpolate(t, [1.45, 3.0], [0, -PAN], { ...clamp, easing: easeInOut });
  const streams = prog(f, 0.9, 1.6);
  const land = prog(f, 2.8, 0.6);
  const textA = 1 - prog(f, 1.35, 0.3);
  const textB = prog(f, 1.6, 0.3) * (1 - prog(f, 2.85, 0.3));
  const y = 820;
  const flows: [number, number][][] = [-40, 0, 40].map((o) => [
    [700, y + o],
    [1000, y - 220 + o],
    [1350, y - 220 + o],
    [PAN + 540 - 260, y + o],
  ]);
  return (
    <SceneTransition duration={duration}>
      {/* fixed text layer */}
      <div style={{ position: 'absolute', top: 160, left: 60, right: 60, opacity: textA }}>
        <KineticHeadline lines={[[{ t: w.a }]]} size={96} weight={800} start={0.1} />
        <div style={{ textAlign: 'center', fontSize: 44, color: C.elevateMuted, marginTop: 18, opacity: prog(f, 0.5, 0.4) }}>{w.aSub}</div>
      </div>
      <div style={{ position: 'absolute', top: 180, left: 60, right: 60, opacity: textB }}>
        <KineticHeadline lines={[[{ t: 'Then I found ' }, { t: 'Elevate.', tone: 'primary' }]]} size={88} weight={800} start={1.6} />
      </div>
      <div style={{ position: 'absolute', top: 150, left: 50, right: 50, opacity: prog(f, 2.9, 0.2) }}>
        <KineticHeadline lines={[[{ t: w.c1 }], [{ t: 'money to ' }, { t: 'Elevate.', tone: 'primary' }]]} size={78} weight={800} start={2.9} stagger={0.05} />
      </div>

      {/* world layer, moved by the camera */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1080 + PAN, height: 1350, transform: `translateX(${cam}px)` }}>
        {flows.map((pts, i) => (
          <MoneyFlow
            key={i}
            points={pts}
            draw={streams}
            width={i === 1 ? 6 : 3}
            opacity={i === 1 ? 1 : 0.55}
            w={1080 + PAN}
            pulses={streams > 0.05 ? [((t * 0.55 + i * 0.22) % 1) * streams] : []}
          />
        ))}
        {/* Wise: neutral, respectful, part of the past */}
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: y,
            transform: `translate(-50%,-50%) scale(${lerp(1, 0.9, prog(f, 1.4, 1.2))})`,
            opacity: lerp(1, 0.6, prog(f, 1.6, 1.2)),
            width: 420,
            padding: '44px 0',
            borderRadius: 32,
            background: '#15151C',
            border: '2px solid rgba(255,255,255,0.16)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: '-0.03em', color: '#E6E7EE' }}>{w.wiseLabel}</div>
          <div style={{ fontSize: 30, color: C.elevateMuted, marginTop: 8 }}>{w.wiseSub}</div>
        </div>
        {/* Elevate: destination */}
        <div style={{ position: 'absolute', left: PAN + 540, top: y, transform: `translate(-50%,-50%) scale(${lerp(0.94, 1.04, land)})` }}>
          <BrandCard glow={0.6 + land} style={{ width: 560, padding: '54px 0', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ElevateWordmark size={92} />
            </div>
            <div style={{ fontSize: 32, color: C.elevateMuted, marginTop: 14 }}>{w.elevateSub}</div>
          </BrandCard>
        </div>
      </div>
    </SceneTransition>
  );
};
