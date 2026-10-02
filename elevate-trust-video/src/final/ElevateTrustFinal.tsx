import React from 'react';
import { AbsoluteFill, getStaticFiles, Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { FPS } from '../data/timeline';
import { C, FONT } from '../styles/tokens';
import { V2Background } from './brand';
import { F01Hook } from './scenes/F01Hook';
import { F02Trust } from './scenes/F02Trust';
import { F03Global } from './scenes/F03Global';
import { F04Wise } from './scenes/F04Wise';
import { F05Early } from './scenes/F05Early';
import { F06Years } from './scenes/F06Years';
import { F07Upwork } from './scenes/F07Upwork';
import { F08Proof } from './scenes/F08Proof';
import { F09Close } from './scenes/F09Close';
import { F10Cta } from './scenes/F10Cta';
import { F11Final } from './scenes/F11Final';
import { CUTS, F_TOTAL, fAt, FKey, fScenes, SPEECH, VOICE_END } from './timeline';

const map: Record<FKey, React.FC<{ duration: number }>> = {
  hook: F01Hook,
  trust: F02Trust,
  global: F03Global,
  wise: F04Wise,
  early: F05Early,
  years: F06Years,
  upwork: F07Upwork,
  proof: F08Proof,
  close: F09Close,
  cta: F10Cta,
  final: F11Final,
};

const files = new Set(getStaticFiles().map((f) => f.name));
const db = (v: number) => Math.pow(10, v / 20);

/** Mix (dB). The voice is untouched at 0 dB and always dominant. */
export const MIX = { voice: 0, musicUnderVoice: -29, musicInPause: -23, musicTail: -17, sfx: -16 };

/** 1 while the voice speaks (0.12 s attack, 0.35 s release), 0 in pauses. */
const speaking = (sec: number) => {
  let v = 0;
  for (const [a, b] of SPEECH) {
    v = Math.max(v, interpolate(sec, [a - 0.12, a, b, b + 0.35], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  }
  return v;
};

const musicVolume = (f: number) => {
  const sec = f / FPS;
  const s = speaking(sec);
  const base = sec < VOICE_END ? MIX.musicInPause + (MIX.musicUnderVoice - MIX.musicInPause) * s : MIX.musicTail;
  // smooth rise into the tail after the last word
  const tailBlend = interpolate(sec, [VOICE_END - 0.1, VOICE_END + 0.6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dB = sec < VOICE_END ? base : MIX.musicInPause + (MIX.musicTail - MIX.musicInPause) * tailBlend;
  const fadeIn = interpolate(f, [0, FPS * 0.8], [0.4, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(f, [F_TOTAL - FPS * 1.3, F_TOTAL], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return db(dB) * fadeIn * fadeOut;
};

const Sound: React.FC = () => {
  const s = (sec: number) => Math.round(sec * FPS);
  // sound design placed on visual events; kept low under the voice
  const cues: [string, number, number][] = [
    ['notify', s(0.05), -2],
    ['coin', s(1.4), 0], // count lands on "ninety-nine"
    ['tick', s(CUTS.trust + 2.5), -6],
    ['tick', s(CUTS.global + 1.2), -6],
    ['whoosh', s(CUTS.wise + 1.6), -4], // camera follows the flow
    ['click', s(CUTS.wise + 3.85), -4], // lands on Elevate
    ['tick', s(CUTS.early + 0.2), -6],
    ['click', s(CUTS.years + 0.5), -6],
    ['tick', s(CUTS.upwork + 0.55), -5],
    ['click', s(CUTS.upwork + 1.6), -5],
    ['whoosh', s(CUTS.proof), -8],
    ['coin', s(CUTS.proof + 1.35), -1], // focus on +$2.99
    ['whoosh', s(CUTS.cta + 1.85), -8],
    ['bass', s(CUTS.final), 0],
  ];
  return (
    <>
      <Html5Audio src={staticFile('audio/voiceover-final.mp3')} volume={db(MIX.voice)} />
      {files.has('audio/music-final.wav') && <Html5Audio src={staticFile('audio/music-final.wav')} volume={musicVolume} />}
      {cues
        .filter(([n]) => files.has(`audio/sfx/${n}.wav`))
        .map(([n, at, g], i) => (
          <Sequence key={i} from={at} durationInFrames={FPS * 2} layout="none">
            <Html5Audio src={staticFile(`audio/sfx/${n}.wav`)} volume={db(MIX.sfx + g)} />
          </Sequence>
        ))}
    </>
  );
};

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  const cur = fScenes.find((x) => f >= x.from && f < x.from + x.duration) ?? fScenes[fScenes.length - 1];
  const glow = ['trust', 'early', 'close', 'cta', 'final'].includes(cur.key) ? 1.25 : 0.8;
  const wise = fAt('wise');
  const parallax = interpolate(f, [wise.from + 48, wise.from + 117], [0, 1100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <V2Background glow={glow} parallax={parallax} />;
};

export const ElevateTrustFinal: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: FONT, color: C.elevateText }}>
    <Bg />
    {fScenes.map((sc) => {
      const Comp = map[sc.key];
      return (
        <Sequence key={sc.key} from={sc.from} durationInFrames={sc.duration} name={sc.key}>
          <Comp duration={sc.duration} />
        </Sequence>
      );
    })}
    <Sound />
  </AbsoluteFill>
);
