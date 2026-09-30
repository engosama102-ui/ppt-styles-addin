import { CSSProperties } from 'react';
import { FONT } from './fonts';

/** Base style for every Arabic text block. */
export const rtl: CSSProperties = {
  direction: 'rtl',
  textAlign: 'right',
  unicodeBidi: 'plaintext',
  fontFamily: FONT,
};

/** For Latin strings such as the brand name. */
export const ltr: CSSProperties = {
  direction: 'ltr',
  unicodeBidi: 'isolate',
  fontFamily: FONT,
};
