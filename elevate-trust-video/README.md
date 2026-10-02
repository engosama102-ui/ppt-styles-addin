# Elevate Pay: "Trust isn't built with $2.99" (V2)

**V2 is the current version.** Final video: `out/elevate-trust-v2.mp4`. Review sheet: `contact-sheet.jpg`. Rebuild everything with `npm run build:v2`.

## What V2 changes

- **Real proof:** the real screenshot is used, through a privacy-safe derivative (see below). The animated +$2.99 payment chip travels Upwork → Elevate Pay → My USD account, then morphs into the real screenshot. The camera then zooms to "Upwork Reward" and then to "+$2.99".
- **Long-term trust is the hero:** a quiet "I've trusted Elevate since the early days." moment with an EARLY DAYS → TODAY timeline. The Elevate bar runs the full length, and payment marks light up along it, followed by "And stayed."
- **Wise → Elevate is a main moment:** money streams leave the Wise card and the camera follows them to the Elevate card. Wise is shown as a neutral "Previous setup", never criticized.
- **Brand language** comes from the supplied capture of elevatepay.co/upwork-giveaway and the app screenshot:
  - the near-black → indigo → royal hero gradient
  - the top glow from the CTA card
  - the violet-blue `#4E51FC` pill
  - indigo `#0E0F32` cards and pills (the same on the web and in the app)
  - wide, heavy uppercase headlines (Archivo at expanded width)
- **Upwork branding** uses the Upwork mark exactly as it appears in the Elevate app, cropped from the real screenshot.
- **Rhythm:** impact → quiet → flow → flow (camera) → quiet hero → flow → flow → proof → emotional close → brand frame. Text is larger for mobile, with one focal point per frame.
- **Length:** 37.6 s. The final frame is fully on screen by 1.1 s and holds for about 2.7 s.

## Privacy: how the screenshot is protected

- **Only a derivative is in the project.** The original screenshot is NOT stored in this repository. The project uses `public/assets/elevate-reward-sanitized.png`, made from it like this:
  1. Only the transaction list area is kept. The balance, the status card and the buttons above it are cut away entirely.
  2. Everything except the Upwork Reward row (Upwork Reward, Sep 2026, +$2.99, Reward received 🎉) is blurred twice (Gaussian 26 px + 14 px) and darkened 55%. The other rows, your name and the other amounts cannot be read or recovered from the file.
- **The derivative is used as-is.** The video only scales, crops and zooms it. Nothing is redrawn or invented.
- **To use a different screenshot,** repeat the same steps: keep the sharp band only around the reward row, and blur and darken the rest before you add it to `public/assets`.

## Still needed: the official Elevate Pay logo

elevatepay.co and public logo services were blocked from the build environment, and the page capture is too small (466 px wide) to cut a usable logo from. Until you add the logo, the name is set in type ("**Elevate**Pay"). This is not a recreation of the logo mark.

To finish, save the official logo (light version, SVG or PNG) as `public/assets/elevate-logo.svg`. If it is a PNG, update the path in `src/data/assets.ts`. Then run `npm run build:v2`. Every Elevate placement picks it up automatically, including the cards, the Upwork flow, the timeline bar and the final lockup.

## V2 files

| What | Where |
|---|---|
| V2 copy | `src/v2/copy.ts` |
| V2 scene lengths | `src/v2/timeline.ts` |
| V2 scenes | `src/v2/scenes/V01Hook.tsx` … `V10Final.tsx` |
| Brand helpers (wordmark, Upwork mark, cards, pills, background) | `src/v2/brand.tsx` |
| Colors | `src/styles/tokens.ts` |
| Screenshot zoom keyframes and focus box | `src/v2/scenes/V08Proof.tsx` (`keys`) |
| Chip → screenshot hand-off geometry | `src/v2/handoff.ts` |
| Music for V2 length | `npm run sound:v2` (writes `public/audio/music-v2.wav`) |
| Optional V2 voice-over | save as `public/audio/voiceover-v2.mp3`; the music then drops to -26 dB under it |

---

# V1 (kept for reference)

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
