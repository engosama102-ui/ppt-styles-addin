// One representative frame per V2 scene, tiled into contact-sheet.jpg (5 × 2).
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE || undefined;
const ffmpeg = process.env.FFMPEG || 'ffmpeg';
const frames = { hook: 70, trust: 160, global: 240, wise: 385, early: 495, years: 590, upwork: 662, proof: 832, close: 1000, final: 1110 };
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const composition = await selectComposition({ serveUrl, id: 'ElevateTrustV2', browserExecutable });
fs.mkdirSync('out/sheet', { recursive: true });
let i = 0;
for (const [name, frame] of Object.entries(frames)) {
  const out = `out/sheet/${String(i++).padStart(2, '0')}-${name}.jpg`;
  await renderStill({ serveUrl, composition, frame, output: out, imageFormat: 'jpeg', jpegQuality: 90, browserExecutable });
  console.log('rendered', out);
}
execFileSync(ffmpeg, ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', 'out/sheet/*.jpg', '-vf', 'scale=432:-1,tile=5x2:padding=8:color=white', '-frames:v', '1', 'contact-sheet.jpg']);
console.log('contact-sheet.jpg written');
