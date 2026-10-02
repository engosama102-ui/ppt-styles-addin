import React from 'react';
import { Composition } from 'remotion';
import { ElevateTrust } from './ElevateTrust';
import { ElevateTrustV2 } from './v2/ElevateTrustV2';
import { V2_TOTAL } from './v2/timeline';
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from './data/timeline';
import { ensureFonts } from './lib/fonts';

ensureFonts();

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ElevateTrustV2" component={ElevateTrustV2} durationInFrames={V2_TOTAL} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="ElevateTrust" component={ElevateTrust} durationInFrames={TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
  </>
);
