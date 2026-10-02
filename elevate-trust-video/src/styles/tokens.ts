/**
 * BRAND TOKENS
 * ------------
 * All colors and type used by the film live here.
 *
 * STATUS: Elevate Pay values are PLACEHOLDERS. The official site
 * (elevatepay.co) could not be reached from the build environment, so these
 * were NOT extracted from its CSS. Replace them with the values from the
 * live site before publishing (see README, "Brand colors").
 *
 * Upwork green #14A800 is Upwork's published brand green. Verify against
 * Upwork's brand guidelines if you need exact compliance.
 */
export const tokens = {
  verified: {
    elevate: false,
    upwork: true,
  },
  color: {
    /** --elevate-primary: accent for the trust line, highlights, CTA. PLACEHOLDER */
    elevatePrimary: '#5B8CFF',
    /** --elevate-secondary: second accent for gradients. PLACEHOLDER */
    elevateSecondary: '#9B7BFF',
    /** --elevate-background: film background. PLACEHOLDER */
    elevateBackground: '#07080D',
    /** --elevate-surface: cards and nodes. PLACEHOLDER */
    elevateSurface: '#12141C',
    /** --elevate-text: primary text. */
    elevateText: '#F4F6FB',
    /** --elevate-muted: secondary text. */
    elevateMuted: '#8A90A2',
    /** --upwork-green: used only for Upwork context. */
    upworkGreen: '#14A800',
    /** Neutral used for the "past" (Wise) node so it never reads as negative. */
    past: '#5E6475',
    line: 'rgba(255,255,255,0.10)',
  },
  font: {
    /** Inter is a neutral placeholder. Swap for Elevate's typeface if known. */
    family: 'Inter',
  },
  radius: {
    card: 28,
    pill: 999,
    node: 20,
  },
} as const;

/** CSS custom properties, injected once at the root of the composition. */
export const cssVars: Record<string, string> = {
  '--elevate-primary': tokens.color.elevatePrimary,
  '--elevate-secondary': tokens.color.elevateSecondary,
  '--elevate-background': tokens.color.elevateBackground,
  '--elevate-surface': tokens.color.elevateSurface,
  '--elevate-text': tokens.color.elevateText,
  '--elevate-muted': tokens.color.elevateMuted,
  '--upwork-green': tokens.color.upworkGreen,
};

export const C = tokens.color;
export const FONT = `'${tokens.font.family}', 'Noto Color Emoji', sans-serif`;
