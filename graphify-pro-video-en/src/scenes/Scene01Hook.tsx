import React from 'react';
import { useCurrentFrame } from 'remotion';
import { AnnotationBubble } from '../components/AnnotationBubble';
import { Headline } from '../components/Headline';
import { PresentationMockup, SlideSlot } from '../components/PresentationMockup';
import { hook } from '../data/scenes';
import { progress, reveal } from '../lib/motion';
import { BadSlide } from '../slides/CompareSlides';
import { Center, SceneFrame, SceneProps, useBeats } from './common';

export const MOCK_W = 920;
export const MOCK_TOP = 720;

export const Scene01Hook: React.FC<SceneProps> = ({ duration }) => {
  const frame = useCurrentFrame();
  const b = useBeats('hook', duration);
  const zoom = 1 + 0.05 * progress(frame, 0.5, duration / 30);
  const k = MOCK_W / 1600;
  const bubbles = [
    { text: hook.comments[0], x: 700, y: -60, tx: 1000 * k, ty: 300 * k, t: b(1.4) },
    { text: hook.comments[1], x: 210, y: -60, tx: 600 * k, ty: 55 * k, t: b(2.3) },
    { text: hook.comments[2], x: 690, y: 590, tx: 1000 * k, ty: 425 * k, t: b(3.2) },
    { text: hook.comments[3], x: 220, y: 590, tx: 260 * k, ty: 190 * k, t: b(4.1) },
  ];
  return (
    <SceneFrame duration={duration} inFrames={1}>
      <div style={{ position: 'absolute', top: 330, left: 60, right: 60 }}>
        <Headline lines={hook.headline} size={68} startSec={0.15} stagger={0.35} />
      </div>
      <Center top={MOCK_TOP}>
        <div style={{ position: 'relative', ...reveal(frame, 0.5, { dy: 60 }) }}>
          <div style={{ transform: `scale(${zoom})` }}>
            <PresentationMockup width={MOCK_W} glow={false}>
              <SlideSlot id="badSlide">
                <BadSlide />
              </SlideSlot>
            </PresentationMockup>
          </div>
          {bubbles.map((q) => (
            <AnnotationBubble key={q.text} text={q.text} x={q.x} y={q.y} tx={q.tx} ty={q.ty} startSec={q.t} tone="warn" fontSize={32} />
          ))}
        </div>
      </Center>
    </SceneFrame>
  );
};
