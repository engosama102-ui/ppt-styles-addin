/**
 * CENTRAL CONFIGURATION
 * ---------------------
 * Change the brand name, colors, services, contact details, navigation
 * labels and optional slide images here. No animation code needs to change.
 */

export const brand = {
  /** Latin wordmark. Always rendered left-to-right. */
  name: 'Graphify Pro',
  /** Descriptor shown under the logo. */
  descriptor: 'Your visual communication partner',

  colors: {
    /** Background tones derived from the logo indigo #131033. */
    navy: '#0B0A22',
    darkBlue: '#17143D',
    blue: '#2F6BFF',
    /** Logo cyan. */
    cyan: '#12B4C7',
    /** Logo indigo, used for the mark on light surfaces. */
    indigo: '#131033',
    gold: '#FFC928',
    white: '#FFFFFF',
    gray: '#9BA9BA',
    /** Accent used for the soft edge glow in the background. */
    violet: '#5B3FD9',
    /** Surfaces used inside the sample slides. */
    slideBg: '#F5F8FC',
    slideInk: '#131033',
    slideMuted: '#6B7A8F',
    slideLine: '#DCE3EC',
  },

  fonts: {
    /** Loaded from public/fonts (see src/lib/fonts.ts). */
    /** Body and headline font. */
    text: 'Montserrat',
    /** Wordmark font (matches the Graphify Pro logo). */
    brand: 'Montserrat',
  },

  /**
   * Contact lines shown on the final call to action, top to bottom.
   * `label` is the text on screen. Icons: mail, phone, linkedin, behance, globe, link.
   */
  contact: [
    { icon: 'phone', label: 'WhatsApp  +20 101 403 1211' },
    { icon: 'behance', label: 'behance.net/GraphifyPro' },
  ] as { icon: 'mail' | 'phone' | 'linkedin' | 'behance' | 'globe' | 'link'; label: string }[],

  cta: {
    headline: ['Ready to turn your content', 'into visual impact?'],
    button: 'Start your project',
    secondary: 'Share your file. We will handle the transformation.',
  },

  /** Top navigation shown during the five service scenes (left to right). */
  navigation: ['Decks', 'Reports', 'Data', 'Templates', 'Formats'],

  /**
   * Optional real slide images. Put PNG/JPG files (16:9 for slides,
   * portrait for report pages) in public/slides and set the path here,
   * for example: presentationMarket: 'slides/market.png'.
   * Leave a value empty to use the built-in React/SVG sample design.
   */
  slideImages: {
    badSlide: '',
    goodSlide: '',
    presentationOverview: '',
    presentationStrategy: '',
    presentationMarket: '',
    presentationModel: '',
    presentationRoadmap: '',
    presentationSummary: '',
    reportCover: '',
    reportImpact: '',
    reportEsg: '',
    reportSummary: '',
    reportProfile: '',
    formatDeck: '',
    formatSocial: '',
    formatStory: '',
  } as Record<string, string>,
} as const;

export const audioMix = {
  /** Voice-over gain in dB. Keep at 0 so narration stays dominant. */
  voiceDb: 0,
  /** Background music level when narration is present. */
  musicDb: -22,
  /** Extra reduction applied to the music while a paragraph is spoken. */
  musicDuckDb: -3,
  /** Music level used when no voice-over has been generated yet. */
  musicNoVoiceDb: -15,
  /** Sound-effect level. */
  sfxDb: -14,
  musicFadeInSec: 1.5,
  musicFadeOutSec: 3,
};

export type Brand = typeof brand;
