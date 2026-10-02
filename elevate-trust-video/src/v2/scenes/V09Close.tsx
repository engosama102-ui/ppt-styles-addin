import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { KineticHeadline, Seg } from '../../components/KineticHeadline';
import { MoneyFlow } from '../../components/MoneyFlow';
import { SceneTransition } from '../../components/SceneTransition';
import { clamp, prog } from '../../lib/motion';
import { copy } from '../copy';

const beats = [0.0, 1.3, 2.7, 4.0];

/** EMOTIONAL CLOSE: one statement at a time, each replaces the last. */
export const V09Close: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const end = duration / 30;
  const line = prog(f, 0.25, 1.0);
  return (
    <SceneTransition duration={duration}>
      {/* callback to the trust line from the opening */}
      <div style={{ opacity: 1 - prog(f, 1.2, 0.3) }}>
        <MoneyFlow points={[[160, 820], [920, 820]]} draw={line} width={5} pulses={[line > 0.02 && line < 1 ? line : 0]} />
      </div>
      {copy.close.map(([a, b], i) => {
        const start = beats[i];
        const stop = i < beats.length - 1 ? beats[i + 1] : end + 1;
        const out = interpolate(t, [stop - 0.25, stop], [1, 0], clamp);
        const rise = interpolate(t, [stop - 0.25, stop], [0, -40], clamp);
        if (t < start - 0.05 || t > stop) return null;
        const last = i === beats.length - 1;
        const lines: Seg[][] =
          i === 0
            ? [[{ t: a }], [{ t: b, tone: 'primary' }]]
            : last
              ? [[{ t: a }], [{ t: 'Take a look at ' }], [{ t: 'Elevate Pay.', tone: 'primary' }]]
              : [[{ t: a }], [{ t: b }]];
        return (
          <div key={i} style={{ position: 'absolute', top: last ? 470 : 520, left: 50, right: 50, opacity: out, transform: `translateY(${rise}px)` }}>
            <KineticHeadline lines={lines} size={i === 0 ? 96 : 84} weight={800} start={start + 0.05} stagger={0.05} />
          </div>
        );
      })}
    </SceneTransition>
  );
};
