import React from 'react';
import { Sequence } from 'remotion';
import { BrandTokens } from './components/BrandTokens';
import { SoundTrack } from './components/SoundTrack';
import { SceneKey, scenes } from './data/timeline';
import { S01Hook } from './scenes/S01Hook';
import { S02Trust } from './scenes/S02Trust';
import { S03Before } from './scenes/S03Before';
import { S04Change } from './scenes/S04Change';
import { S05TrustMost } from './scenes/S05TrustMost';
import { S06Upwork } from './scenes/S06Upwork';
import { S07Proof } from './scenes/S07Proof';
import { S08Cta } from './scenes/S08Cta';
import { S09Final } from './scenes/S09Final';

const map: Record<SceneKey, React.FC<{ duration: number }>> = {
  hook: S01Hook,
  trust: S02Trust,
  before: S03Before,
  change: S04Change,
  trustMost: S05TrustMost,
  upwork: S06Upwork,
  proof: S07Proof,
  cta: S08Cta,
  final: S09Final,
};

export const ElevateTrust: React.FC = () => (
  <BrandTokens>
    {scenes.map((s) => {
      const C = map[s.key];
      return (
        <Sequence key={s.key} from={s.from} durationInFrames={s.duration} name={s.key}>
          <C duration={s.duration} />
        </Sequence>
      );
    })}
    <SoundTrack />
  </BrandTokens>
);
