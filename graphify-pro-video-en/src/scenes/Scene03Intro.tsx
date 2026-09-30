import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { LogoReveal } from '../components/LogoReveal';
import { brand } from '../config/brand';
import { intro } from '../data/scenes';
import { clamp, progress, reveal } from '../lib/motion';
import { txt } from '../lib/text';
import { Center, SceneFrame, SceneProps } from './common';

const c = brand.colors;

export const Scene03Intro: React.FC<SceneProps> = ({ duration }) => {
  const frame = useCurrentFrame();
  // Bright, clean transition: a light wash that settles into a brighter stage.
  const flash = interpolate(frame, [0, 6, 22], [0, 0.55, 0], clamp);
  const stage = progress(frame, 0, 0.8);
  const leadOut = progress(frame, 1.1, 0.5);
  return (
    <SceneFrame duration={duration} inFrames={4}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 44%, rgba(36,199,217,${0.22 * stage}) 0%, rgba(23,107,255,${0.18 * stage}) 30%, transparent 62%)`,
        }}
      />
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 45%, rgba(255,255,255,${flash}) 0%, rgba(200,235,255,${flash * 0.6}) 40%, transparent 80%)` }} />
      <Center top={470}>
        <div style={{ ...txt, fontSize: 60, fontWeight: 500, color: c.gray, ...reveal(frame, 0.2), opacity: (reveal(frame, 0.2).opacity as number) * (1 - leadOut * 0.35) }}>
          {intro.lead}
        </div>
      </Center>
      <Center top={640}>
        <LogoReveal startSec={1.0} />
      </Center>
    </SceneFrame>
  );
};
