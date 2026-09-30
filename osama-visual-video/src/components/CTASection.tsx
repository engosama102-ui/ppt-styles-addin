import React from 'react';
import { useCurrentFrame } from 'remotion';
import { brand } from '../config/brand';
import { easeOut, progress, springIn } from '../lib/motion';
import { ltr, rtl } from '../lib/text';
import { ArabicHeadline } from './ArabicHeadline';
import { Icon } from './Icons';
import { BrandName, LogoMark } from './Logo';

const c = brand.colors;

/** Final call to action. All text comes from brand.cta and brand.contact. */
export const CTASection: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const fps = 30;
  const endSec = duration / fps;
  const logo = springIn(frame, 0.1, 20);
  const btn = springIn(frame, 1.0, 22);
  const sec2 = progress(frame, 1.35, 0.6, easeOut);
  const contacts = brand.contact;
  // Soft pulse and yellow line in the final second and a half.
  const pulseP = progress(frame, endSec - 1.6, 0.6);
  const pulse = pulseP * (0.5 + 0.5 * Math.sin((frame / fps) * Math.PI * 2.2));
  const line = progress(frame, endSec - 1.5, 0.8);
  const shine = ((frame / fps) * 0.5) % 1.5;

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 250 }}>
      <div style={{ transform: `scale(${(0.7 + 0.3 * logo) * (1 + pulse * 0.05)})`, opacity: logo, filter: `drop-shadow(0 0 ${30 + pulse * 30}px rgba(36,199,217,0.5))` }}>
        <LogoMark size={130} id="cta" />
      </div>
      <div style={{ ...ltr, marginTop: 26, fontSize: 70, color: c.white, opacity: logo, whiteSpace: 'nowrap' }}>
        <BrandName />
      </div>
      <div style={{ width: 420, height: 5, marginTop: 12, borderRadius: 3, background: c.gold, transform: `scaleX(${line})`, transformOrigin: 'center', boxShadow: `0 0 18px ${c.gold}` }} />

      <div style={{ marginTop: 56, width: 940 }}>
        <ArabicHeadline lines={[[{ t: brand.cta.headline[0] }], [{ t: brand.cta.headline[1], hl: true }]]} size={70} startSec={0.4} underline={false} />
      </div>

      <div
        style={{
          ...rtl,
          marginTop: 48,
          position: 'relative',
          overflow: 'hidden',
          padding: '26px 70px',
          borderRadius: 50,
          background: c.gold,
          color: c.navy,
          fontSize: 50,
          fontWeight: 700,
          transform: `scale(${0.85 + 0.15 * btn})`,
          opacity: btn,
          boxShadow: `0 16px 50px rgba(255,201,40,0.35)`,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {brand.cta.button}
        <Icon name="arrow" size={40} color={c.navy} stroke={4} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 120,
            left: `${shine * 100 - 25}%`,
            background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent)',
          }}
        />
      </div>

      <div style={{ ...rtl, textAlign: 'center', marginTop: 30, fontSize: 36, color: c.gray, opacity: sec2 }}>{brand.cta.secondary}</div>

      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
        {contacts.map((k, i) => {
          const p = progress(frame, 1.6 + i * 0.12, 0.5, easeOut);
          return (
            <div
              key={k.label}
              style={{ ...ltr, display: 'flex', alignItems: 'center', gap: 16, fontSize: 32, color: c.white, opacity: p * 0.92, transform: `translateY(${(1 - p) * 14}px)` }}
            >
              <Icon name={k.icon} size={32} color={c.cyan} />
              {k.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
