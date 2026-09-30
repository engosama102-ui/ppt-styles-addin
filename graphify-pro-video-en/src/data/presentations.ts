/**
 * Fictional demonstration content used inside the sample slides.
 * None of this is client data. Edit freely.
 */

export const deckSections = [
  { id: 'presentationStrategy', no: '01', title: 'Strategy overview' },
  { id: 'presentationMarket', no: '02', title: 'Market opportunity' },
  { id: 'presentationModel', no: '03', title: 'Business model' },
  { id: 'presentationRoadmap', no: '04', title: 'Roadmap' },
  { id: 'presentationSummary', no: '05', title: 'Executive summary' },
];

export const strategyPillars = [
  { title: 'Growth', body: 'Expand into three new regional markets' },
  { title: 'Efficiency', body: 'Fully digitize core operations' },
  { title: 'Customer', body: 'One experience across every channel' },
];

export const marketBars = [
  { label: '2022', value: 42 },
  { label: '2023', value: 55 },
  { label: '2024', value: 68 },
  { label: '2025', value: 81 },
  { label: '2026', value: 100 },
];

export const modelSteps = ['Partners', 'Platform', 'Services', 'Customers'];

export const roadmap = [
  { year: '2025', title: 'Foundation', body: 'Build the team and platform' },
  { year: '2026', title: 'Expansion', body: 'Enter two new markets' },
  { year: '2027', title: 'Leadership', body: 'Target market share' },
];

export const summaryKpis = [
  { value: '24%', label: 'Revenue growth' },
  { value: '68%', label: 'Customer satisfaction' },
  { value: '3.5×', label: 'Expected return' },
];

/** Dashboard counters for the data scene. */
export const dashboardKpis = [
  { value: 24, suffix: '%', decimals: 0, label: 'Revenue growth' },
  { value: 68, suffix: '%', decimals: 0, label: 'Digital share' },
  { value: 3.5, suffix: '×', decimals: 1, label: 'Expected return' },
  { value: 2026, suffix: '', decimals: 0, label: 'Target year', noGrouping: true },
];

export const denseTable = {
  head: ['Metric', 'Q1', 'Q2', 'Q3', 'Q4'],
  rows: [
    ['Revenue', '18.2', '19.6', '21.4', '22.6'],
    ['Costs', '12.1', '12.4', '12.9', '13.0'],
    ['Profit margin', '33%', '37%', '40%', '42%'],
    ['New customers', '1,240', '1,380', '1,510', '1,720'],
    ['Retention rate', '81%', '83%', '85%', '88%'],
    ['Digital channels', '52%', '58%', '63%', '68%'],
    ['Satisfaction', '7.1', '7.4', '7.8', '8.2'],
  ],
};

export const dashboardBars = [
  { label: 'Q1', value: 18.2 },
  { label: 'Q2', value: 19.6 },
  { label: 'Q3', value: 21.4 },
  { label: 'Q4', value: 22.6 },
];

export const donut = [
  { label: 'Digital', value: 68 },
  { label: 'Branches', value: 22 },
  { label: 'Partners', value: 10 },
];

export const timeline = ['Analyze', 'Design', 'Launch', 'Measure'];

/** Two content sets used to show one template carrying different decks. */
export const templateContent = [
  {
    cover: 'Strategy 2026',
    coverSub: 'Board presentation',
    agenda: ['Context', 'Priorities', 'Plan', 'Impact'],
    divider: 'Priorities',
    text: 'Three priorities drive growth',
    chart: 'Revenue growth',
    infographic: 'Customer journey',
    team: 'Leadership team',
    timeline: 'Delivery phases',
    closing: 'Thank you',
  },
  {
    cover: 'Performance Review',
    coverSub: 'Investor meeting',
    agenda: ['Summary', 'Results', 'Risks', 'Outlook'],
    divider: 'Results',
    text: 'Results ahead of target',
    chart: 'Market share',
    infographic: 'Operating model',
    team: 'Executive team',
    timeline: '2027 plan',
    closing: 'Questions',
  },
];

export const formatContent = {
  kicker: 'REGIONAL PLAN',
  title: 'Regional Growth Plan',
  sub: 'Three markets, one operating model',
  kpi: '+24%',
  kpiLabel: 'Revenue growth',
  bars: [40, 58, 72, 90],
  barLabels: ['Q1', 'Q2', 'Q3', 'Q4'],
  points: ['Unified brand experience', 'Shared digital platform', 'Local partnerships'],
};

export const reportContent = {
  cover: { year: '2025', title: 'Annual Report', sub: 'Sustainable growth, lasting impact' },
  impact: { chapter: 'Chapter 3', title: 'Impact Report', body: 'Measurable impact on communities and the local economy through focused programs and long-term partnerships.', stats: [{ v: '120K', l: 'Beneficiaries' }, { v: '38', l: 'Initiatives' }, { v: '9', l: 'Cities' }] },
  esg: { title: 'Sustainability', items: ['Environment', 'Social', 'Governance'], values: [72, 64, 85], caption: 'Performance against target' },
  summary: { kicker: 'At a glance', title: 'Executive Summary', points: ['Revenue up 24%', 'Two new markets', 'Higher operating efficiency'] },
  profile: { title: 'Company Profile', sub: 'Who we are and what we do', pillars: ['Vision', 'Mission', 'Values'] },
};
