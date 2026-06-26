'use client';

import React from 'react';
import { BentoGrid } from './BentoGrid';
import { Accordion } from './Accordion';
import { FeatureProvider } from '../../context/FeatureContext';

const FeaturesSectionComponent: React.FC = () => {
  return (
    <FeatureProvider>
      <section
        id="features"
        aria-labelledby="features-title"
        className="relative py-16 md:py-24 bg-dark-bg overflow-hidden"
      >
        {/* Decorative Blur Backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400 block mb-3">
              FEATURES
            </span>
            <h2
              id="features-title"
              className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
            >
              Built for scale. Designed to move.
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
              Powerful modules that work together seamlessly.
            </p>
          </div>

          {/* Desktop Bento Grid (hidden on mobile, grid layout on md+) */}
          <div className="hidden md:block">
            <BentoGrid />
          </div>

          {/* Mobile Accordion (block on mobile, hidden on md+) */}
          <div className="block md:hidden">
            <Accordion />
          </div>
        </div>
      </section>
    </FeatureProvider>
  );
};

// Memoize FeaturesSection to isolate it from outer pricing state changes
export const FeaturesSection = React.memo(FeaturesSectionComponent);
FeaturesSection.displayName = 'FeaturesSection';
