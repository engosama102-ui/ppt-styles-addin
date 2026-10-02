import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../../components/KineticHeadline';
import { MoneyFlow } from '../../components/MoneyFlow';
import { SceneTransition } from '../../components/SceneTransition';
import { clamp, easeInOut, enter, lerp, prog } from '../../lib/motion';
import { C } from '../../styles/tokens';
import { BrandCard, ElevateWordmark, Pill, UpworkLockup, UpworkMark } from '../brand';
import { copy } from '../copy';
import { CHIP_END } from '../handoff';

/** FLOW: the payment moves Upwork → Elevate → my USD account, then becomes the evidence. */
export const V07Upwork: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const u = copy.upwork;
  const t = f / 30;
  const rail = prog(f, 0.2, 0.7);
  // chip travels down the rail, then rises to the hand-off position
  const travel = interpolate(t, [0.9, 2.1], [0, 1], { ...clamp, easing: easeInOut });
  const lift = interpolate(t, [2.25, 2.95], [0, 1], { ...clamp, easing: easeInOut });
  const chipY = lerp(lerp(330, 860, travel), CHIP_END.cy, lift);
  const chipScale = lerp(0.62, 1, lift);
  const nodesDim = 1 - lift * 0.85;
  return (
    <SceneTransition duration={duration} outF={0}>
      <div style={{ opacity: nodesDim }}>
        <MoneyFlow points={[[540, 250], [540, 860]]} draw={rail} width={6} pulses={rail >= 1 ? [((t - 0.9) * 0.7) % 1].filter((p) => p > 0) : []} pulseColor={C.upworkGreen} />
        <div style={{ position: 'absolute', left: 540, top: 250, transform: 'translate(-50%,-50%)' }}><div style={{ ...enter(f, 0.0, 0.4) }}>
          <Pill style={{ padding: '22px 40px', border: `2px solid ${C.upworkGreen}` }}>
            <UpworkLockup size={52} />
          </Pill>
        </div>
        </div>
        <div style={{ position: 'absolute', left: 540, top: 555, transform: 'translate(-50%,-50%)' }}><div style={{ ...enter(f, 0.3, 0.4) }}>
          <BrandCard glow={0.5 + 0.8 * Math.max(0, 1 - Math.abs(travel - 0.5) * 3)} style={{ padding: '34px 64px' }}>
            <ElevateWordmark size={70} />
          </BrandCard>
        </div>
        </div>
        <div style={{ position: 'absolute', left: 540, top: 860, transform: 'translate(-50%,-50%)' }}><div style={{ ...enter(f, 0.6, 0.4) }}>
          <Pill style={{ fontSize: 44, padding: '22px 42px' }}>
            <span style={{ padding: '6px 18px', borderRadius: 999, background: '#0C1033', border: `1.5px solid ${C.elevatePrimary}`, fontSize: 30 }}>USD</span>
            {u.usd}
          </Pill>
        </div>
        </div>
        <div style={{ position: 'absolute', top: 1010, left: 50, right: 50 }}>
          <KineticHeadline lines={[[{ t: 'Now my ' }, { t: 'Upwork', tone: 'green' }, { t: 'earnings' }], [{ t: u.line2 }]]} size={70} weight={800} start={0.5} />
        </div>
      </div>
      {/* the +$2.99 payment chip */}
      <div
        style={{
          position: 'absolute',
          left: CHIP_END.cx - CHIP_END.w / 2,
          top: chipY - CHIP_END.h / 2,
          width: CHIP_END.w,
          height: CHIP_END.h,
          transform: `scale(${chipScale})`,
          opacity: prog(f, 0.9, 0.25) * (travel > 0 || lift > 0 ? 1 : 0),
          borderRadius: CHIP_END.h / 2,
          background: '#000',
          border: `2px solid ${C.upworkGreen}`,
          boxShadow: `0 0 50px ${C.upworkGreen}55`,
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          padding: '0 40px 0 22px',
          boxSizing: 'border-box',
        }}
      >
        <UpworkMark size={104} />
        <div style={{ flex: 1, fontSize: 40, fontWeight: 700, whiteSpace: 'nowrap' }}>{u.chip}</div>
        <div style={{ fontSize: 60, fontWeight: 800, color: '#C9F59A' }}>{u.amount}</div>
      </div>
    </SceneTransition>
  );
};
