/**
 * Fictional demonstration content used inside the sample slides.
 * None of this is client data. Edit freely.
 */

export const deckSections = [
  { id: 'presentationStrategy', no: '01', title: 'نظرة استراتيجية' },
  { id: 'presentationMarket', no: '02', title: 'فرصة السوق' },
  { id: 'presentationModel', no: '03', title: 'نموذج العمل' },
  { id: 'presentationRoadmap', no: '04', title: 'خارطة الطريق' },
  { id: 'presentationSummary', no: '05', title: 'الملخص التنفيذي' },
];

export const strategyPillars = [
  { title: 'النمو', body: 'التوسع في ثلاثة أسواق إقليمية جديدة' },
  { title: 'الكفاءة', body: 'رقمنة العمليات الأساسية بالكامل' },
  { title: 'العميل', body: 'تجربة موحدة عبر جميع القنوات' },
];

export const marketBars = [
  { label: '2022', value: 42 },
  { label: '2023', value: 55 },
  { label: '2024', value: 68 },
  { label: '2025', value: 81 },
  { label: '2026', value: 100 },
];

export const modelSteps = ['الشركاء', 'المنصة', 'الخدمات', 'العملاء'];

export const roadmap = [
  { year: '2025', title: 'التأسيس', body: 'بناء الفريق والمنصة' },
  { year: '2026', title: 'التوسع', body: 'دخول سوقين جديدين' },
  { year: '2027', title: 'الريادة', body: 'حصة سوقية مستهدفة' },
];

export const summaryKpis = [
  { value: '24%', label: 'نمو الإيرادات' },
  { value: '68%', label: 'رضا العملاء' },
  { value: '3.5×', label: 'العائد المتوقع' },
];

/** Dashboard counters for the data scene. */
export const dashboardKpis = [
  { value: 24, suffix: '%', decimals: 0, label: 'نمو الإيرادات' },
  { value: 68, suffix: '%', decimals: 0, label: 'حصة الرقمنة' },
  { value: 3.5, suffix: '×', decimals: 1, label: 'العائد المتوقع' },
  { value: 2026, suffix: '', decimals: 0, label: 'سنة الهدف', noGrouping: true },
];

export const denseTable = {
  head: ['المؤشر', 'الربع ١', 'الربع ٢', 'الربع ٣', 'الربع ٤'],
  rows: [
    ['الإيرادات', '18.2', '19.6', '21.4', '22.6'],
    ['التكاليف', '12.1', '12.4', '12.9', '13.0'],
    ['هامش الربح', '33%', '37%', '40%', '42%'],
    ['العملاء الجدد', '1,240', '1,380', '1,510', '1,720'],
    ['معدل الاحتفاظ', '81%', '83%', '85%', '88%'],
    ['القنوات الرقمية', '52%', '58%', '63%', '68%'],
    ['رضا العملاء', '7.1', '7.4', '7.8', '8.2'],
  ],
};

export const dashboardBars = [
  { label: 'ر١', value: 18.2 },
  { label: 'ر٢', value: 19.6 },
  { label: 'ر٣', value: 21.4 },
  { label: 'ر٤', value: 22.6 },
];

export const donut = [
  { label: 'رقمي', value: 68 },
  { label: 'فروع', value: 22 },
  { label: 'شركاء', value: 10 },
];

export const timeline = ['التحليل', 'التصميم', 'الإطلاق', 'القياس'];

/** Two content sets used to show one template carrying different decks. */
export const templateContent = [
  {
    cover: 'الاستراتيجية ٢٠٢٦',
    coverSub: 'عرض مجلس الإدارة',
    agenda: ['السياق', 'الأولويات', 'الخطة', 'الأثر'],
    divider: 'الأولويات',
    text: 'ثلاث أولويات تقود النمو',
    chart: 'نمو الإيرادات',
    infographic: 'رحلة العميل',
    team: 'فريق القيادة',
    timeline: 'مراحل التنفيذ',
    closing: 'شكراً لكم',
  },
  {
    cover: 'تقرير الأداء',
    coverSub: 'اجتماع المستثمرين',
    agenda: ['الملخص', 'النتائج', 'المخاطر', 'التوقعات'],
    divider: 'النتائج',
    text: 'نتائج تفوق المستهدف',
    chart: 'الحصة السوقية',
    infographic: 'نموذج التشغيل',
    team: 'الفريق التنفيذي',
    timeline: 'خطة ٢٠٢٧',
    closing: 'أسئلة ونقاش',
  },
];

export const localizationSlide = {
  en: { title: 'Regional Growth Plan', sub: 'Three markets, one operating model', kpi: '+24%', kpiLabel: 'Revenue growth' },
  ar: { title: 'خطة النمو الإقليمي', sub: 'ثلاثة أسواق بنموذج تشغيل واحد', kpi: '+24%', kpiLabel: 'نمو الإيرادات' },
  bars: [40, 58, 72, 90],
  enBarLabels: ['Q1', 'Q2', 'Q3', 'Q4'],
  arBarLabels: ['ر١', 'ر٢', 'ر٣', 'ر٤'],
  enPoints: ['Unified brand experience', 'Shared digital platform', 'Local partnerships'],
  arPoints: ['تجربة موحدة للعلامة', 'منصة رقمية مشتركة', 'شراكات محلية'],
};

export const reportContent = {
  cover: { year: '2025', title: 'التقرير السنوي', sub: 'نمو مستدام وأثر ممتد' },
  impact: { title: 'تقرير الأثر', stats: [{ v: '120K', l: 'مستفيد' }, { v: '38', l: 'مبادرة' }, { v: '9', l: 'مدن' }] },
  esg: { title: 'الاستدامة', items: ['البيئة', 'المجتمع', 'الحوكمة'], values: [72, 64, 85] },
  summary: { title: 'الملخص التنفيذي', points: ['نمو الإيرادات 24%', 'توسع في سوقين', 'تحسين الكفاءة التشغيلية'] },
  profile: { title: 'الملف التعريفي', sub: 'من نحن وماذا نقدم' },
};
