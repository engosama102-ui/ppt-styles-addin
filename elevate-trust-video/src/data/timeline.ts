/** Scene lengths in seconds. Change a number to retime a scene. */
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1350;

export const sceneSeconds = {
  hook: 3.2,
  trust: 3.6,
  before: 3.2,
  change: 4.0,
  trustMost: 3.6,
  upwork: 3.4,
  proof: 4.2,
  cta: 3.4,
  final: 3.4,
} as const;

export type SceneKey = keyof typeof sceneSeconds;
export const order: SceneKey[] = ['hook', 'trust', 'before', 'change', 'trustMost', 'upwork', 'proof', 'cta', 'final'];

export const scenes = (() => {
  let from = 0;
  return order.map((key) => {
    const duration = Math.round(sceneSeconds[key] * FPS);
    const s = { key, from, duration };
    from += duration;
    return s;
  });
})();

export const TOTAL_FRAMES = scenes.reduce((a, s) => a + s.duration, 0);
export const sceneAt = (key: SceneKey) => scenes.find((s) => s.key === key)!;
