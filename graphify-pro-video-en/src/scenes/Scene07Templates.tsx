import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SceneTitle } from '../components/Headline';
import { PresentationMockup } from '../components/PresentationMockup';
import { ServiceCard } from '../components/ServiceCard';
import { templateContent } from '../data/presentations';
import { templates } from '../data/scenes';
import { easeOut, progress } from '../lib/motion';
import { TemplateSlide, templateKinds } from '../slides/TemplateSlides';
import { SceneFrame, SceneProps, useBeats } from './common';

const TW = 290;
const GAP = 25;

export const Scene07Templates: React.FC<SceneProps> = ({ duration }) => {
  const frame = useCurrentFrame();
  const b = useBeats('templates', duration);
  const top = 555;
  return (
    <SceneFrame duration={duration}>
      <SceneTitle n={templates.number} lines={templates.title} size={58} />
      <div style={{ position: 'absolute', top, left: 80, width: 920, display: 'flex', flexWrap: 'wrap', gap: GAP, direction: 'ltr' }}>
        {templateKinds.map((kind, i) => {
          const p = progress(frame, 0.35 + i * 0.1, 0.6, easeOut);
          // Content swap with a 2D flip, staggered across the grid.
          const swapStart = b(5.2) + ((i % 3) + Math.floor(i / 3)) * 0.12;
          const sw = progress(frame, swapStart, 0.5);
          const flip = Math.abs(Math.cos(sw * Math.PI));
          const content = sw < 0.5 ? templateContent[0] : templateContent[1];
          return (
            <div
              key={kind}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 40}px) scale(${0.9 + 0.1 * p}) scaleX(${Math.max(0.02, flip)})`,
                filter: p < 1 ? `blur(${(1 - p) * 8}px)` : undefined,
              }}
            >
              <PresentationMockup width={TW} radius={10} glow={false}>
                <TemplateSlide kind={kind} content={content} />
              </PresentationMockup>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', top: top + 3 * 163 + 2 * GAP + 36, left: 80, width: 920, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', direction: 'ltr' }}>
        {templates.labels.map((l, i) => (
          <ServiceCard key={l} label={l} startSec={b(2.3) + i * 0.4} icon={(['design', 'target', 'layers', 'check'] as const)[i]} width={452} fontSize={30} />
        ))}
      </div>
    </SceneFrame>
  );
};
