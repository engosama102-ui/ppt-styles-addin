import timings from './voiceover-timings.json';
import { sceneIds, SceneId } from './scenes';
import { captionPhrases, CaptionPhrase } from './captions';

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

type Word = { text: string; start: number; end: number };
type Paragraph = { start: number; end: number; words: Word[] };

const t = timings as {
  generated: boolean;
  totalSec: number;
  sceneStartsSec: number[];
  paragraphs: Paragraph[];
};

export const hasVoiceover = t.generated;

const f = (sec: number) => Math.round(sec * FPS);

export const TOTAL_FRAMES = f(t.totalSec);

export type SceneTiming = { id: SceneId; index: number; from: number; duration: number };

export const scenes: SceneTiming[] = sceneIds.map((id, index) => {
  const from = f(t.sceneStartsSec[index]);
  const to = index < sceneIds.length - 1 ? f(t.sceneStartsSec[index + 1]) : TOTAL_FRAMES;
  return { id, index, from, duration: to - from };
});

export const sceneById = (id: SceneId) => scenes.find((s) => s.id === id)!;

export const paragraphs = t.paragraphs.map((p) => ({ from: f(p.start), to: f(p.end) }));

export type TimedCaption = CaptionPhrase & { from: number; to: number };

const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/**
 * Caption timing. When the TTS script produced word boundaries and the word
 * count matches the phrases, each phrase starts on its first spoken word.
 * Otherwise phrases are spread across the paragraph by character length.
 */
export const captions: TimedCaption[] = captionPhrases.flatMap((phrases, i) => {
  const p = t.paragraphs[i];
  if (!p) return [];
  const counts = phrases.map((ph) => countWords(ph.text));
  const total = counts.reduce((a, b) => a + b, 0);
  const out: TimedCaption[] = [];
  if (p.words && p.words.length === total) {
    let w = 0;
    phrases.forEach((ph, k) => {
      const first = p.words[w];
      const last = p.words[w + counts[k] - 1];
      w += counts[k];
      out.push({ ...ph, from: f(first.start), to: f(last.end + 0.25) });
    });
  } else {
    const lens = phrases.map((ph) => ph.text.length + 6);
    const sum = lens.reduce((a, b) => a + b, 0);
    let cursor = p.start;
    phrases.forEach((ph, k) => {
      const d = ((p.end - p.start) * lens[k]) / sum;
      out.push({ ...ph, from: f(cursor), to: f(cursor + d) });
      cursor += d;
    });
  }
  // Each phrase stays until the next one begins (within the paragraph).
  for (let k = 0; k < out.length - 1; k++) out[k].to = Math.max(out[k].to, out[k + 1].from);
  out[out.length - 1].to += f(0.35);
  return out;
});
