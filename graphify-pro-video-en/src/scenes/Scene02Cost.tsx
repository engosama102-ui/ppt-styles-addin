import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Headline } from '../components/Headline';
import { Icon, IconName } from '../components/Icons';
import { PresentationMockup, SlideSlot } from '../components/PresentationMockup';
import { brand } from '../config/brand';
import { cost } from '../data/scenes';
import { easeOut, progress } from '../lib/motion';
import { txt } from '../lib/text';
import { BadSlide } from '../slides/CompareSlides';
import { Center, SceneFrame, SceneProps, useBeats } from './common';
import { MOCK_TOP, MOCK_W } from './Scene01Hook';

const c = brand.colors;
const icons: IconName[] = ['confused', 'attention', 'engagement', 'decision'];

export const Scene02Cost: React.FC<SceneProps> = ({ duration }) => {
  const frame = useCurrentFrame();
  const b = useBeats('cost', duration);
  const back = progress(frame, 0, 1.0);
  const lineTimes = [b(0.5), b(2.0), b(3.6)];
  const sizes = [80, 80, 76];
  return (
    <SceneFrame duration={duration} inFrames={1}>
      {/* The weak slide recedes into the background. */}
      <Center top={MOCK_TOP}>
        <div
          style={{
            transform: `scale(${1.05 - back * 0.25}) translateY(${back * -120}px)`,
            opacity: 1 - back * 0.85,
            filter: `blur(${back * 8}px)`,
          }}
        >
          <PresentationMockup width={MOCK_W} glow={false}>
            <SlideSlot id="badSlide">
              <BadSlide />
            </SlideSlot>
          </PresentationMockup>
        </div>
      </Center>

      <div style={{ position: 'absolute', top: 430, left: 60, right: 60, display: 'flex', flexDirection: 'column', gap: 26 }}>
        {cost.lines.map((line, i) => (
          <div key={i} style={{ opacity: i < 2 ? 1 - 0.35 * progress(frame, lineTimes[2], 0.6) : 1 }}>
            <Headline lines={[line]} size={sizes[i]} startSec={lineTimes[i]} />
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', top: 1010, left: 80, right: 80, display: 'flex', justifyContent: 'space-between', direction: 'ltr' }}>
        {cost.reactions.map((r, i) => {
          const p = progress(frame, b(4.6) + i * 0.25, 0.6, easeOut);
          const fall = progress(frame, b(4.9) + i * 0.25, 1.2);
          return (
            <div
              key={r}
              style={{
                ...txt,
                width: 205,
                height: 205,
                borderRadius: 26,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 18,
                opacity: p * 0.85,
                transform: `translateY(${(1 - p) * 30 + fall * 10}px)`,
              }}
            >
              <Icon name={icons[i]} size={64} color={i === 3 ? '#FF7A7A' : c.gray} stroke={2.6} />
              <div style={{ fontSize: 22, color: c.gray, textAlign: 'center', padding: '0 10px' }}>{r}</div>
            </div>
          );
        })}
      </div>
    </SceneFrame>
  );
};
