export interface FeatureItem {
  id: number;
  number: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  svgKey: string;
  gridSpanClass: string;
  highlightColor: string;
}

export const featureData: FeatureItem[] = [
  {
    id: 1,
    number: '01',
    title: 'Agents',
    description: 'Autonomous agents that adapt and get things done.',
    metric: '99.99%',
    metricLabel: 'Execution Uptime',
    svgKey: 'agents',
    gridSpanClass: 'col-span-12 md:col-span-6 lg:col-span-4',
    highlightColor: 'from-blue-500/10 to-indigo-500/10',
  },
  {
    id: 2,
    number: '02',
    title: 'Analytics',
    description: 'Real-time insights and metrics that matter.',
    metric: '< 4ms',
    metricLabel: 'Query Latency',
    svgKey: 'analytics',
    gridSpanClass: 'col-span-12 md:col-span-6 lg:col-span-4',
    highlightColor: 'from-purple-500/10 to-pink-500/10',
  },
  {
    id: 3,
    number: '03',
    title: 'Automation',
    description: 'Design, automate and optimize workflows with zero friction.',
    metric: '12.8x',
    metricLabel: 'Throughput Multiplier',
    svgKey: 'automation',
    gridSpanClass: 'col-span-12 md:col-span-6 lg:col-span-4',
    highlightColor: 'from-indigo-500/10 to-violet-500/10',
  },
  {
    id: 4,
    number: '04',
    title: 'Security',
    description: 'Enterprise-grade security you can always trust.',
    metric: 'AES-256',
    metricLabel: 'Quantum Encryption',
    svgKey: 'security',
    gridSpanClass: 'col-span-12 md:col-span-6 lg:col-span-4',
    highlightColor: 'from-red-500/10 to-rose-500/10',
  },
  {
    id: 5,
    number: '05',
    title: 'Integration',
    description: 'Connect your favorite tools and systems in one place.',
    metric: '100+',
    metricLabel: 'Supported Connectors',
    svgKey: 'integration',
    gridSpanClass: 'col-span-12 md:col-span-6 lg:col-span-4',
    highlightColor: 'from-cyan-500/10 to-blue-500/10',
  },
  {
    id: 6,
    number: '06',
    title: 'Performance',
    description: 'Predict outcomes and make smarter decisions with confidence.',
    metric: '99.8%',
    metricLabel: 'Accuracy Rate',
    svgKey: 'performance',
    gridSpanClass: 'col-span-12 md:col-span-6 lg:col-span-4',
    highlightColor: 'from-emerald-500/10 to-teal-500/10',
  },
];

