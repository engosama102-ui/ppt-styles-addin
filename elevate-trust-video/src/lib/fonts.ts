import { loadFont } from '@remotion/fonts';
import { continueRender, delayRender, staticFile } from 'remotion';
import { tokens } from '../styles/tokens';

let started = false;
export const ensureFonts = () => {
  if (started) return;
  started = true;
  const h = delayRender('fonts');
  Promise.all(
    ['300', '400', '500', '600', '700', '800'].map((w) =>
      loadFont({ family: tokens.font.family, url: staticFile(`fonts/inter-latin-${w}-normal.woff2`), weight: w }),
    ),
  )
    .then(() => continueRender(h))
    .catch((e) => {
      console.error(e);
      continueRender(h);
    });
};
