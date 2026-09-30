import React from 'react';
import { AbsoluteFill, Composition } from 'remotion';
import { BrandBackground } from './components/BrandBackground';
import { Wordmark } from './components/Logo';
import { SceneTitle } from './components/ArabicHeadline';
import { PresentationMockup } from './components/PresentationMockup';
import { MarketSlide } from './slides/DeckSlides';
import { ArabicCaptions } from './components/ArabicCaptions';
import { TopNavigation } from './components/TopNavigation';
import { presentations } from './data/scenes';
import { ensureFonts } from './lib/fonts';

ensureFonts();

// Work-in-progress preview: service scene layout (scenes not yet wired).
const Preview: React.FC = () => (
  <AbsoluteFill>
    <BrandBackground />
    <div style={{ position: 'absolute', top: 120, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Wordmark height={52} />
    </div>
    <TopNavigation keys={[0]} showFrom={-30} hideAt={100000} />
    <SceneTitle n={presentations.number} lines={presentations.title} startSec={-2} />
    <div style={{ position: 'absolute', top: 640, left: 80 }}>
      <PresentationMockup width={920}>
        <MarketSlide />
      </PresentationMockup>
    </div>
    <ArabicCaptions />
  </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => (
  <Composition id="BasiraCorporateAd" component={Preview} durationInFrames={2700} fps={30} width={1080} height={1920} />
);
