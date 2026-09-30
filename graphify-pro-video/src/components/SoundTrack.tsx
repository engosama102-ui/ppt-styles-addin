import React from 'react';
import { Html5Audio, Sequence, interpolate, staticFile } from 'remotion';
import { audioMix } from '../config/brand';
import { FPS, TOTAL_FRAMES, hasVoiceover, paragraphs, sceneById, scenes } from '../data/timeline';

const db = (v: number) => Math.pow(10, v / 20);

type Sfx = { file: string; at: number; gainDb?: number };

/** All sound-effect cues, derived from scene timing so they follow the narration. */
const cues = (): Sfx[] => {
  const s = (sec: number) => Math.round(sec * FPS);
  const out: Sfx[] = [];
  scenes.forEach((sc) => {
    if (sc.index > 0 && sc.id !== 'intro' && sc.id !== 'cta') out.push({ file: 'whoosh', at: sc.from - s(0.15) });
  });
  ['presentations', 'reports', 'data', 'templates', 'localization'].forEach((id) => {
    out.push({ file: 'click', at: sceneById(id as never).from + s(0.1), gainDb: -2 });
  });
  const pres = sceneById('presentations');
  const k = pres.duration / FPS / 11;
  for (let i = 0; i < 5; i++) out.push({ file: 'pop', at: pres.from + s(1 + (2.6 - 1) * k + i * 0.4), gainDb: -6 });
  const tpl = sceneById('templates');
  const k2 = tpl.duration / FPS / 10;
  for (let i = 0; i < 4; i++) out.push({ file: 'pop', at: tpl.from + s(1 + (2.3 - 1) * k2 + i * 0.4), gainDb: -6 });
  const hook = sceneById('hook');
  [1.4, 2.3, 3.2, 4.1].forEach((t) => out.push({ file: 'pop', at: hook.from + s(t), gainDb: -5 }));
  const intro = sceneById('intro');
  out.push({ file: 'riser', at: intro.from + s(1.0) - s(1.6), gainDb: -3 });
  out.push({ file: 'whoosh', at: intro.from, gainDb: -3 });
  const cta = sceneById('cta');
  out.push({ file: 'impact', at: cta.from + s(0.95), gainDb: -2 });
  out.push({ file: 'whoosh', at: cta.from - s(0.15), gainDb: -3 });
  return out.filter((q) => q.at >= 0);
};

export const SoundTrack: React.FC = () => {
  const base = hasVoiceover ? audioMix.musicDb : audioMix.musicNoVoiceDb;
  const musicVolume = (f: number) => {
    const fadeIn = interpolate(f, [0, audioMix.musicFadeInSec * FPS], [0, 1], { extrapolateRight: 'clamp' });
    const fadeOut = interpolate(f, [TOTAL_FRAMES - audioMix.musicFadeOutSec * FPS, TOTAL_FRAMES], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    let duck = 0;
    if (hasVoiceover) {
      for (const p of paragraphs) {
        duck = Math.max(duck, interpolate(f, [p.from - 8, p.from, p.to, p.to + 10], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
      }
    }
    return db(base + audioMix.musicDuckDb * duck) * fadeIn * fadeOut;
  };
  return (
    <>
      {hasVoiceover && <Html5Audio src={staticFile('audio/voiceover.mp3')} volume={db(audioMix.voiceDb)} />}
      <Html5Audio src={staticFile('audio/music.wav')} volume={musicVolume} />
      {cues().map((q, i) => (
        <Sequence key={i} from={q.at} durationInFrames={FPS * 3} layout="none">
          <Html5Audio src={staticFile(`audio/sfx/${q.file}.wav`)} volume={db(audioMix.sfxDb + (q.gainDb ?? 0))} />
        </Sequence>
      ))}
    </>
  );
};
