import React from 'react';
import { Composition } from 'remotion';
import { OsamaVisualAd } from './OsamaVisualAd';
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from './data/timeline';
import { ensureFonts } from './lib/fonts';

ensureFonts();

export const RemotionRoot: React.FC = () => (
  <Composition id="OsamaVisualAd" component={OsamaVisualAd} durationInFrames={TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
);
