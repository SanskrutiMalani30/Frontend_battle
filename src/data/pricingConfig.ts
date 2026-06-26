export interface Plan {
  id: string;
  name: string;
  basePriceUSD: number;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

export interface CurrencyConfig {
  code: 'USD' | 'INR' | 'EUR';
  symbol: string;
  multiplier: number;
  regionalTariff: number; // regional purchasing power adjustment
  suffix: string;
}

export interface BillingConfig {
  type: 'monthly' | 'annual';
  discount: number; // e.g. 0.20 for 20% discount
  label: string;
}

export const pricingConfig = {
  currencies: {
    USD: {
      code: 'USD',
      symbol: '$',
      multiplier: 1.0,
      regionalTariff: 1.0,
      suffix: '/mo',
    },
    INR: {
      code: 'INR',
      symbol: '₹',
      multiplier: 83.0,
      regionalTariff: 0.85, // 15% discount for regional purchasing power parity
      suffix: '/mo',
    },
    EUR: {
      code: 'EUR',
      symbol: '€',
      multiplier: 0.92,
      regionalTariff: 1.0,
      suffix: '/mo',
    },
  } as Record<'USD' | 'INR' | 'EUR', CurrencyConfig>,

  billing: {
    monthly: {
      type: 'monthly',
      discount: 0.0,
      label: 'Billed monthly',
    },
    annual: {
      type: 'annual',
      discount: 0.2, // 20% discount
      label: 'Billed annually',
    },
  } as Record<'monthly' | 'annual', BillingConfig>,

  plans: [
    {
      id: 'starter',
      name: 'Starter',
      basePriceUSD: 29,
      description: 'Essential data automation tools for fast-growing startup teams.',
      features: [
        'Up to 10 AI automated workflows',
        'Basic predictive analytics model',
        'Real-time insight stream (5 min latency)',
        '1 Active AI Agent',
        'Standard TLS/SSL encryption security',
        'API access (1,000 requests/day)',
      ],
      ctaText: 'Start Free Trial',
    },
    {
      id: 'professional',
      name: 'Professional',
      basePriceUSD: 99,
      description: 'Advanced features and multi-agent workflows for scaled scaleups.',
      features: [
        'Unlimited AI workflow automations',
        'Multi-model predictive analytics',
        'Instant real-time insights (< 1s latency)',
        '5 Collaborative AI Agents',
        'SOC2 compliant & role-based security',
        'Full API access (100,000 requests/day)',
        'Custom Webhooks & Integrations',
        'Premium 24/7 dedicated support',
      ],
      ctaText: 'Upgrade to Professional',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      basePriceUSD: 499,
      description: 'Full sovereign compliance, dedicated GPU nodes, and custom AI tooling.',
      features: [
        'Dedicated serverless execution nodes',
        'Custom-trained predictive models',
        'Distributed state AI agents',
        'Zero-trust network security (VPC)',
        'SLA guaranteed 99.99% uptime',
        'Unlimited API access with custom rate-limits',
        'Dedicated solution architect support',
        'On-premise deployment options',
      ],
      ctaText: 'Contact Enterprise Sales',
    },
  ] as Plan[],
};
