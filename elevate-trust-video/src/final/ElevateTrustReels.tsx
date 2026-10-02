import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Bg, ElevateTrustFinal } from './ElevateTrustFinal';

/**
 * Instagram Reels / Stories version, 1080×1920 (9:16).
 * Same film, same voice timing. The background is full-bleed; the 4:5 film is
 * scaled to 88% and placed inside the Reels safe area:
 *   top 250 px clear of the Reels header, bottom ~430 px clear of caption/handle,
 *   ~65 px side margins so text stays off the right-hand action buttons.
 */
export const REELS = { width: 1080, height: 1920, scale: 0.88, top: 262 };

export const ElevateTrustReels: React.FC = () => (
  <AbsoluteFill>
    <Bg />
    <div
      style={{
        position: 'absolute',
        top: REELS.top,
        left: (REELS.width - 1080 * REELS.scale) / 2,
        width: 1080,
        height: 1350,
        transform: `scale(${REELS.scale})`,
        transformOrigin: '0 0',
      }}
    >
      <ElevateTrustFinal background={false} />
    </div>
  </AbsoluteFill>
);
