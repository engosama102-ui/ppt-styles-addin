import React from 'react';
import { useCurrentFrame } from 'remotion';
import { brand } from '../config/brand';
import { easeOut, progress } from '../lib/motion';
import { txt } from '../lib/text';
import { Icon, IconName } from './Icons';

const c = brand.colors;

/** Label chip that slides into a grid slot. */
export const ServiceCard: React.FC<{
  label: string;
  startSec: number;
  icon?: IconName;
  active?: number;
  width?: number | string;
  fontSize?: number;
  latin?: boolean;
}> = ({ label, startSec, icon = 'check', active = 0, width = 'auto', fontSize = 30, latin }) => {
  const frame = useCurrentFrame();
  const p = progress(frame, startSec, 0.55, easeOut);
  return (
    <div
      style={{
        ...txt,
        width,
        boxSizing: 'border-box',
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px) scale(${0.94 + 0.06 * p})`,
        filter: p < 1 ? `blur(${(1 - p) * 8}px)` : undefined,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '16px 22px',
        borderRadius: 18,
        background: `rgba(${active ? '255,201,40' : '255,255,255'},${active ? 0.12 : 0.05})`,
        border: `1.5px solid ${active ? c.gold : 'rgba(255,255,255,0.12)'}`,
        color: c.white,
        fontSize,
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: 'rgba(36,199,217,0.14)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 'none',
        }}
      >
        <Icon name={icon} size={26} color={c.cyan} stroke={3.4} />
      </div>
      <span style={latin ? { direction: 'ltr', unicodeBidi: 'isolate' } : undefined}>{label}</span>
    </div>
  );
};
