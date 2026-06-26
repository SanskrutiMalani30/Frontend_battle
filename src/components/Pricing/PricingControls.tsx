'use client';

import React from 'react';
import { usePricing } from '../../context/PricingContext';
import { pricingConfig } from '../../data/pricingConfig';

export const PricingControls: React.FC = () => {
  const { currency, setCurrency, billing, setBilling } = usePricing();

  const currencies = Object.values(pricingConfig.currencies);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 relative z-10">
      {/* Billing Cycle Toggle */}
      <div className="glass-panel p-1 rounded-full flex items-center shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <button
          type="button"
          onClick={() => setBilling('monthly')}
          aria-pressed={billing === 'monthly'}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-ring ${
            billing === 'monthly'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setBilling('annual')}
          aria-pressed={billing === 'annual'}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 focus-ring ${
            billing === 'annual'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>Annual</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-300 font-semibold border border-purple-500/30">
            -20%
          </span>
        </button>
      </div>

      {/* Currency Switcher */}
      <div className="glass-panel p-1 rounded-full flex items-center shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        {currencies.map((curr) => {
          const isActive = currency === curr.code;
          return (
            <button
              key={curr.code}
              type="button"
              onClick={() => setCurrency(curr.code)}
              aria-pressed={isActive}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-ring ${
                isActive
                  ? 'bg-zinc-800 text-white shadow-inner border border-white/5'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="mr-1">{curr.symbol}</span>
              {curr.code}
            </button>
          );
        })}
      </div>
    </div>
  );
};
