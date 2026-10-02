# Elevate Pay: "Trust isn't built with $2.99"

A 32-second, 1080 × 1350 (4:5) LinkedIn motion graphic about my personal experience using Elevate Pay as a long-term freelancer. Built with Remotion, React and TypeScript. The story is fully readable with the sound off.

Final video: `out/elevate-trust.mp4` (H.264, AAC, 30 fps)
Stills: `stills/01-hook.png`, `stills/02-trust.png`, `stills/03-final-cta.png`
Caption: `linkedin-caption.txt`

## Before you publish: three files to add

The build environment could not reach elevatepay.co (blocked by the network policy), and the screenshot was not attached. Until you add the files below, the film uses clearly labeled stand-ins. It never uses recreated logos or fake app UI.

| File | What it is | What the film shows without it |
|---|---|---|
| `public/assets/elevate-screenshot.png` | Your real Elevate Pay screenshot | A dashed box reading "Add your screenshot…" |
| `public/assets/elevate-logo.svg` | Official Elevate Pay logo, light version for dark backgrounds (`.svg` or `.png`) | The words "Elevate Pay" in plain text |
| `public/assets/upwork-logo.svg` | Official Upwork logo, white or green version | The word "Upwork" in plain text, in Upwork green |

If your logo files are PNG, change the paths in `src/data/assets.ts`. Then re-render.

## Rerender

```bash
npm install
npm start                 # Remotion Studio: live preview and scrubbing
npm run build:final       # render + FFmpeg finishing pass + the three stills
```

If Remotion cannot download its browser, point it at a local Chrome headless shell:

```bash
REMOTION_BROWSER_EXECUTABLE=/path/to/chrome-headless-shell npm run build:final
```

Requirements: Node 18+, and Python 3 with NumPy for the audio scripts.

## Replace the screenshot (privacy)

1. Save your screenshot as `public/assets/elevate-screenshot.png`.
2. Open `src/data/screenshot.ts` and set the following, in pixels of the original image:
   - `width` and `height`: the size of the image file.
   - `crop`: a box around ONLY the Upwork Reward row (Upwork Reward, Sep 2026, +$2.99, Reward received 🎉). Nothing outside this box is ever rendered, so the balance, your name and other transactions stay off screen.
   - `focus`: a box around `+$2.99` for the green highlight.
   - `masks`: optional extra boxes inside the crop to blur anything private.
3. Preview the proof scene in `npm start` (around 0:22 to 0:26) and confirm that no private detail is visible.

## Where things live

| To change | Edit |
|---|---|
| All on-screen text | `src/data/copy.ts` |
| Brand colors and fonts (`--elevate-primary`, `--elevate-secondary`, `--elevate-background`, `--elevate-surface`, `--elevate-text`, `--elevate-muted`, `--upwork-green`) | `src/styles/tokens.ts` |
| Scene durations and total length | `src/data/timeline.ts` (`sceneSeconds`, in seconds) |
| Screenshot crop, focus and masks | `src/data/screenshot.ts` |
| Logo and screenshot file paths | `src/data/assets.ts` |
| Sound-effect timing and mix levels | `src/components/SoundTrack.tsx` |
| Voice-over text and timing | `voiceover-script.txt` |

## Brand colors

The Elevate values in `src/styles/tokens.ts` are placeholders (`verified.elevate: false`). They were not extracted from the live site because it was unreachable. To make the film match Elevate's identity:

1. Open https://www.elevatepay.co/ in Chrome and open DevTools.
2. Inspect the primary buttons, page background, cards and body text. Copy the computed `color`, `background-color` and any gradient values.
3. Paste them into `tokens.color` and set `verified.elevate` to `true`.
4. If Elevate uses a specific typeface, add its `.woff2` files to `public/fonts`, update `tokens.font.family`, and load it in `src/lib/fonts.ts`.

Upwork green is `#14A800`, Upwork's published brand green. It appears only where Upwork is in context.

## Change duration

Edit `sceneSeconds` in `src/data/timeline.ts`. The total is the sum, currently 32.0 s. Keep `final` at 3 s or more so the last frame stays readable for at least 2 s. If you lengthen the film, regenerate the music to match: `python scripts/generate_sound.py 34`.

## Audio

- **Music and sound effects:** `npm run sound`. Everything is synthesized with NumPy, so it is original and royalty-free. It includes a soft notification, a satisfying ping on +$2.99, restrained whooshes, flow ticks, UI clicks and a bass swell on the final frame.
- **Optional voice-over:** `pip install edge-tts`, then `npm run voiceover`. This uses a calm, warm male voice (`en-US-AndrewNeural`, rate -6%, pitch -2Hz). It writes `public/audio/voiceover.mp3`, and the next render picks it up automatically and lowers the music under the voice. The script warns you if the narration runs longer than the film.

## Publishing on LinkedIn

- Upload `out/elevate-trust.mp4` directly as a native video.
- Paste `linkedin-caption.txt` as the post text.
- **The @Elevate Pay mention will not work as pasted text.** When you type `@Elevate Pay` in the LinkedIn composer, pick the official Elevate Pay company page from the dropdown so the mention becomes a real tag.
- Keep `#ElevatePayforUpwork`. It is the official giveaway hashtag.
- Before posting, check the giveaway rules on https://www.elevatepay.co/upwork-giveaway.

## Content principles

- **Personal claims only:** "the account I trust most", "my experience", "for me". The film makes no claims about safety, guarantees, or being better than other providers.
- **Wise is shown with respect:** it is a neutral "Before" stop on the money line, never criticized.
- **The final frame** carries a small "Personal experience. Not financial advice." line.

## Project structure

```
src/
  ElevateTrust.tsx            Timeline of the nine scenes + soundtrack
  components/                 BrandTokens, MoneyFlow, FlowNode, TransactionCard, KineticHeadline,
                              ScreenshotReveal, LogoLockup, SceneTransition, SoundTrack
  scenes/                     S01Hook … S09Final
  data/                       copy, timeline, screenshot framing, asset paths
  styles/tokens.ts            Design tokens
  lib/                        Fonts, motion helpers
public/
  assets/                     Screenshot and official logos (you add these)
  fonts/                      Inter (SIL Open Font License)
  audio/                      music.wav, sfx/, optional voiceover.mp3
scripts/                      generate_sound.py, generate_voiceover.py, finalize.py, stills.mjs
```
