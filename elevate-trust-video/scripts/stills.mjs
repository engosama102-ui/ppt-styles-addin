// Renders review stills. Default: the three deliverable stills into stills/.
// Custom: node scripts/stills.mjs 120 450 900   (writes out/qa/fNNNN.jpg)
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'node:path';

const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE || undefined;
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const composition = await selectComposition({ serveUrl, id: 'ElevateTrust', browserExecutable });
const args = process.argv.slice(2).map(Number);
const { scenes } = { scenes: null };
const jobs = args.length
  ? args.map((f) => ({ frame: f, output: `out/qa/f${String(f).padStart(4, '0')}.jpg`, imageFormat: 'jpeg' }))
  : [
      { frame: 85, output: 'stills/01-hook.png' },
      { frame: 96 + 100, output: 'stills/02-trust.png' },
      { frame: composition.durationInFrames - 15, output: 'stills/03-final-cta.png' },
    ].map((j) => ({ ...j, imageFormat: 'png' }));
for (const j of jobs) {
  await renderStill({ serveUrl, composition, frame: j.frame, output: j.output, imageFormat: j.imageFormat, browserExecutable });
  console.log('rendered', j.output);
}
