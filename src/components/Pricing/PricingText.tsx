'use client';

import React from 'react';
import { usePricing } from '../../context/PricingContext';
import { calculatePrice } from '../../utils/pricingCalculator';

interface PricingTextProps {
  basePriceUSD: number;
  planId: string;
}

export const PricingText: React.FC<PricingTextProps> = ({ basePriceUSD, planId }) => {
  const { currency, billing } = usePricing();

  // If enterprise sales, don't calculate numeric price
  if (planId === 'enterprise') {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Custom
        </span>
        <span className="text-zinc-500 text-xs tracking-wider uppercase font-semibold">
          Tailored Agreements
        </span>
      </div>
    );
  }

  const { formatted } = calculatePrice(basePriceUSD, currency, billing);

  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight transition-all duration-150">
        {formatted}
      </span>
      <span className="text-zinc-400 text-sm font-normal">
        {billing === 'annual' ? '/mo' : '/mo'}
      </span>
    </div>
  );
};
