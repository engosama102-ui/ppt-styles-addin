import { FPS } from '../data/timeline';

/** V2 scene lengths (seconds). Rhythm: impact, quiet, flow, flow, quiet, flow, flow, proof, close, brand. */
export const v2Seconds = {
  hook: 3.0,
  trust: 3.0,
  global: 3.0,
  wise: 4.4,
  early: 4.0,
  years: 3.0,
  upwork: 3.0,
  proof: 5.0,
  close: 5.4,
  final: 3.8,
} as const;

export type V2Key = keyof typeof v2Seconds;
export const v2Order = Object.keys(v2Seconds) as V2Key[];

export const v2Scenes = (() => {
  let from = 0;
  return v2Order.map((key) => {
    const duration = Math.round(v2Seconds[key] * FPS);
    const s = { key, from, duration };
    from += duration;
    return s;
  });
})();

export const V2_TOTAL = v2Scenes.reduce((a, s) => a + s.duration, 0);
export const v2At = (k: V2Key) => v2Scenes.find((s) => s.key === k)!;
