import React from 'react';
import { Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { KineticHeadline } from '../../components/KineticHeadline';
import { SceneTransition } from '../../components/SceneTransition';
import { clamp, easeInOut, enter, lerp, prog } from '../../lib/motion';
import { C } from '../../styles/tokens';
import { DISPLAY, UpworkMark } from '../brand';
import { copy } from '../copy';
import { CHIP_END, PROOF_WINDOW } from '../handoff';

/** Privacy-safe derivative of the real screenshot: only the Upwork Reward row is sharp. */
const IMG = { file: 'assets/elevate-reward-sanitized.png', w: 923, h: 660, band: 394 };
const W = PROOF_WINDOW.w;
const H = PROOF_WINDOW.h;
const k = W / IMG.w;
const offY = H / 2 - IMG.band * k;
const P = (x: number, y: number): [number, number] => [x * k, y * k + offY];

/** Camera keyframes inside the evidence window: [sec, scale, focal x, focal y]. */
const keys: [number, number, number, number][] = [
  [0.6, 1, W / 2, H / 2],
  [1.0, 1, W / 2, H / 2],
  [1.8, 1.8, ...P(330, 362)],
  [2.0, 1.8, ...P(330, 362)],
  [2.6, 1.95, ...P(790, 375)],
  [3.1, 1.95, ...P(790, 375)],
  [3.7, 1.0, W / 2, H / 2],
];
const cam = (t: number) => {
  if (t <= keys[0][0]) return keys[0];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (t <= b[0]) {
      const p = interpolate(t, [a[0], b[0]], [0, 1], { ...clamp, easing: easeInOut });
      return [t, lerp(a[1], b[1], p), lerp(a[2], b[2], p), lerp(a[3], b[3], p)] as typeof a;
    }
  }
  return keys[keys.length - 1];
};

/** PROOF: the animated chip becomes the real screenshot. */
export const V08Proof: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const c = copy.proof;
  const t = f / 30;
  const m = interpolate(t, [0, 0.6], [0, 1], { ...clamp, easing: easeInOut });
  const rect = {
    x: lerp(CHIP_END.cx - CHIP_END.w / 2, PROOF_WINDOW.x, m),
    y: lerp(CHIP_END.cy - CHIP_END.h / 2, PROOF_WINDOW.y, m),
    w: lerp(CHIP_END.w, W, m),
    h: lerp(CHIP_END.h, H, m),
    r: lerp(CHIP_END.h / 2, 34, m),
  };
  const [, s, fx, fy] = cam(t);
  const [bx, by] = P(735, 345);
  const focus = prog(f, 2.55, 0.5);
  return (
    <SceneTransition duration={duration} inF={1}>
      <div style={{ position: 'absolute', top: 120, width: '100%', textAlign: 'center', fontSize: 40, fontWeight: 700, letterSpacing: '0.04em', color: C.elevateText, ...enter(f, 0.15, 0.4, 10) }}>{c.kicker}</div>
      <div
        style={{
          position: 'absolute',
          left: rect.x,
          top: rect.y,
          width: rect.w,
          height: rect.h,
          borderRadius: rect.r,
          overflow: 'hidden',
          background: '#000',
          border: `2px solid ${m < 1 ? C.upworkGreen : 'rgba(255,255,255,0.14)'}`,
          boxShadow: `0 40px 100px rgba(0,0,0,0.75), 0 0 ${lerp(50, 70, m)}px ${C.elevatePrimary}44`,
        }}
      >
        {/* the real screenshot, centered in the morphing window */}
        <div style={{ position: 'absolute', left: (rect.w - W) / 2, top: (rect.h - H) / 2, width: W, height: H, opacity: m }}>
          <div style={{ position: 'absolute', inset: 0, transformOrigin: '0 0', transform: `translate(${W / 2}px, ${H / 2}px) scale(${s}) translate(${-fx}px, ${-fy}px)` }}>
            <Img src={staticFile(IMG.file)} style={{ position: 'absolute', left: 0, top: offY, width: W, height: IMG.h * k }} />
            <div
              style={{
                position: 'absolute',
                left: bx - 14,
                top: by - 10,
                width: 145 * k + 28,
                height: 55 * k + 20,
                borderRadius: 16,
                border: `4px solid ${C.upworkGreen}`,
                boxShadow: `0 0 26px ${C.upworkGreen}88`,
                opacity: focus,
                transform: `scale(${1.2 - 0.2 * focus})`,
              }}
            />
          </div>
        </div>
        {/* chip face fades as the screenshot takes over */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 22, padding: '0 40px 0 22px', opacity: 1 - m * 1.6 }}>
          <UpworkMark size={104} />
          <div style={{ flex: 1, fontSize: 40, fontWeight: 700, whiteSpace: 'nowrap' }}>Upwork Reward</div>
          <div style={{ fontSize: 60, fontWeight: 800, color: '#C9F59A' }}>+$2.99</div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 790, left: 50, right: 50 }}>
        <KineticHeadline lines={[[{ t: 'Nice? ' }, { t: 'Absolutely.', tone: 'primary' }]]} size={82} weight={800} start={2.9} />
      </div>
      <div style={{ position: 'absolute', top: 930, left: 50, right: 50, opacity: 1 }}>
        <KineticHeadline lines={[[{ t: c.reason, tone: 'muted' }]]} size={54} weight={700} start={3.5} />
      </div>
      <div style={{ position: 'absolute', top: 1010, width: '100%', textAlign: 'center', ...DISPLAY, fontSize: 150, ...enter(f, 4.1, 0.35, 30) }}>{c.no}</div>
      <div style={{ position: 'absolute', top: 1270, width: '100%', textAlign: 'center', fontSize: 24, color: C.elevateMuted, opacity: 0.9 * prog(f, 1.0, 0.5) }}>{c.note}</div>
    </SceneTransition>
  );
};
