import { FPS } from '../data/timeline';

/**
 * MASTER TIMELINE = the ElevenLabs voice-over (public/audio/voiceover-final.mp3, 38.35 s).
 * The voice is never stretched, cut or moved. Scene cuts below are placed on
 * the spoken words (word times measured from the file, seconds from 0).
 *
 *  0.05  "Two dollars and ninety-nine cents."      → +$2.99 hook
 *  2.26  "It's nice."
 *  3.46  "But that's not why I trust Elevate."     → away from the reward
 *  6.00  "Trust isn't built with a reward."        → TRUST
 *  8.36  "It's built over time."                   → timeline motif
 * 10.27  "As a freelancer working globally, I've tried different ways to manage my earnings."
 * 14.92  "I used Wise."                            → Wise, previous setup
 * 16.13  "Then, early on, I discovered Elevate."   → flow Wise → Elevate
 * 19.30  "Over time, I moved my freelance earnings there,"
 * 22.46  "and I stayed."                           → quiet hold on Elevate
 * 23.61  "Years later,"                            → passage of time
 * 24.51  "it's still the account I trust most for my freelance income,"
 * 27.87  "including Upwork."                       → Upwork → Elevate → USD
 * 29.21  "So yes,"
 * 30.31  "two ninety-nine made me smile."          → REAL screenshot
 * 32.32  "But the trust came first."               → TRUST motif returns
 * 34.65  "If you freelance globally,"              → CTA
 * 36.53  "Elevate is worth checking out."          → Elevate brand
 * 38.35  voice ends → brand card holds on music tail
 */
export const CUTS = {
  hook: 0,
  trust: 5.85,
  global: 10.12,
  wise: 14.75,
  early: 23.4,
  years: 25.3,
  upwork: 27.75,
  proof: 30.15,
  close: 32.2,
  cta: 34.55,
  final: 38.3,
  end: 40.8,
} as const;

export type FKey = Exclude<keyof typeof CUTS, 'end'>;
export const fOrder: FKey[] = ['hook', 'trust', 'global', 'wise', 'early', 'years', 'upwork', 'proof', 'close', 'cta', 'final'];

const fr = (s: number) => Math.round(s * FPS);

export const fScenes = fOrder.map((key, i) => {
  const next = i < fOrder.length - 1 ? CUTS[fOrder[i + 1]] : CUTS.end;
  return { key, from: fr(CUTS[key]), duration: fr(next) - fr(CUTS[key]) };
});

export const F_TOTAL = fr(CUTS.end);
export const fAt = (k: FKey) => fScenes.find((s) => s.key === k)!;

/** Speech segments of the voice-over (from silence detection, -35 dB, 0.18 s). Used to duck music. */
export const SPEECH: [number, number][] = [
  [0.0, 1.92], [2.26, 3.16], [3.5, 5.47], [6.05, 7.95], [8.42, 9.68], [10.3, 11.95], [12.21, 14.43],
  [14.94, 15.78], [16.19, 16.56], [16.79, 17.38], [17.73, 18.83], [19.34, 21.88], [22.43, 23.12],
  [23.65, 24.31], [24.55, 27.51], [27.89, 28.76], [29.22, 30.18], [30.42, 31.95], [32.49, 33.26],
  [33.48, 34.23], [34.71, 36.0], [36.48, 38.15],
];
export const VOICE_END = 38.35;
