import { loadFont } from '@remotion/fonts';
import { staticFile, continueRender, delayRender } from 'remotion';
import { brand } from '../config/brand';

const ARABIC_RANGE =
  'U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0898-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC';
const LATIN_RANGE =
  'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD, U+00D7';

const weights = ['300', '400', '500', '600', '700'];

let started = false;
export const ensureFonts = () => {
  if (started) return;
  started = true;
  const handle = delayRender('Loading IBM Plex Sans Arabic');
  const jobs = weights.flatMap((w) => [
    loadFont({
      family: brand.fonts.arabic,
      url: staticFile(`fonts/ibm-plex-sans-arabic-arabic-${w}-normal.woff2`),
      weight: w,
      unicodeRange: ARABIC_RANGE,
    }),
    loadFont({
      family: brand.fonts.arabic,
      url: staticFile(`fonts/ibm-plex-sans-arabic-latin-${w}-normal.woff2`),
      weight: w,
      unicodeRange: LATIN_RANGE,
    }),
  ]);
  Promise.all(jobs)
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
};

export const FONT = `'${brand.fonts.arabic}', sans-serif`;
