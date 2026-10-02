import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../../components/KineticHeadline';
import { MoneyFlow } from '../../components/MoneyFlow';
import { SceneTransition } from '../../components/SceneTransition';
import { clamp, easeInOut, lerp, prog } from '../../lib/motion';
import { C } from '../../styles/tokens';
import { BrandCard, ElevateWordmark } from '../brand';
import { copy } from '../copy';

const PAN = 1100;

/**
 * Local time 0 = 14.75 s in the voice-over.
 *  0.17 "I used Wise."                         (14.92)
 *  1.38 "Then, early on, I discovered Elevate." (16.13) → camera follows the flow
 *  4.55 "Over time, I moved my freelance earnings there," (19.30) → earnings pour in
 *  7.71 "and I stayed."                        (22.46) → quiet hold
 */
export const F04Wise: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const w = copy.wise;
  const t = f / 30;
  const cam = interpolate(t, [1.6, 3.9], [0, -PAN], { ...clamp, easing: easeInOut });
  const streams = prog(f, 1.35, 2.3);
  const land = prog(f, 3.7, 0.7);
  const pour = interpolate(t, [4.5, 5.0, 7.2, 7.7], [0, 1, 1, 0], clamp); // earnings flowing in
  const still = prog(f, 7.6, 0.8); // quiet moment
  const A = 1 - prog(f, 1.2, 0.25);
  const B = prog(f, 1.38, 0.25) * (1 - prog(f, 4.3, 0.25));
  const Ct = prog(f, 4.5, 0.25) * (1 - prog(f, 7.45, 0.25));
  const D = prog(f, 7.65, 0.3);
  const y = 840;
  const flows: [number, number][][] = [-44, 0, 44].map((o) => [
    [700, y + o],
    [1000, y - 230 + o],
    [1350, y - 230 + o],
    [PAN + 540 - 270, y + o],
  ]);
  // pulse speed: travelling during the pan, pouring during "moved my earnings", calm after "stayed"
  const speed = 0.5 + pour * 0.6;
  return (
    <SceneTransition duration={duration}>
      <div style={{ position: 'absolute', top: 160, left: 60, right: 60, opacity: A }}>
        <KineticHeadline lines={[[{ t: w.a }]]} size={100} weight={800} start={0.17} stagger={0.12} />
        <div style={{ textAlign: 'center', fontSize: 44, color: C.elevateMuted, marginTop: 18, opacity: prog(f, 0.6, 0.4) }}>{w.aSub}</div>
      </div>
      <div style={{ position: 'absolute', top: 160, left: 50, right: 50, opacity: B }}>
        <KineticHeadline lines={[[{ t: 'Then, early on,' }], [{ t: 'I discovered ' }, { t: 'Elevate.', tone: 'primary' }]]} size={80} weight={800} start={1.38} stagger={0.2} />
      </div>
      <div style={{ position: 'absolute', top: 160, left: 50, right: 50, opacity: Ct }}>
        <KineticHeadline lines={[[{ t: w.c1 }], [{ t: 'freelance earnings ' }, { t: 'there.', tone: 'primary' }]]} size={74} weight={800} start={4.55} stagger={0.2} />
      </div>
      <div style={{ position: 'absolute', top: 175, left: 50, right: 50, opacity: D }}>
        <KineticHeadline lines={[[{ t: 'And I ' }, { t: 'stayed.', tone: 'primary' }]]} size={120} weight={800} start={7.71} stagger={0.15} />
      </div>

      <div style={{ position: 'absolute', left: 0, top: 0, width: 1080 + PAN, height: 1350, transform: `translateX(${cam}px)` }}>
        {flows.map((pts, i) => (
          <MoneyFlow
            key={i}
            points={pts}
            draw={streams}
            width={i === 1 ? 6 + pour * 2 : 3}
            opacity={(i === 1 ? 1 : 0.55) * lerp(1, 0.55, still)}
            w={1080 + PAN}
            pulses={
              streams > 0.05 && still < 1
                ? [((t * speed + i * 0.22) % 1) * streams, ...(pour > 0.3 ? [((t * speed + 0.5 + i * 0.22) % 1)] : [])]
                : []
            }
          />
        ))}
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: y,
            transform: `translate(-50%,-50%) scale(${lerp(1, 0.9, prog(f, 1.5, 1.4))})`,
            opacity: lerp(1, 0.6, prog(f, 1.8, 1.4)),
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
        <div style={{ position: 'absolute', left: PAN + 540, top: y, transform: `translate(-50%,-50%) scale(${lerp(0.94, 1.04, land) + pour * 0.03 + still * 0.03})` }}>
          <BrandCard glow={0.6 + land + pour * 0.6} style={{ width: 580, padding: '56px 0', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ElevateWordmark size={96} />
            </div>
            <div style={{ fontSize: 32, color: C.elevateMuted, marginTop: 14 }}>{w.elevateSub}</div>
          </BrandCard>
        </div>
      </div>
    </SceneTransition>
  );
};
