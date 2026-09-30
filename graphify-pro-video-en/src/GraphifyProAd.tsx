import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { Captions } from './components/Captions';
import { BrandBackground } from './components/BrandBackground';
import { Wordmark } from './components/Logo';
import { SoundTrack } from './components/SoundTrack';
import { TopNavigation } from './components/TopNavigation';
import { SceneId } from './data/scenes';
import { sceneById, scenes } from './data/timeline';
import { clamp } from './lib/motion';
import { SceneProps } from './scenes/common';
import { Scene01Hook } from './scenes/Scene01Hook';
import { Scene02Cost } from './scenes/Scene02Cost';
import { Scene03Intro } from './scenes/Scene03Intro';
import { Scene04Presentations } from './scenes/Scene04Presentations';
import { Scene05Reports } from './scenes/Scene05Reports';
import { Scene06Data } from './scenes/Scene06Data';
import { Scene07Templates } from './scenes/Scene07Templates';
import { Scene08Formats } from './scenes/Scene08Formats';
import { Scene09Process, Scene10BeforeAfter, Scene11CTA } from './scenes/Scene09to11';

const sceneComponents: Record<SceneId, React.FC<SceneProps>> = {
  hook: Scene01Hook,
  cost: Scene02Cost,
  intro: Scene03Intro,
  presentations: Scene04Presentations,
  reports: Scene05Reports,
  data: Scene06Data,
  templates: Scene07Templates,
  formats: Scene08Formats,
  process: Scene09Process,
  beforeAfter: Scene10BeforeAfter,
  cta: Scene11CTA,
};

/** Small wordmark near the top. Hidden while the large logo is on screen. */
const TopWordmark: React.FC = () => {
  const frame = useCurrentFrame();
  const intro = sceneById('intro');
  const cta = sceneById('cta');
  const introEnd = intro.from + intro.duration;
  const o = Math.min(
    interpolate(frame, [0, 12], [0, 1], clamp),
    interpolate(frame, [intro.from - 8, intro.from, introEnd, introEnd + 12], [1, 0, 0, 1], clamp),
    interpolate(frame, [cta.from - 8, cta.from], [1, 0], clamp),
  );
  if (o <= 0) return null;
  return (
    <div style={{ position: 'absolute', top: 118, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: o }}>
      <Wordmark height={50} />
    </div>
  );
};

export const GraphifyProAd: React.FC = () => {
  const nav = ['presentations', 'reports', 'data', 'templates', 'formats'].map((id) => sceneById(id as SceneId));
  const last = nav[nav.length - 1];
  return (
    <AbsoluteFill style={{ backgroundColor: '#071526' }}>
      <BrandBackground />
      {scenes.map((s) => {
        const Comp = sceneComponents[s.id];
        return (
          <Sequence key={s.id} from={s.from} durationInFrames={s.duration} name={s.id}>
            <Comp duration={s.duration} />
          </Sequence>
        );
      })}
      <TopWordmark />
      <TopNavigation keys={nav.map((n) => n.from)} showFrom={nav[0].from} hideAt={last.from + last.duration} />
      <Captions />
      <SoundTrack />
    </AbsoluteFill>
  );
};
