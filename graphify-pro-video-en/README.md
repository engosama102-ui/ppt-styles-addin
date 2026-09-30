# Graphify Pro: Vertical Promotional Video (English)

A 90-second, 1080 × 1920 (9:16) English promotional video for **Graphify Pro**, built with Remotion, React and TypeScript. The output is H.264/AAC MP4 for LinkedIn, Instagram Reels and TikTok.

Final render: `out/graphify-pro-ad-en.mp4`

The Arabic version lives in `../graphify-pro-video/`. The two projects are independent.

## Quick start

```bash
npm install
npm start                 # opens Remotion Studio for a live preview
npm run render            # renders out/graphify-pro-ad-en.mp4
npm run build:final       # render + FFmpeg finishing pass (yuv420p BT.709, faststart)
```

Requirements: Node 18+, Python 3.9+ with `numpy`, and `ffmpeg`/`ffprobe` on PATH for the voice-over step.

If Remotion cannot download its headless browser (for example behind a proxy), point it at an existing Chrome headless shell:

```bash
REMOTION_BROWSER_EXECUTABLE=/path/to/chrome-headless-shell npm run render
```

## Voice-over (edge-tts)

```bash
pip install edge-tts numpy
npm run render:audio      # python scripts/generate_voiceover.py
npm run build:final       # re-render with narration
```

The script does the following:

1. Reads the 11 paragraphs in `voiceover-script.txt`.
2. Generates each paragraph with `en-US-AndrewNeural` (warm, confident, male) at rate `-3%` and pitch `-1Hz`. You can override these, for example with `--voice en-US-GuyNeural --rate -2% --pitch 0Hz`, or with `en-US-AvaNeural` for a female voice.
3. Measures each clip with `ffprobe`.
4. Places each paragraph at its planned scene time. If the previous paragraph is still playing, it moves the next one later. It never speeds up the narration.
5. Writes `public/audio/voiceover.mp3` and `src/data/voiceover-timings.json`. Scene lengths, the total duration, caption timing (word by word) and sound-effect cues all follow this file automatically.
6. Regenerates the music so its length matches the new timeline.

Until you run the script, the video renders with music, sound effects and captions only.

If you are behind a corporate proxy, set `SSL_CERT_FILE` to your CA bundle before running the script. edge-tts needs an outbound WebSocket connection to `speech.platform.bing.com`.

## Music and sound effects

```bash
npm run render:sfx        # python scripts/generate_sound.py
```

The script synthesizes all music and sound effects with NumPy, so the audio is original and royalty-free. To use licensed music instead, replace `public/audio/music.wav` with a file of the same name. You set the mix levels in `audioMix` in `src/config/brand.ts`.

## What to edit, and where

| To change | Edit |
|---|---|
| Brand name, colors, fonts, contact lines, CTA text, navigation labels, mix levels | `src/config/brand.ts` |
| Use real slide or report images instead of the built-in samples | Set `slideImages` in `src/config/brand.ts` and place the files in `public/slides/` |
| Voice-over text | `voiceover-script.txt`, and keep `src/data/voiceover.ts` in sync |
| Caption phrases and gold highlight words | `src/data/captions.ts` |
| On-screen headlines, labels, comments, process steps | `src/data/scenes.ts` |
| Demo slide content (all fictional) | `src/data/presentations.ts` |
| Scene timing without narration | `src/data/voiceover-timings.json` |

The closing screen shows WhatsApp and Behance, taken from `brand.contact`.

Each caption phrase list must add up word for word to its paragraph. This lets the captions lock to the spoken word timing.

## Scene map (default timing)

| # | Time | Scene |
|---|---|---|
| 1 | 0–7 s | Hook: a weak slide with comment bubbles |
| 2 | 7–15 s | The cost of weak design |
| 3 | 15–22 s | Brand reveal |
| 4 | 22–33 s | Decks, with a Section Zoom through a sample investor deck |
| 5 | 33–43 s | Reports: slide morphs into a page, then a carousel of report pages |
| 6 | 43–53 s | Data: a dense table becomes KPIs, charts and a timeline |
| 7 | 53–63 s | Templates: a 9-layout grid whose content swaps inside the same system |
| 8 | 63–71 s | Formats: one story as a 16:9 deck, a 1:1 post and a 9:16 story |
| 9 | 71–80 s | Process: five steps |
| 10 | 80–85 s | Before and after split |
| 11 | 85–90 s | Call to action |

## Project structure

```
src/
  index.ts, Root.tsx          Composition registration (GraphifyProAd)
  GraphifyProAd.tsx           Timeline: background, scenes, nav, captions, audio
  config/brand.ts             Central configuration
  data/                       Scenes, services, captions, voice-over, timing, slide content
  components/                 BrandBackground, TopNavigation, Headline, PresentationMockup,
                              ChartAnimation, ServiceCard, AnnotationBubble, ProgressSteps,
                              BeforeAfterSlider, Captions, LogoReveal, CTASection, SoundTrack, Icons, Logo
  slides/                     16:9 sample slides, report pages and format variants (React + SVG)
  scenes/                     The 11 scenes
  lib/                        Fonts, motion helpers, text styles
scripts/
  generate_voiceover.py       edge-tts narration and timing
  generate_sound.py           Music and sound effects
  finalize.py                 FFmpeg finishing pass
  qa-stills.mjs               Renders review stills: node scripts/qa-stills.mjs 150 900 2400
public/
  fonts/                      Montserrat (SIL Open Font License)
  audio/                      voiceover.mp3 (silent placeholder until generated), music.wav, sfx/
```

## Quality checklist

Before publishing, render review stills with `scripts/qa-stills.mjs` and check the following:

- No text overlaps, and captions stay within two lines.
- Captions stay above the bottom 390 px, clear of platform UI.
- The narration matches each scene.
- The music sits under the voice.
- The contact details on the closing screen are correct.
- The duration is close to 90 s.
