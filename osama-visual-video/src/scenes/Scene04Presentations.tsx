import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { SceneTitle } from '../components/ArabicHeadline';
import { PresentationMockup, SLIDE_H, SLIDE_W, SlideSlot } from '../components/PresentationMockup';
import { ServiceCard } from '../components/ServiceCard';
import { presentations } from '../data/scenes';
import { clamp, ease, reveal } from '../lib/motion';
import { OverviewSlide, overviewRects } from '../slides/DeckSlides';
import { Center, SceneFrame, SceneProps, useBeats } from './common';

type View = { x: number; y: number; w: number };
const FULL: View = { x: 0, y: 0, w: SLIDE_W };
const rectView = (i: number): View => ({ x: overviewRects[i].x, y: overviewRects[i].y, w: overviewRects[i].w });

/** Section Zoom camera: keyframes of [second, view]. */
const cameraAt = (frame: number, keys: [number, View][]) => {
  const t = frame / 30;
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, v0] = keys[i];
    const [t1, v1] = keys[i + 1];
    if (t <= t1) {
      const p = interpolate(t, [t0, t1], [0, 1], { ...clamp, easing: ease });
      // Interpolate zoom in log space so the move feels even.
      const w = Math.exp(Math.log(v0.w) + (Math.log(v1.w) - Math.log(v0.w)) * p);
      const q = (v0.w - w) / (v0.w - v1.w || 1);
      const qq = v0.w === v1.w ? p : q;
      return { x: v0.x + (v1.x - v0.x) * qq, y: v0.y + (v1.y - v0.y) * qq, w };
    }
  }
  return keys[keys.length - 1][1];
};

export const Scene04Presentations: React.FC<SceneProps> = ({ duration }) => {
  const frame = useCurrentFrame();
  const b = useBeats('presentations', duration);
  const keys: [number, View][] = [
    [b(1.5), FULL],
    [b(2.4), rectView(1)],
    [b(4.1), rectView(1)],
    [b(4.9), FULL],
    [b(5.4), FULL],
    [b(6.3), rectView(3)],
    [b(7.9), rectView(3)],
    [b(8.7), FULL],
  ];
  const v = cameraAt(frame, keys);
  const s = SLIDE_W / v.w;
  const t = frame / 30;
  const active = t < b(5.0) ? 1 : 3;
  const hlOn = interpolate(t, [b(1.0), b(1.4)], [0, 1], clamp) * (t < b(5.0) ? 1 : interpolate(t, [b(5.0), b(5.4)], [0, 1], clamp));

  return (
    <SceneFrame duration={duration}>
      <SceneTitle n={presentations.number} lines={presentations.title} />
      <Center top={560}>
        <div style={reveal(frame, 0.3, { dy: 60 })}>
          <PresentationMockup width={920}>
            <div style={{ width: SLIDE_W, height: SLIDE_H, overflow: 'hidden', position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: SLIDE_W,
                  height: SLIDE_H,
                  transformOrigin: '0 0',
                  transform: `scale(${s}) translate(${-v.x}px, ${-v.y}px)`,
                }}
              >
                <SlideSlot id="presentationOverview">
                  <OverviewSlide activeIndex={active} highlight={hlOn} />
                </SlideSlot>
              </div>
            </div>
          </PresentationMockup>
        </div>
      </Center>
      <div style={{ position: 'absolute', top: 1110, left: 70, right: 70, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, direction: 'rtl' }}>
        {presentations.labels.map((l, i) => (
          <ServiceCard
            key={l}
            label={l}
            startSec={b(2.6) + i * 0.4}
            icon={(['users', 'chart', 'target', 'layers', 'structure'] as const)[i]}
            latin={/[A-Za-z]/.test(l)}
            fontSize={29}
          />
        ))}
      </div>
    </SceneFrame>
  );
};
