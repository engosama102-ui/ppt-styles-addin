import { loadFont } from '@remotion/fonts';
import { continueRender, delayRender, staticFile } from 'remotion';
import { tokens } from '../styles/tokens';

let started = false;
export const ensureFonts = () => {
  if (started) return;
  started = true;
  const h = delayRender('fonts');
  const body = ['300', '400', '500', '600', '700', '800'].map((w) =>
    loadFont({ family: tokens.font.family, url: staticFile(`fonts/inter-latin-${w}-normal.woff2`), weight: w }),
  );
  const display = loadFont({
    family: tokens.font.display,
    url: staticFile('fonts/archivo-latin-wdth-normal.woff2'),
    weight: '100 900',
    stretch: '62% 125%',
  });
  Promise.all([...body, display])
    .then(() => continueRender(h))
    .catch((e) => {
      console.error(e);
      continueRender(h);
    });
};
