import React from 'react';
import { Composition } from 'remotion';
import { BasiraCorporateAd } from './BasiraCorporateAd';
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from './data/timeline';
import { ensureFonts } from './lib/fonts';

ensureFonts();

export const RemotionRoot: React.FC = () => (
  <Composition id="BasiraCorporateAd" component={BasiraCorporateAd} durationInFrames={TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
);
