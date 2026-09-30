import React from 'react';

/** Minimal stroke icons on a 48 grid. */
export type IconName =
  | 'brief'
  | 'structure'
  | 'design'
  | 'review'
  | 'delivery'
  | 'globe'
  | 'mail'
  | 'link'
  | 'confused'
  | 'attention'
  | 'engagement'
  | 'decision'
  | 'chart'
  | 'users'
  | 'target'
  | 'layers'
  | 'check'
  | 'phone'
  | 'linkedin'
  | 'behance'
  | 'arrow';

const paths: Record<IconName, React.ReactNode> = {
  brief: (
    <>
      <path d="M13 6h16l8 8v28H13z" />
      <path d="M29 6v8h8" />
      <path d="M19 24h12M19 31h12M19 38h7" />
    </>
  ),
  structure: (
    <>
      <rect x="18" y="6" width="12" height="9" rx="2" />
      <rect x="5" y="33" width="12" height="9" rx="2" />
      <rect x="31" y="33" width="12" height="9" rx="2" />
      <path d="M24 15v9M11 33v-9h26v9" />
    </>
  ),
  design: (
    <>
      <path d="M8 40l6-2 24-24-4-4L10 34z" />
      <path d="M30 14l4 4" />
      <path d="M24 42h16" />
    </>
  ),
  review: (
    <>
      <circle cx="21" cy="21" r="13" />
      <path d="M31 31l10 10" />
      <path d="M15 21l4 4 8-8" />
    </>
  ),
  delivery: (
    <>
      <path d="M6 30v10h36V30" />
      <path d="M24 6v24M15 21l9 9 9-9" />
    </>
  ),
  globe: (
    <>
      <circle cx="24" cy="24" r="17" />
      <path d="M7 24h34M24 7c6 6 6 28 0 34M24 7c-6 6-6 28 0 34" />
    </>
  ),
  mail: (
    <>
      <rect x="6" y="11" width="36" height="26" rx="3" />
      <path d="M7 13l17 13 17-13" />
    </>
  ),
  link: (
    <>
      <path d="M20 28l8-8" />
      <path d="M22 14l4-4a8 8 0 0111 11l-4 4" />
      <path d="M26 34l-4 4a8 8 0 01-11-11l4-4" />
    </>
  ),
  confused: (
    <>
      <circle cx="24" cy="24" r="17" />
      <circle cx="18" cy="20" r="1.6" fill="currentColor" />
      <circle cx="30" cy="20" r="1.6" fill="currentColor" />
      <path d="M16 32c3-2 5 2 8 0s5 2 8 0" />
    </>
  ),
  attention: (
    <>
      <rect x="8" y="10" width="7" height="28" rx="2" />
      <rect x="20" y="18" width="7" height="20" rx="2" />
      <rect x="32" y="28" width="7" height="10" rx="2" />
    </>
  ),
  engagement: (
    <>
      <path d="M6 12l11 11 8-6 17 19" />
      <path d="M34 36h8v-8" />
    </>
  ),
  decision: (
    <>
      <circle cx="24" cy="24" r="16" />
      <circle cx="24" cy="24" r="8" />
      <path d="M36 12l6-6M38 6h4v4" />
    </>
  ),
  chart: (
    <>
      <path d="M6 42h36" />
      <rect x="10" y="24" width="7" height="14" rx="1" />
      <rect x="21" y="16" width="7" height="22" rx="1" />
      <rect x="32" y="8" width="7" height="30" rx="1" />
    </>
  ),
  users: (
    <>
      <circle cx="18" cy="17" r="7" />
      <path d="M5 40c1-8 7-12 13-12s12 4 13 12" />
      <circle cx="33" cy="15" r="5" />
      <path d="M33 25c5 0 9 3 10 10" />
    </>
  ),
  target: (
    <>
      <circle cx="24" cy="24" r="16" />
      <circle cx="24" cy="24" r="9" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </>
  ),
  layers: (
    <>
      <path d="M24 6l18 9-18 9-18-9z" />
      <path d="M6 24l18 9 18-9" />
      <path d="M6 33l18 9 18-9" />
    </>
  ),
  check: <path d="M10 25l9 9 19-19" />,
  phone: (
    <>
      <path d="M24 6a17 17 0 00-14.6 25.7L7 41l9.6-2.4A17 17 0 1024 6z" />
      <path d="M18 17c0 7 6 13 13 13l2-3-4-2-2 2c-3-1-5-3-6-6l2-2-2-4z" />
    </>
  ),
  linkedin: (
    <>
      <rect x="6" y="6" width="36" height="36" rx="6" />
      <path d="M15 21v13M15 14.5v.5M22 34V21M22 27c0-4 2.5-6 5.5-6S33 23 33 27v7" />
    </>
  ),
  behance: (
    <>
      <path d="M6 14h9a5 5 0 010 10H6zM6 24h10a5.5 5.5 0 010 11H6z" />
      <path d="M28 27h14a7 7 0 00-14 0 7 7 0 0013 3.5M30 15h9" />
    </>
  ),
  arrow: <path d="M40 24H8M18 14L8 24l10 10" />,
};

export const Icon: React.FC<{ name: IconName; size?: number; color?: string; stroke?: number; style?: React.CSSProperties }> = ({
  name,
  size = 40,
  color = 'currentColor',
  stroke = 3,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color, display: 'block', ...style }}
  >
    {paths[name]}
  </svg>
);
