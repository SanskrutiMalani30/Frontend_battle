'use client';

import React, { useRef, useEffect } from 'react';
import { PricingProvider } from '../../context/PricingContext';
import { PricingControls } from './PricingControls';
import { PricingCard } from './PricingCard';
import { pricingConfig } from '../../data/pricingConfig';

const PricingSectionComponent: React.FC = () => {
  const { plans } = pricingConfig;
  const sectionRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Normalized coordinates [-1, 1]
      const px = x / (rect.width / 2);
      const py = y / (rect.height / 2);

      if (glow1Ref.current) {
        glow1Ref.current.style.transform = `translate3d(${px * 40}px, ${py * 40}px, 0)`;
      }
      if (glow2Ref.current) {
        glow2Ref.current.style.transform = `translate3d(${px * -30}px, ${py * -30}px, 0)`;
      }
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative py-24 md:py-32 bg-dark-bg overflow-hidden"
    >
      {/* Decorative Glowing Shapes - Moving & Colorful */}
      <div 
        ref={glow1Ref}
        className="absolute top-1/4 right-1/5 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-transform duration-300 ease-out" 
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(236,72,153,0.06) 60%, rgba(0,0,0,0) 100%)',
          willChange: 'transform'
        }}
      />
      <div 
        ref={glow2Ref}
        className="absolute bottom-1/4 left-1/5 w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none transition-transform duration-300 ease-out" 
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(34,211,238,0.06) 60%, rgba(0,0,0,0) 100%)',
          willChange: 'transform'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 inline-block mb-4">
            Flexible Licensing
          </span>
          <h2
            id="pricing-title"
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Transparent, <span className="text-gradient-purple">Value-Driven Pricing</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Choose the operational scale that matches your business. Every plan includes dynamic currency adjustments and regional tariff protection.
          </p>
        </div>

        {/* Pricing Provider bounds the localized state updates */}
        <PricingProvider>
          {/* Controls to Switch Currency and Billing Terms */}
          <PricingControls />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </PricingProvider>
      </div>
    </section>
  );
};

export const PricingSection = React.memo(PricingSectionComponent);
PricingSection.displayName = 'PricingSection';
