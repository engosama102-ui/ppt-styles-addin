/**
 * On-screen text for every scene. Headline lines are arrays of segments.
 * A segment with `hl: true` is shown in gold with an animated underline.
 */
export type Segment = { t: string; hl?: boolean };
export type HeadlineLines = Segment[][];

export const sceneIds = [
  'hook',
  'cost',
  'intro',
  'presentations',
  'reports',
  'data',
  'templates',
  'formats',
  'process',
  'beforeAfter',
  'cta',
] as const;
export type SceneId = (typeof sceneIds)[number];

export const hook = {
  headline: [[{ t: "Do your company's decks" }], [{ t: 'still look ordinary?', hl: true }]] as HeadlineLines,
  comments: ['Too much text', 'Unclear message', "Where's the key number?", 'Inconsistent branding'],
};

export const cost = {
  lines: [
    [{ t: 'A strong idea' }],
    [{ t: 'Important data' }],
    [{ t: 'But the deck ' }, { t: "doesn't convince", hl: true }],
  ] as HeadlineLines,
  reactions: ['Distracted', 'Focus drops', 'Low engagement', 'Decision delayed'],
};

export const intro = {
  lead: 'Introducing',
};

export const presentations = {
  number: '01',
  title: [[{ t: 'Presentation ' }, { t: 'Design', hl: true }]] as HeadlineLines,
  labels: ['Board decks', 'Investor decks', 'Sales decks', 'Company profiles', 'Pitch decks'],
};

export const reports = {
  number: '02',
  title: [[{ t: 'Long reports become' }], [{ t: 'clear experiences', hl: true }]] as HeadlineLines,
  pageLabels: ['Annual report', 'Impact report', 'Sustainability report', 'Executive summary', 'Company profile'],
};

export const data = {
  number: '03',
  title: [[{ t: 'Data into ' }, { t: 'decisions', hl: true }]] as HeadlineLines,
  note: 'Illustrative data',
};

export const templates = {
  number: '04',
  title: [[{ t: 'One template. ' }, { t: 'Every deck.', hl: true }]] as HeadlineLines,
  labels: ['Unified fonts', 'Approved colors', 'Flexible layouts', 'Editable elements'],
};

export const formats = {
  number: '05',
  title: [[{ t: 'One story. ' }, { t: 'Every format.', hl: true }]] as HeadlineLines,
  tags: ['16:9 DECK', '1:1 POST', '9:16 STORY'],
  notes: ['Same brand system', 'Layout re-flowed', 'Key number kept'],
};

export const process = {
  title: [[{ t: 'From content to ' }, { t: 'ready files', hl: true }]] as HeadlineLines,
  steps: [
    { label: 'Understand the content', sub: 'Goals, audience, message', icon: 'brief' },
    { label: 'Build the structure', sub: 'A clear flow of ideas', icon: 'structure' },
    { label: 'Design the visual system', sub: 'Colors, type and elements', icon: 'design' },
    { label: 'Review every detail', sub: 'Accuracy on every page', icon: 'review' },
    { label: 'Deliver editable files', sub: 'PowerPoint and PDF', icon: 'delivery' },
  ],
};

export const beforeAfter = {
  title: [[{ t: 'The difference is ' }, { t: 'clear', hl: true }]] as HeadlineLines,
  before: 'BEFORE',
  after: 'AFTER',
  beforeNotes: ['Crowded text', 'Weak hierarchy', 'Unclear data'],
  afterNotes: ['Clear message', 'Professional chart', 'Consistent brand'],
};
