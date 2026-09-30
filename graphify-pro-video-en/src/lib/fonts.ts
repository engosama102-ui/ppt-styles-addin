import { loadFont } from '@remotion/fonts';
import { staticFile, continueRender, delayRender } from 'remotion';
import { brand } from '../config/brand';

const weights = ['400', '500', '600', '700', '800'];

let started = false;
export const ensureFonts = () => {
  if (started) return;
  started = true;
  const handle = delayRender('Loading Montserrat');
  const jobs = weights.map((w) =>
    loadFont({
      family: brand.fonts.text,
      url: staticFile(`fonts/montserrat-latin-${w}-normal.woff2`),
      weight: w,
    }),
  );
  Promise.all(jobs)
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
};

export const FONT = `'${brand.fonts.text}', sans-serif`;
