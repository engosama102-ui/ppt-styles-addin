import React from 'react';
import { AbsoluteFill, Html5Audio, interpolate, Sequence, staticFile, getStaticFiles, useCurrentFrame } from 'remotion';
import { FPS } from '../data/timeline';
import { FONT, C } from '../styles/tokens';
import { V2Background } from './brand';
import { V2Key, v2At, v2Scenes, V2_TOTAL } from './timeline';
import { V01Hook } from './scenes/V01Hook';
import { V02Trust } from './scenes/V02Trust';
import { V03Global } from './scenes/V03Global';
import { V04Wise } from './scenes/V04Wise';
import { V05Early } from './scenes/V05Early';
import { V06Years } from './scenes/V06Years';
import { V07Upwork } from './scenes/V07Upwork';
import { V08Proof } from './scenes/V08Proof';
import { V09Close } from './scenes/V09Close';
import { V10Final } from './scenes/V10Final';

const map: Record<V2Key, React.FC<{ duration: number }>> = {
  hook: V01Hook,
  trust: V02Trust,
  global: V03Global,
  wise: V04Wise,
  early: V05Early,
  years: V06Years,
  upwork: V07Upwork,
  proof: V08Proof,
  close: V09Close,
  final: V10Final,
};

const files = new Set(getStaticFiles().map((f) => f.name));
const db = (v: number) => Math.pow(10, v / 20);

const Sound: React.FC = () => {
  const s = (sec: number) => Math.round(sec * FPS);
  const voice = files.has('audio/voiceover-v2.mp3');
  const cues: [string, number, number][] = [
    ['notify', v2At('hook').from + s(0.25), 0],
    ['coin', v2At('hook').from + s(0.75), 2],
    ['tick', v2At('trust').from + s(1.5), -4],
    ['tick', v2At('global').from + s(0.9), -4],
    ['whoosh', v2At('wise').from + s(1.45), -2],
    ['click', v2At('wise').from + s(2.9), -2],
    ['tick', v2At('early').from + s(0.7), -4],
    ['click', v2At('years').from + s(0.8), -4],
    ['tick', v2At('upwork').from + s(0.9), -3],
    ['click', v2At('upwork').from + s(2.1), -3],
    ['whoosh', v2At('proof').from, -6],
    ['coin', v2At('proof').from + s(2.55), 0],
    ['bass', v2At('final').from, -2],
  ];
  v2Scenes.forEach((sc, i) => {
    if (i > 0 && !['wise', 'proof'].includes(sc.key)) cues.push(['whoosh', sc.from - s(0.12), -9]);
  });
  const music = (f: number) =>
    db(voice ? -26 : -19) *
    interpolate(f, [0, FPS * 1.2], [0, 1], { extrapolateRight: 'clamp' }) *
    interpolate(f, [V2_TOTAL - FPS * 2.2, V2_TOTAL], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <>
      {voice && <Html5Audio src={staticFile('audio/voiceover-v2.mp3')} />}
      {files.has('audio/music-v2.wav') && <Html5Audio src={staticFile('audio/music-v2.wav')} volume={music} />}
      {cues
        .filter(([n, at]) => at >= 0 && files.has(`audio/sfx/${n}.wav`))
        .map(([n, at, g], i) => (
          <Sequence key={i} from={at} durationInFrames={FPS * 2} layout="none">
            <Html5Audio src={staticFile(`audio/sfx/${n}.wav`)} volume={db(-12 + g)} />
          </Sequence>
        ))}
    </>
  );
};

/** Background reacts to rhythm: brighter glow on quiet/emotional scenes. */
const Bg: React.FC = () => {
  const f = useCurrentFrame();
  const glowAt = (k: V2Key) => (['trust', 'early', 'close', 'final'].includes(k) ? 1.25 : 0.8);
  const cur = v2Scenes.find((s) => f >= s.from && f < s.from + s.duration) ?? v2Scenes[v2Scenes.length - 1];
  const wise = v2At('wise');
  const parallax = interpolate(f, [wise.from + 44, wise.from + 90], [0, 1100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <V2Background glow={glowAt(cur.key)} parallax={parallax} />;
};

export const ElevateTrustV2: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: FONT, color: C.elevateText }}>
    <Bg />
    {v2Scenes.map((s) => {
      const Comp = map[s.key];
      return (
        <Sequence key={s.key} from={s.from} durationInFrames={s.duration} name={s.key}>
          <Comp duration={s.duration} />
        </Sequence>
      );
    })}
    <Sound />
  </AbsoluteFill>
);
