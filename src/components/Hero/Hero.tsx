'use client';

import React, { useState, useEffect } from 'react';
import { BrainCanvas } from './BrainCanvas';

const HeroComponent: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    // Staggered loading timers when the user opens the website
    const timers = [
      setTimeout(() => setActiveStage(1), 150),   // Stage 1: Trust Badge
      setTimeout(() => setActiveStage(2), 500),   // Stage 2: Heading
      setTimeout(() => setActiveStage(3), 850),   // Stage 3: Subheading & CTA Buttons
      setTimeout(() => setActiveStage(4), 1250),  // Stage 4: AI Mockup Dashboard
      setTimeout(() => setActiveStage(5), 1650),  // Stage 5: Stats Cards
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction to AetherData"
      className="relative pt-24 pb-16 md:pt-36 md:pb-24 bg-dark-bg overflow-hidden bg-grid-pattern min-h-screen flex items-center"
    >
      {/* Premium Gradient Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/15 blur-[150px] pointer-events-none animate-glow-1" />
      <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-cyan-500/12 blur-[150px] pointer-events-none animate-glow-2" />
      <div className="absolute top-[20%] left-[25%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/8 blur-[130px] pointer-events-none animate-glow-1" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Headline, Copy, CTA & Stats */}
          <div className="col-span-12 lg:col-span-6 flex flex-col items-start text-left z-20">
            
            {/* Trust Badge - Stage 1 */}
            <div 
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 mb-6 shadow-md shadow-black/40 hover:border-purple-500/30 transition-all duration-[1000ms] ease-out hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] ${
                activeStage >= 1 ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-4 blur-[2px]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              <span className="text-xs font-semibold text-purple-300 tracking-wider uppercase">
                AetherData 2.0 Engine is live
              </span>
            </div>

            {/* Main Heading - Stage 2 */}
            <h1 
              className={`text-4xl sm:text-5xl md:text-6.5xl font-extrabold tracking-tight text-white mb-6 leading-[1.08] transition-all duration-[1100ms] cubic-bezier(0.16,1,0.3,1) ${
                activeStage >= 2 ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-5 blur-[3px]'
              }`}
            >
              Automate Operational Data with <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Sovereign Agent Swarms</span>
            </h1>

            {/* Subheading - Stage 3 */}
            <p 
              className={`text-zinc-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl transition-all duration-[1100ms] cubic-bezier(0.16,1,0.3,1) ${
                activeStage >= 3 ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-4 blur-[2px]'
              }`}
            >
              The platform of choice for hyper-growth engineering teams. Deploy, audit, and auto-scale operational pipelines with zero-trust isolation.
            </p>

            {/* CTA Buttons - Stage 3 */}
            <div 
              className={`flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto justify-start transition-all duration-[1100ms] cubic-bezier(0.16,1,0.3,1) ${
                activeStage >= 3 ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-4 blur-[2px]'
              }`}
            >
              <a
                href="#pricing"
                className="w-full sm:w-auto text-center bg-white hover:bg-zinc-200 text-black font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 focus-ring shadow-lg shadow-white/5 active:scale-98 hover:shadow-[0_0_35px_rgba(168,85,247,0.3)]"
              >
                Start Free Trial
              </a>
              <a
                href="#features"
                className="w-full sm:w-auto text-center glass-panel hover:bg-white/5 text-white border border-white/10 hover:border-white/20 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 focus-ring hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]"
              >
                Book Technical Demo
              </a>
            </div>

            {/* Statistics Grid - Stage 5 */}
            <div 
              className={`grid grid-cols-2 gap-4 w-full max-w-lg border-t border-white/5 pt-8 transition-all duration-[1000ms] cubic-bezier(0.16,1,0.3,1) ${
                activeStage >= 5 ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-4 blur-[2px]'
              }`}
            >
              <div className="glass-card p-4 rounded-xl text-left">
                <span className="block text-2xl font-extrabold text-white tracking-tight">99.99%</span>
                <span className="block text-[10px] text-zinc-500 uppercase tracking-widest mt-1">SLA Uptime</span>
              </div>
              <div className="glass-card p-4 rounded-xl text-left">
                <span className="block text-2xl font-extrabold text-white tracking-tight">850M+</span>
                <span className="block text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Daily Events</span>
              </div>
              <div className="glass-card p-4 rounded-xl text-left">
                <span className="block text-2xl font-extrabold text-white tracking-tight font-mono">0.2ms</span>
                <span className="block text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Avg Latency</span>
              </div>
              <div className="glass-card p-4 rounded-xl text-left">
                <span className="block text-2xl font-extrabold text-white tracking-tight">AES-256</span>
                <span className="block text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Encryption</span>
              </div>
            </div>
          </div>

          {/* Right Column: Giant Interactive 3D Brain Canvas Placeholder - Stage 4 */}
          <div 
            id="hero-brain-anchor"
            className={`col-span-12 lg:col-span-6 w-full h-[450px] md:h-[550px] lg:h-[650px] relative flex items-center justify-center overflow-visible z-10 transition-all duration-[1300ms] cubic-bezier(0.16,1,0.3,1) ${
              activeStage >= 4 ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-8 blur-[4px]'
            }`}
          >
            {/* Holographic Glowing Orbit Rings */}
            <div id="brain-hologram-rings" className="absolute w-[80%] h-[80%] max-w-[420px] max-h-[420px] rounded-full border border-purple-500/10 pointer-events-none animate-spin-slow z-0" />
            <div id="brain-hologram-rings-2" className="absolute w-[92%] h-[92%] max-w-[480px] max-h-[480px] rounded-full border border-dashed border-cyan-500/5 pointer-events-none animate-spin-reverse z-0" />
            <div 
              className="absolute w-[60%] h-[60%] max-w-[320px] max-h-[320px] rounded-full opacity-35 filter blur-[40px] pointer-events-none z-0" 
              style={{
                background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(34,211,238,0.06) 60%, rgba(0,0,0,0) 100%)'
              }}
            />

            {/* Three.js Brain Canvas Container - rendered locally ONLY on mobile/tablet viewports */}
            <div className="absolute inset-0 w-full h-full lg:hidden select-none pointer-events-auto">
              <BrainCanvas />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export const Hero = React.memo(HeroComponent);
Hero.displayName = 'Hero';
