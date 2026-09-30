import React from 'react';
import { useCurrentFrame } from 'remotion';
import { AnnotationBubble } from '../components/AnnotationBubble';
import { SceneTitle } from '../components/ArabicHeadline';
import { PresentationMockup, SlideSlot } from '../components/PresentationMockup';
import { brand } from '../config/brand';
import { localization } from '../data/scenes';
import { progress, reveal } from '../lib/motion';
import { ArabicSlide, EnglishSlide } from '../slides/CompareSlides';
import { SceneFrame, SceneProps, useBeats } from './common';

const c = brand.colors;
const W = 660;
const H = (W * 9) / 16;
const k = W / 1600;

const Tag: React.FC<{ text: string; gold?: boolean }> = ({ text, gold }) => (
  <div
    style={{
      position: 'absolute',
      top: -18,
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: 2,
      padding: '4px 16px',
      borderRadius: 10,
      background: gold ? c.gold : '#2A3B52',
      color: gold ? c.navy : c.white,
      zIndex: 5,
      fontFamily: 'inherit',
    }}
  >
    {text}
  </div>
);

export const Scene08Localization: React.FC<SceneProps> = ({ duration }) => {
  const frame = useCurrentFrame();
  const b = useBeats('localization', duration);
  const enTop = 560;
  const arTop = enTop + H + 44;
  const arLeft = 1080 - 80 - W;
  const morph = progress(frame, b(1.2), 1.1);
  const notes = [
    { text: localization.notes[0], tx: 1300, ty: 150 },
    { text: localization.notes[1], tx: 330, ty: 420 },
    { text: localization.notes[2], tx: 1250, ty: 560 },
    { text: localization.notes[3], tx: 1445, ty: 6 },
  ];
  return (
    <SceneFrame duration={duration}>
      <SceneTitle n={localization.number} lines={localization.title} size={72} />
      <div style={{ position: 'absolute', top: enTop, left: 80, ...reveal(frame, 0.25, { dy: 50 }) }}>
        <Tag text="EN" />
        <div style={{ position: 'absolute', top: -18, left: 70 }} />
        <PresentationMockup width={W} glow={false}>
          <SlideSlot id="localizationEnglish">
            <EnglishSlide />
          </SlideSlot>
        </PresentationMockup>
      </div>
      <div style={{ position: 'absolute', top: arTop, left: arLeft, ...reveal(frame, 0.6, { dy: 50 }) }}>
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', right: 18, top: 0 }}>
              <Tag text="AR" gold />
            </div>
          </div>
        </div>
        <PresentationMockup width={W}>
          <SlideSlot id="localizationArabic">
            <ArabicSlide morph={morph} />
          </SlideSlot>
        </PresentationMockup>
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 1080, height: 1920 }}>
        {notes.map((n, i) => (
          <AnnotationBubble
            key={n.text}
            text={n.text}
            x={i % 2 === 0 ? 190 : 200}
            y={arTop + 40 + i * 92}
            tx={arLeft + n.tx * k}
            ty={arTop + n.ty * k}
            startSec={b(2.6) + i * b(0.8) - (i ? 0 : 0)}
            tone="good"
            fontSize={25}
          />
        ))}
      </div>
    </SceneFrame>
  );
};
