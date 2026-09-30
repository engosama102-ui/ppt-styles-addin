import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Headline } from '../components/Headline';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { CTASection } from '../components/CTASection';
import { Icon } from '../components/Icons';
import { SlideSlot } from '../components/PresentationMockup';
import { ProgressSteps } from '../components/ProgressSteps';
import { brand } from '../config/brand';
import { beforeAfter, process } from '../data/scenes';
import { easeOut, lerp, progress, reveal } from '../lib/motion';
import { txt } from '../lib/text';
import { BadSlide, GoodSlide } from '../slides/CompareSlides';
import { Center, SceneFrame, SceneProps, useBeats } from './common';

const c = brand.colors;

export const Scene09Process: React.FC<SceneProps> = ({ duration }) => {
  const b = useBeats('process', duration);
  return (
    <SceneFrame duration={duration}>
      <div style={{ position: 'absolute', top: 320, left: 60, right: 60 }}>
        <Headline lines={process.title} size={58} startSec={0.1} />
      </div>
      <Center top={560}>
        <ProgressSteps steps={process.steps} stepTimes={[b(1.0), b(2.4), b(3.8), b(5.2), b(6.6)]} rowH={148} />
      </Center>
    </SceneFrame>
  );
};

export const Scene10BeforeAfter: React.FC<SceneProps> = ({ duration }) => {
  const frame = useCurrentFrame();
  const b = useBeats('beforeAfter', duration);
  // Divider enters from the right edge and settles at the middle,
  // revealing the redesign on the right half.
  const move = progress(frame, 0.5, b(1.6));
  const divider = lerp(1, 0.5, move);
  const notes = progress(frame, b(1.9), 0.6, easeOut);
  return (
    <SceneFrame duration={duration}>
      <div style={{ position: 'absolute', top: 320, left: 60, right: 60 }}>
        <Headline lines={beforeAfter.title} size={66} startSec={0.1} />
      </div>
      <Center top={520}>
        <div style={reveal(frame, 0.2, { dy: 50 })}>
          <BeforeAfterSlider
            width={920}
            divider={divider}
            before={
              <SlideSlot id="badSlide">
                <BadSlide />
              </SlideSlot>
            }
            after={
              <SlideSlot id="goodSlide">
                <GoodSlide />
              </SlideSlot>
            }
            beforeLabel={beforeAfter.before}
            afterLabel={beforeAfter.after}
          />
        </div>
      </Center>
      <div style={{ position: 'absolute', top: 1080, left: 80, width: 920, display: 'flex', justifyContent: 'space-between', opacity: notes, transform: `translateY(${(1 - notes) * 20}px)` }}>
        {/* after (right) */}
        <div style={{ ...txt, display: 'flex', flexDirection: 'column', gap: 12, width: 440 }}>
          {beforeAfter.afterNotes.map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 32, color: c.white, fontWeight: 600 }}>
              <Icon name="check" size={30} color={c.gold} stroke={4} />
              {t}
            </div>
          ))}
        </div>
        {/* before (left) */}
        <div style={{ ...txt, display: 'flex', flexDirection: 'column', gap: 12, width: 400, order: -1 }}>
          {beforeAfter.beforeNotes.map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 30, color: c.gray }}>
              <span style={{ width: 22, height: 3, background: '#FF7A7A', borderRadius: 2 }} />
              {t}
            </div>
          ))}
        </div>
      </div>
    </SceneFrame>
  );
};

export const Scene11CTA: React.FC<SceneProps> = ({ duration }) => (
  <SceneFrame duration={duration} outFrames={1}>
    <CTASection duration={duration} />
  </SceneFrame>
);
