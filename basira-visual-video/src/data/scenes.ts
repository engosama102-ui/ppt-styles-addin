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
  'localization',
  'process',
  'beforeAfter',
  'cta',
] as const;
export type SceneId = (typeof sceneIds)[number];

export const hook = {
  headline: [[{ t: 'هل ما زالت عروض شركتك' }], [{ t: 'تبدو عادية؟', hl: true }]] as HeadlineLines,
  comments: ['النص كثير', 'الفكرة غير واضحة', 'أين أهم رقم؟', 'الهوية غير متناسقة'],
};

export const cost = {
  lines: [
    [{ t: 'فكرة قوية' }],
    [{ t: 'بيانات مهمة' }],
    [{ t: 'لكن العرض ' }, { t: 'لا يقنع', hl: true }],
  ] as HeadlineLines,
  reactions: ['تشتت الانتباه', 'تركيز يتراجع', 'تفاعل منخفض', 'قرار مؤجل'],
};

export const intro = {
  lead: 'هنا يأتي دور',
};

export const presentations = {
  number: '01',
  title: [[{ t: 'تصميم ' }, { t: 'العروض التقديمية', hl: true }]] as HeadlineLines,
  labels: ['عروض مجالس الإدارة', 'عروض المستثمرين', 'عروض المبيعات', 'عروض الشركات', 'Pitch Decks'],
};

export const reports = {
  number: '02',
  title: [[{ t: 'تقارير تتحول من صفحات طويلة' }], [{ t: 'إلى ' }, { t: 'تجربة واضحة', hl: true }]] as HeadlineLines,
  pageLabels: ['التقرير السنوي', 'تقرير الأثر', 'تقرير الاستدامة', 'الملخص التنفيذي', 'الملف التعريفي'],
};

export const data = {
  number: '03',
  title: [[{ t: 'نحوّل البيانات إلى ' }, { t: 'قرارات', hl: true }]] as HeadlineLines,
  note: 'بيانات توضيحية',
};

export const templates = {
  number: '04',
  title: [[{ t: 'قالب واحد… ' }, { t: 'واتساق', hl: true }, { t: ' في كل عرض' }]] as HeadlineLines,
  labels: ['خطوط موحدة', 'ألوان معتمدة', 'تخطيطات مرنة', 'عناصر قابلة للتعديل'],
};

export const localization = {
  number: '05',
  title: [[{ t: 'عربي وإنجليزي… ' }, { t: 'بنفس الجودة', hl: true }]] as HeadlineLines,
  notes: ['اتجاه صحيح من اليمين', 'مخطط معاد تموضعه', 'خط عربي واضح', 'هوية محفوظة'],
};

export const process = {
  title: [[{ t: 'من المحتوى إلى ' }, { t: 'ملف جاهز', hl: true }]] as HeadlineLines,
  steps: [
    { label: 'نفهم المحتوى', sub: 'الهدف والجمهور والرسالة', icon: 'brief' },
    { label: 'نبني الهيكل', sub: 'تسلسل واضح للأفكار', icon: 'structure' },
    { label: 'نصمم النظام البصري', sub: 'ألوان وخطوط وعناصر', icon: 'design' },
    { label: 'نراجع التفاصيل', sub: 'دقة في كل صفحة', icon: 'review' },
    { label: 'نسلم ملفات قابلة للتعديل', sub: 'PowerPoint و PDF', icon: 'delivery' },
  ],
};

export const beforeAfter = {
  title: [[{ t: 'الفرق ' }, { t: 'واضح', hl: true }]] as HeadlineLines,
  before: 'قبل',
  after: 'بعد',
  beforeNotes: ['نص مزدحم', 'تسلسل ضعيف', 'بيانات غير واضحة'],
  afterNotes: ['رسالة واضحة', 'مخطط احترافي', 'هوية متسقة'],
};
