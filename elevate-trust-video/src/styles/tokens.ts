/**
 * BRAND TOKENS
 * ------------
 * All colors and type used by the film live here.
 *
 * SOURCE: Elevate values were sampled pixel by pixel from the supplied
 * capture of elevatepay.co/upwork-giveaway and the supplied Elevate app
 * screenshot. The live site's CSS could not be read (network blocked), so
 * values are sampled, not copied from the stylesheet. Check them against
 * DevTools on elevatepay.co if exact matching matters.
 *
 * Upwork green #14A800 is Upwork's published brand green. Verify against
 * Upwork's brand guidelines if you need exact compliance.
 */
export const tokens = {
  verified: {
    elevate: 'sampled-from-capture',
    upwork: true,
  },
  color: {
    /** --elevate-primary: CTA pill ("Post on LinkedIn"), sampled #4E51FC. */
    elevatePrimary: '#4E51FC',
    /** --elevate-secondary: royal blue at the right of the hero gradient. */
    elevateSecondary: '#011560',
    /** --elevate-background: near-black start of the hero gradient. */
    elevateBackground: '#000105',
    /** --elevate-surface: indigo cards / app pills (#0E0F31 web, #0E0F33 app). */
    elevateSurface: '#0E0F32',
    /** Hero mid indigo and the top glow seen on the CTA card. */
    elevateIndigo: '#010735',
    elevateGlow: '#1F1E85',
    /** Light page background on the website. */
    elevatePaper: '#F9F8FD',
    /** Lighter tint of the primary for accent TEXT on dark (contrast). */
    elevateAccentText: '#9A9DFF',
    /** App list icon circles. */
    elevateChip: '#2A292E',
    /** --elevate-text: primary text. */
    elevateText: '#F4F6FB',
    /** --elevate-muted: secondary text. */
    elevateMuted: '#9A9CC8',
    /** --upwork-green: used only for Upwork context. */
    upworkGreen: '#14A800',
    /** Neutral used for the "past" (Wise) node so it never reads as negative. */
    past: '#5E6475',
    line: 'rgba(255,255,255,0.10)',
  },
  font: {
    /** Body text. Neutral grotesk close to the site's body copy. */
    family: 'Inter',
    /**
     * Display: wide, heavy, uppercase headlines like the site's
     * "WIN 3,000 FREE UPWORK CONNECTS". Archivo at expanded width is the
     * closest open font; swap for Elevate's licensed display face if you have it.
     */
    display: 'Archivo',
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
