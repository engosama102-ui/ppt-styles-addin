import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SceneTitle } from '../components/Headline';
import { Icon } from '../components/Icons';
import { Scaled, SlideSlot } from '../components/PresentationMockup';
import { brand } from '../config/brand';
import { formats } from '../data/scenes';
import { easeOut, lerp, progress, reveal } from '../lib/motion';
import { txt } from '../lib/text';
import { FormatDeck, FormatSocial, FormatStory } from '../slides/CompareSlides';
import { SceneFrame, SceneProps, useBeats } from './common';

const c = brand.colors;

const Tag: React.FC<{ text: string; gold?: boolean; opacity?: number }> = ({ text, gold, opacity = 1 }) => (
  <div
    style={{
      ...txt,
      position: 'absolute',
      top: -20,
      left: 14,
      zIndex: 5,
      fontSize: 20,
      fontWeight: 800,
      letterSpacing: 2,
      padding: '4px 14px',
      borderRadius: 10,
      background: gold ? c.gold : c.darkBlue,
      color: gold ? c.navy : c.white,
      border: gold ? 'none' : '1px solid rgba(255,255,255,0.18)',
      opacity,
    }}
  >
    {text}
  </div>
);

const frameStyle: React.CSSProperties = {
  position: 'absolute',
  borderRadius: 16,
  boxShadow: '0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.10)',
};

export const Scene08Formats: React.FC<SceneProps> = ({ duration }) => {
  const frame = useCurrentFrame();
  const b = useBeats('formats', duration);

  // Deck starts large, then shrinks to the top-left to make room.
  const shrink = progress(frame, b(2.0), 0.9);
  const deckW = lerp(920, 560, shrink);
  const deckTop = lerp(600, 580, shrink);
  const post = progress(frame, b(2.4), 0.7, easeOut);
  const story = progress(frame, b(3.1), 0.7, easeOut);

  const POST = 340;
  const STORY_H = 360;
  const STORY_W = (STORY_H * 9) / 16;

  return (
    <SceneFrame duration={duration}>
      <SceneTitle n={formats.number} lines={formats.title} size={62} />

      {/* 16:9 deck */}
      <div style={{ ...frameStyle, left: 80, top: deckTop, width: deckW, height: (deckW * 9) / 16, ...reveal(frame, 0.3, { dy: 50 }) }}>
        <Tag text={formats.tags[0]} />
        <div style={{ borderRadius: 16, overflow: 'hidden' }}>
          <Scaled w={1600} h={900} width={deckW}>
            <SlideSlot id="formatDeck">
              <FormatDeck />
            </SlideSlot>
          </Scaled>
        </div>
      </div>

      {/* 1:1 post */}
      <div
        style={{
          ...frameStyle,
          left: 1000 - POST,
          top: 568,
          width: POST,
          height: POST,
          opacity: post,
          transform: `translateX(${(1 - post) * 80}px)`,
          filter: post < 1 ? `blur(${(1 - post) * 8}px)` : undefined,
        }}
      >
        <Tag text={formats.tags[1]} gold />
        <div style={{ borderRadius: 16, overflow: 'hidden' }}>
          <Scaled w={800} h={800} width={POST}>
            <SlideSlot id="formatSocial" w={800} h={800}>
              <FormatSocial />
            </SlideSlot>
          </Scaled>
        </div>
      </div>

      {/* 9:16 story */}
      <div
        style={{
          ...frameStyle,
          left: 80,
          top: 940,
          width: STORY_W,
          height: STORY_H,
          opacity: story,
          transform: `translateY(${(1 - story) * 60}px)`,
          filter: story < 1 ? `blur(${(1 - story) * 8}px)` : undefined,
        }}
      >
        <Tag text={formats.tags[2]} />
        <div style={{ borderRadius: 16, overflow: 'hidden' }}>
          <Scaled w={450} h={800} width={STORY_W}>
            <SlideSlot id="formatStory" w={450} h={800}>
              <FormatStory />
            </SlideSlot>
          </Scaled>
        </div>
      </div>

      {/* Notes */}
      <div style={{ position: 'absolute', left: 80 + STORY_W + 50, top: 980, display: 'flex', flexDirection: 'column', gap: 26 }}>
        {formats.notes.map((n, i) => {
          const p = progress(frame, b(3.8) + i * b(0.7) - (i ? 0 : 0), 0.5, easeOut);
          return (
            <div
              key={n}
              style={{ ...txt, display: 'flex', alignItems: 'center', gap: 18, fontSize: 36, fontWeight: 600, color: c.white, opacity: p, transform: `translateX(${(1 - p) * -30}px)` }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,201,40,0.14)', border: `1.5px solid ${c.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="check" size={30} color={c.gold} stroke={4} />
              </div>
              {n}
            </div>
          );
        })}
      </div>
    </SceneFrame>
  );
};
