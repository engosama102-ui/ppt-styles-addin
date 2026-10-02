import React from 'react';
import { getStaticFiles, Html5Audio, interpolate, Sequence, staticFile } from 'remotion';
import { FPS, sceneAt, scenes, TOTAL_FRAMES } from '../data/timeline';

const db = (v: number) => Math.pow(10, v / 20);
const files = new Set(getStaticFiles().map((f) => f.name));
const has = (p: string) => files.has(p);

/** Mix levels (dB). Visual story works fully muted. */
export const mix = { music: -20, musicUnderVoice: -26, sfx: -12, voice: 0 };

type Cue = { file: string; at: number; gain?: number };

const cues = (): Cue[] => {
  const s = (sec: number) => Math.round(sec * FPS);
  const hook = sceneAt('hook').from;
  const out: Cue[] = [
    { file: 'notify', at: hook + s(0.35), gain: 0 },
    { file: 'coin', at: hook + s(0.95), gain: 2 },
  ];
  scenes.forEach((sc, i) => {
    if (i > 0) out.push({ file: 'whoosh', at: sc.from - s(0.12), gain: -6 });
  });
  out.push({ file: 'tick', at: sceneAt('trust').from + s(1.9), gain: -4 });
  out.push({ file: 'tick', at: sceneAt('before').from + s(0.9), gain: -4 });
  out.push({ file: 'click', at: sceneAt('change').from + s(1.3), gain: -3 });
  out.push({ file: 'tick', at: sceneAt('trustMost').from + s(0.6), gain: -4 });
  out.push({ file: 'click', at: sceneAt('upwork').from + s(0.6), gain: -3 });
  out.push({ file: 'coin', at: sceneAt('proof').from + s(1.0), gain: -2 });
  out.push({ file: 'bass', at: sceneAt('final').from, gain: -2 });
  return out.filter((q) => q.at >= 0);
};

export const SoundTrack: React.FC = () => {
  const voice = has('audio/voiceover.mp3');
  const musicVol = (f: number) => {
    const fi = interpolate(f, [0, FPS * 1.2], [0, 1], { extrapolateRight: 'clamp' });
    const fo = interpolate(f, [TOTAL_FRAMES - FPS * 2, TOTAL_FRAMES], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return db(voice ? mix.musicUnderVoice : mix.music) * fi * fo;
  };
  return (
    <>
      {voice && <Html5Audio src={staticFile('audio/voiceover.mp3')} volume={db(mix.voice)} />}
      {has('audio/music.wav') && <Html5Audio src={staticFile('audio/music.wav')} volume={musicVol} />}
      {cues()
        .filter((q) => has(`audio/sfx/${q.file}.wav`))
        .map((q, i) => (
          <Sequence key={i} from={q.at} durationInFrames={FPS * 2} layout="none">
            <Html5Audio src={staticFile(`audio/sfx/${q.file}.wav`)} volume={db(mix.sfx + (q.gain ?? 0))} />
          </Sequence>
        ))}
    </>
  );
};
