/**
 * Burned-in captions. Each paragraph is split into short phrases
 * (3 to 7 words). Words listed in `hl` are shown in gold.
 * The phrases of a paragraph must add up to the paragraph text in
 * src/data/voiceover.ts so word-level timing can be matched.
 */
export type CaptionPhrase = { text: string; hl?: string[] };

export const captionPhrases: CaptionPhrase[][] = [
  [
    { text: "Do your company's presentations", hl: [] },
    { text: 'still feel crowded, generic,', hl: ['crowded,', 'generic,'] },
    { text: 'and unable to land the message?', hl: ['message?'] },
  ],
  [
    { text: 'You may have a strong strategy', hl: ['strategy'] },
    { text: 'and important data,', hl: ['data,'] },
    { text: 'but the way it is presented', hl: [] },
    { text: 'makes your audience lose focus.', hl: ['lose', 'focus.'] },
  ],
  [
    { text: "That's where Graphify Pro comes in.", hl: ['Graphify', 'Pro'] },
    { text: 'We turn complex content', hl: [] },
    { text: 'into a clear, professional,', hl: ['clear,'] },
    { text: 'and persuasive visual story.', hl: ['persuasive'] },
  ],
  [
    { text: 'We design board presentations,', hl: ['board'] },
    { text: 'investor and sales decks,', hl: ['investor'] },
    { text: 'and company profiles that reflect', hl: [] },
    { text: 'the strength of your business.', hl: ['strength'] },
  ],
  [
    { text: 'We redesign annual reports,', hl: ['annual', 'reports,'] },
    { text: 'impact and sustainability reports, and research,', hl: ['sustainability'] },
    { text: 'so they are easier', hl: ['easier'] },
    { text: 'to read and understand.', hl: [] },
  ],
  [
    { text: 'We turn complex tables and numbers', hl: [] },
    { text: 'into charts and dashboards', hl: ['charts', 'dashboards'] },
    { text: 'that help your audience', hl: [] },
    { text: 'see the meaning and decide.', hl: ['meaning', 'decide.'] },
  ],
  [
    { text: 'We also build flexible templates', hl: ['templates'] },
    { text: 'and design systems, so your teams', hl: ['design', 'systems,'] },
    { text: 'create consistent decks', hl: ['consistent'] },
    { text: 'without starting from scratch.', hl: [] },
  ],
  [
    { text: 'And we adapt your story', hl: [] },
    { text: 'to every format,', hl: ['every', 'format,'] },
    { text: 'from decks to social posts,', hl: [] },
    { text: 'keeping your brand consistent.', hl: ['brand'] },
  ],
  [
    { text: 'We understand your goals,', hl: ['goals,'] },
    { text: 'build the structure,', hl: ['structure,'] },
    { text: 'design the visual system,', hl: [] },
    { text: 'review every detail,', hl: [] },
    { text: 'and deliver editable files.', hl: ['editable'] },
  ],
  [
    { text: 'The result? A clearer message,', hl: ['result?'] },
    { text: 'a stronger presence,', hl: ['stronger'] },
    { text: 'and a presentation that persuades.', hl: ['persuades.'] },
  ],
  [
    { text: 'Have an important deck or report?', hl: [] },
    { text: 'Contact Graphify Pro,', hl: ['Graphify', 'Pro,'] },
    { text: "and let's turn your content", hl: [] },
    { text: 'into an experience worth attention.', hl: ['worth', 'attention.'] },
  ],
];
