'use client';

import React, { useState, useEffect, useRef } from 'react';
import { featureData } from '../../data/featureData';
import { useFeature } from '../../context/FeatureContext';
import { FeatureIcon } from './FeatureIcon';

export const Accordion: React.FC = () => {
  const { activeId, setActiveId } = useFeature();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Trigger once
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleToggle = (id: number) => {
    setActiveId(id);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-md mx-auto px-4 flex flex-col gap-4"
    >
      {featureData.map((feature, index) => {
        const isOpen = activeId === feature.id;
        const panelId = `panel-${feature.id}`;
        const headerId = `header-${feature.id}`;

        return (
          <div
            key={feature.id}
            className={`rounded-2xl border transition-all duration-300 ${
              isOpen
                ? 'border-purple-500/40 bg-zinc-900/40 shadow-[0_0_20px_rgba(139,92,246,0.1)]'
                : 'border-white/5 bg-zinc-950/40'
            }`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(25px) scale(0.96)',
              transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms, background-color 300ms',
              transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
            }}
          >
            {/* Accordion Header */}
            <button
              id={headerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => handleToggle(feature.id)}
              className="w-full flex items-center justify-between p-5 text-left focus-ring rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2.5 rounded-xl transition-colors duration-300 ${
                    isOpen ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-zinc-400'
                  }`}
                >
                  <FeatureIcon svgKey={feature.svgKey} variant="mini" className="w-5 h-5" />
                </div>
                <span className="font-medium text-white text-base tracking-tight">{feature.title}</span>
              </div>

              {/* Expand Indicator Chevron */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isOpen ? 'border-purple-400/30 text-purple-300 rotate-180' : 'border-zinc-800 text-zinc-500'
                }`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>

            {/* Accordion Content Drawer (Animate via CSS grid template rows) */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-3 text-sm text-zinc-400 leading-relaxed border-t border-white/5 mt-1">
                  
                  {/* Expanded 3D Illustration for Mobile Accordion */}
                  <div className="w-full h-[150px] flex items-center justify-center mb-5 bg-zinc-900/20 rounded-2xl border border-white/5 p-3 overflow-visible">
                    <FeatureIcon svgKey={feature.svgKey} variant="full" className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]" />
                  </div>

                  <p className="mb-4 text-zinc-300">{feature.description}</p>

                  {/* Accordion Metric Section */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <span className="block text-xs text-zinc-500 uppercase tracking-widest">
                        {feature.metricLabel}
                      </span>
                      <span className="block text-lg font-bold text-white tracking-tight mt-0.5">
                        {feature.metric}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-purple-400 px-2 py-1 rounded-md bg-purple-500/10">
                      Active Metrics
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
