'use client';

import React, { useState, useEffect, useRef } from 'react';
import { featureData } from '../../data/featureData';
import { useFeature } from '../../context/FeatureContext';
import { FeatureIcon } from './FeatureIcon';

export const BentoGrid: React.FC = () => {
  const { activeId, setActiveId } = useFeature();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Animate once
        }
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // triggers slightly before scrolling fully in
      }
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

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveId(id);
    }
  };

  // Custom 3D perspective transform parameters with staggered entrance animations
  const getCardTransformStyle = (id: number, index: number) => {
    const isHovered = hoveredId === id;
    const isActive = activeId === id;

    // 1. Initial State (pushed down and away in 3D space, rotated)
    if (!isVisible) {
      let tx = 0;
      let ty = 80; // Pushed down
      let tz = -160; // Deep in 3D Z space

      switch (id) {
        case 1: tx = -15; break;
        case 2: tx = 15; break;
        case 3: tx = -25; break;
        case 4: tx = 0; break;
        case 5: tx = 25; break;
        case 6: tx = 0; break;
      }

      return {
        transform: `rotateX(22deg) rotateY(-18deg) rotateZ(4deg) translate3d(${tx}px, ${ty}px, ${tz}px) scale(0.85)`,
        opacity: 0,
        pointerEvents: 'none' as const,
      };
    }

    // 2. Hover State (lifted, flattened, interactive)
    if (isHovered) {
      return {
        transform: 'rotateX(2deg) rotateY(-2deg) rotateZ(0.5deg) translate3d(0px, -8px, 35px) scale(1.02)',
        zIndex: 40,
        opacity: 1,
        transitionDelay: '0ms', // immediate feedback on cursor hover
      };
    }

    // 3. Active State (subtle hover style lift)
    if (isActive) {
      return {
        transform: 'rotateX(3deg) rotateY(-3deg) rotateZ(1deg) translate3d(0px, -4px, 15px) scale(1.01)',
        zIndex: 30,
        opacity: 1,
        transitionDelay: '0ms',
      };
    }

    // 4. Default Staggered 3D Placed State
    let tx = 0;
    let ty = 0;
    let tz = 0;
    let rz = 2;

    switch (id) {
      case 1: // Agents (top left)
        ty = -10; tx = -6; tz = 6; rz = 2.5;
        break;
      case 2: // Analytics (top right)
        ty = -16; tx = 10; tz = 3; rz = 1.0;
        break;
      case 3: // Automation (middle left)
        ty = 6; tx = -12; tz = 0; rz = 2.5;
        break;
      case 4: // Security (middle center)
        ty = -3; tx = 0; tz = 10; rz = 1.5;
        break;
      case 5: // Integration (middle right)
        ty = 10; tx = 12; tz = -3; rz = 1.0;
        break;
      case 6: // Performance (bottom right)
        ty = 18; tx = 0; tz = 12; rz = 1.5;
        break;
    }

    return {
      transform: `rotateX(8deg) rotateY(-8deg) rotateZ(${rz}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`,
      zIndex: 10 + id,
      opacity: 1,
      transitionDelay: `${index * 100}ms`, // Stagger delay on entrance
    };
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-6.5xl mx-auto py-8 px-4 md:px-8 overflow-visible animate-container"
      style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
    >
      {/* 3D Floating Background Spheres - fade in slightly delayed */}
      <div 
        className={`absolute top-[-25px] left-[8%] w-12 h-12 rounded-full pointer-events-none float-animation transition-opacity duration-[1500ms] ${
          isVisible ? 'opacity-60' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, rgba(139,92,246,0.1) 40%, rgba(9,9,11,0.8) 100%)',
          boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.1), 0 8px 20px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(2px)',
          animationDelay: '0s',
          transitionDelay: '600ms'
        }}
      />
      <div 
        className={`absolute top-[35%] right-[4%] w-16 h-16 rounded-full pointer-events-none float-animation transition-opacity duration-[1500ms] ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.1) 0%, rgba(34,211,238,0.08) 50%, rgba(9,9,11,0.9) 100%)',
          boxShadow: 'inset 0 5px 12px rgba(255,255,255,0.08), 0 10px 25px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(3px)',
          animationDelay: '1.5s',
          transitionDelay: '700ms'
        }}
      />
      <div 
        className={`absolute bottom-[25%] left-[2%] w-14 h-14 rounded-full pointer-events-none float-animation transition-opacity duration-[1500ms] ${
          isVisible ? 'opacity-55' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12) 0%, rgba(236,72,153,0.08) 45%, rgba(9,9,11,0.8) 100%)',
          boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.1), 0 10px 22px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(2px)',
          animationDelay: '0.7s',
          transitionDelay: '800ms'
        }}
      />
      <div 
        className={`absolute bottom-[-10px] right-[28%] w-10 h-10 rounded-full pointer-events-none float-animation transition-opacity duration-[1500ms] ${
          isVisible ? 'opacity-60' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, rgba(168,85,247,0.12) 40%, rgba(9,9,11,0.8) 100%)',
          boxShadow: 'inset 0 3px 8px rgba(255,255,255,0.12), 0 6px 15px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(2px)',
          animationDelay: '2.2s',
          transitionDelay: '900ms'
        }}
      />

      {/* Grid Container - tightened gap */}
      <div 
        className="grid grid-cols-12 gap-5 w-full relative z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {featureData.map((feature, index) => {
          const isActive = activeId === feature.id;

          return (
            <div
              key={feature.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveId(feature.id)}
              onMouseEnter={() => {
                setActiveId(feature.id);
                setHoveredId(feature.id);
              }}
              onMouseLeave={() => setHoveredId(null)}
              onKeyDown={(e) => handleKeyDown(e, feature.id)}
              aria-pressed={isActive}
              aria-label={`${feature.title} details`}
              className={`glass-card group relative p-6 md:p-8 rounded-[28px] flex flex-col justify-between cursor-pointer focus-ring focusable transition-[transform,opacity,border-color,box-shadow] duration-[1000ms] cubic-bezier(0.16,1,0.3,1) border border-white/5 bg-zinc-950/40 backdrop-blur-md ${feature.gridSpanClass} ${
                isActive ? 'border-purple-500/30 shadow-[0_0_30px_rgba(139,92,246,0.1)] bg-zinc-900/20' : ''
              }`}
              style={{
                ...getCardTransformStyle(feature.id, index),
                transformStyle: 'preserve-3d',
                boxShadow: isActive 
                  ? '0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.1), 0 0 20px rgba(168,85,247,0.12)'
                  : '0 10px 25px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255,255,255,0.05)'
              }}
            >
              {/* Card Ambient Highlight Glow on Active/Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.highlightColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[28px]`}
              />

              {/* Reflection sheen highlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none rounded-[28px]" />

              {/* Bento Card Layout Structure - gap-4 and w-full */}
              <div 
                className="flex flex-col md:flex-row items-center justify-between h-full gap-5 w-full"
                style={{ transform: 'translateZ(10px)' }}
              >
                {/* Left Column: Text & Navigation - reduced typography sizes */}
                <div 
                  className="flex flex-col justify-between h-full w-full md:w-[48%]"
                >
                  <div className="flex flex-col align-left">
                    {/* Number label in Mono Purple */}
                    <span className="font-mono text-xs md:text-sm font-bold text-purple-400/90 tracking-wider mb-1">
                      {feature.number}
                    </span>
                    
                    {/* Feature Title */}
                    <h3 className="text-lg md:text-2xl font-semibold tracking-tight text-white group-hover:text-purple-300 transition-colors duration-300 mb-2">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                  </div>

                  {/* Circular Navigation Arrow */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 mt-auto ${
                      isActive 
                        ? 'border-purple-400 bg-purple-400/10 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
                        : 'border-zinc-800 text-zinc-500 group-hover:border-zinc-600 group-hover:text-zinc-300'
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? 'translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>

                {/* Right Column: Custom 3D-styled SVGs - reduced container heights */}
                <div 
                  className="flex items-center justify-center relative overflow-visible w-full md:w-[52%] h-[130px] md:h-[160px]"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {feature.id === 1 ? (
                    <>
                      {/* Desktop anchor for ScrollBrainManager */}
                      <div id="agents-card-anchor" className="hidden lg:block w-full h-full" />
                      {/* Mobile fallback illustration */}
                      <div className="lg:hidden w-full h-full flex items-center justify-center">
                        <FeatureIcon 
                          svgKey={feature.svgKey} 
                          className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1" 
                        />
                      </div>
                    </>
                  ) : (
                    <FeatureIcon 
                      svgKey={feature.svgKey} 
                      className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1" 
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Embedded CSS for custom keyframe animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(3deg);
          }
        }
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
