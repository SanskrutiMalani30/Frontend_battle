'use client';

import React from 'react';
import { Plan } from '../../data/pricingConfig';
import { PricingText } from './PricingText';

interface PricingCardProps {
  plan: Plan;
}

const PricingCardComponent: React.FC<PricingCardProps> = ({ plan }) => {
  return (
    <div
      className={`glass-card relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
        plan.popular
          ? 'border-purple-500/50 shadow-[0_0_30px_rgba(139,92,246,0.15)] bg-zinc-900/30 md:-translate-y-4 scale-[1.02] md:scale-[1.03]'
          : 'border-white/5'
      }`}
    >
      {/* Popular Tier Badge */}
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full border border-purple-400/30 uppercase tracking-widest shadow-md">
          Most Popular
        </span>
      )}

      {/* Plan Header */}
      <div>
        <div className="mb-6">
          <h3 className="text-xl font-bold tracking-tight text-white mb-2">{plan.name}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{plan.description}</p>
        </div>

        {/* Localized Dynamically Computed Pricing Node */}
        <div className="py-6 border-y border-white/5 mb-8">
          <PricingText basePriceUSD={plan.basePriceUSD} planId={plan.id} />
          {plan.id !== 'enterprise' && (
            <span className="text-zinc-500 text-xs block mt-2">
              Before regional tax and processing tariffs
            </span>
          )}
        </div>

        {/* Feature List */}
        <ul className="flex flex-col gap-4 mb-8" aria-label={`Features for ${plan.name} plan`}>
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
              <svg
                className="w-4 h-4 text-purple-400 mt-1 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <button
        type="button"
        className={`w-full py-4 rounded-xl font-medium text-sm transition-all duration-200 focus-ring ${
          plan.popular
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/30'
            : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
        }`}
      >
        {plan.ctaText}
      </button>
    </div>
  );
};

export const PricingCard = React.memo(PricingCardComponent);
PricingCard.displayName = 'PricingCard';
