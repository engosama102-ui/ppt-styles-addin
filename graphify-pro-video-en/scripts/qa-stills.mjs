// Renders QA stills at given frames: node scripts/qa-stills.mjs 100 400 ...
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'node:path';

const frames = process.argv.slice(2).map(Number);
const browserExecutable = process.env.REMOTION_BROWSER || undefined;
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const composition = await selectComposition({ serveUrl, id: 'GraphifyProAd', browserExecutable });
for (const frame of frames) {
  await renderStill({ serveUrl, composition, frame, output: `out/qa/f${String(frame).padStart(4, '0')}.jpg`, imageFormat: 'jpeg', jpegQuality: 80, browserExecutable });
  console.log('rendered', frame);
}
