# Basira Visual: Vertical Promotional Video

A 90-second, 1080 × 1920 (9:16) Arabic promotional video for **Basira Visual**, built with Remotion, React and TypeScript. The output is H.264/AAC MP4 for LinkedIn, Instagram Reels and TikTok.

Final render: `out/basira-corporate-ad.mp4`

## Quick start

```bash
npm install
npm start                 # opens Remotion Studio for a live preview
npm run render            # renders out/basira-corporate-ad.mp4
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
npm run render            # re-render with narration
```

The script does the following:

1. Reads the 11 paragraphs in `voiceover-script.txt`.
2. Generates each paragraph with `ar-EG-ShakirNeural` at rate `-3%` and pitch `-1Hz`. You can override these with `--voice ar-EG-SalmaNeural --rate -2% --pitch 0Hz`.
3. Measures each clip with `ffprobe`.
4. Places each paragraph at its planned scene time. If the previous paragraph is still playing, it moves the next one later. It never speeds up the narration.
5. Writes `public/audio/voiceover.mp3` and `src/data/voiceover-timings.json`. Scene lengths, the total duration, caption timing (word by word) and sound-effect cues all follow this file automatically.
6. Regenerates the music so its length matches the new timeline.

Until you run the script, `voiceover-timings.json` holds the timing from the creative brief (`"generated": false`). In that state the video renders with music, sound effects and captions only, and the music plays a little louder.

If you are behind a corporate proxy, set `SSL_CERT_FILE` to your CA bundle before running the script. edge-tts needs an outbound WebSocket connection to `speech.platform.bing.com`.

## Music and sound effects

```bash
npm run render:sfx        # python scripts/generate_sound.py
```

The script synthesizes all music and sound effects from scratch with NumPy, so the audio is original and royalty-free. It produces:

- **Music:** a minimal corporate electronic bed with a soft pulse, light percussion and no vocals.
- **Sound effects:** whoosh, click, pop, riser and impact.

To use licensed music instead, replace `public/audio/music.wav` with a file of the same name.

You set the mix levels in `audioMix` in `src/config/brand.ts`:

| Setting | Value | Meaning |
|---|---|---|
| `musicDb` | -22 dB | Music level under narration |
| `musicDuckDb` | -3 dB | Extra dip while a paragraph is spoken |
| `musicNoVoiceDb` | -15 dB | Music level when no voice-over exists |
| `sfxDb` | -14 dB | Sound-effect level |
| Fades | 1.5 s in, 3 s out | Music fade-in and fade-out |

## What to edit, and where

| To change | Edit |
|---|---|
| Brand name, colors, font, contact details, CTA text, navigation labels, mix levels | `src/config/brand.ts` |
| Use real slide or report images instead of the built-in samples | Set `slideImages` in `src/config/brand.ts` and place the files in `public/slides/` |
| Voice-over text | `voiceover-script.txt`, and keep `src/data/voiceover.ts` in sync |
| Caption phrases and gold highlight words | `src/data/captions.ts` |
| On-screen headlines, labels, comments, process steps | `src/data/scenes.ts` |
| Service list | `src/data/services.ts` |
| Demo slide content (all fictional) | `src/data/presentations.ts` |
| Scene timing without narration | `src/data/voiceover-timings.json` |

The contact values are placeholders on purpose: `[WEBSITE]`, `[EMAIL]` and `[LINKEDIN OR BEHANCE]`. Replace them before you publish.

Each caption phrase list must add up word for word to its paragraph. This lets the captions lock to the spoken word timing.

## Project structure

```
src/
  index.ts, Root.tsx          Composition registration (BasiraCorporateAd)
  BasiraCorporateAd.tsx       Timeline: background, scenes, nav, captions, audio
  config/brand.ts             Central configuration
  data/                       Scenes, services, captions, voice-over, timing, slide content
  components/                 BrandBackground, TopNavigation, ArabicHeadline, PresentationMockup,
                              ReportMockup, ChartAnimation, ServiceCard, AnnotationBubble,
                              ProgressSteps, BeforeAfterSlider, ArabicCaptions, LogoReveal,
                              CTASection, SoundTrack, Icons, Logo
  slides/                     16:9 sample slides and portrait report pages (React + SVG)
  scenes/                     The 11 scenes
  lib/                        Fonts, motion helpers, RTL text styles
scripts/
  generate_voiceover.py       edge-tts narration and timing
  generate_sound.py           Music and sound effects
  qa-stills.mjs               Renders review stills: node scripts/qa-stills.mjs 150 900 2400
public/
  fonts/                      IBM Plex Sans Arabic (SIL Open Font License)
  audio/                      voiceover.mp3 (silent placeholder until generated), music.wav, sfx/
```

## Scene map (default timing)

| # | Time | Scene |
|---|---|---|
| 1 | 0–7 s | Hook: a weak slide with comment bubbles |
| 2 | 7–15 s | The cost of weak design |
| 3 | 15–22 s | Brand reveal |
| 4 | 22–33 s | Presentations, with a Section Zoom through a sample investor deck |
| 5 | 33–43 s | Reports: slide morphs into a page, then a carousel of report pages |
| 6 | 43–53 s | Data: a dense table becomes KPIs, charts and a timeline |
| 7 | 53–63 s | Templates: a 9-layout grid whose content swaps inside the same system |
| 8 | 63–71 s | Localization: English slide and a re-laid-out Arabic slide |
| 9 | 71–80 s | Process: five steps |
| 10 | 80–85 s | Before and after split |
| 11 | 85–90 s | Call to action |

## Arabic and RTL notes

- All Arabic blocks use `direction: rtl`, `text-align: right` and `unicode-bidi: plaintext`. The code never reverses text by hand.
- "Basira Visual" and Latin terms are isolated as LTR.
- Numbers with `%` inside Arabic sentences are wrapped in Unicode isolates (U+2066/U+2069) so they read "24%".
- Captions stay above the bottom 390 px, clear of platform UI. Headlines start below 300 px.

## Quality checklist

Before publishing, render review stills with `scripts/qa-stills.mjs` and check the following:

- Arabic letters connect correctly.
- No text overlaps, and captions stay within two lines.
- The narration matches each scene.
- The music sits under the voice.
- Only placeholder contact details are shown.
- The duration is close to 90 s.
