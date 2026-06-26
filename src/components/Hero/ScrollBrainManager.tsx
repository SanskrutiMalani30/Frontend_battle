'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BrainCanvas } from './BrainCanvas';

export const ScrollBrainManager: React.FC = () => {
  const brainRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    // Stagger loading fade-in delay (syncs with Hero mockup reveal)
    const timer = setTimeout(() => setActiveStage(1), 1250);

    const handleScroll = () => {
      const heroAnchor = document.getElementById('hero-brain-anchor');
      const cardAnchor = document.getElementById('agents-card-anchor');
      if (!heroAnchor || !brainRef.current) return;

      const heroRect = heroAnchor.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Set fixed container size dynamically to match the Hero mockup bounds (prevents sizing jumps)
      brainRef.current.style.width = `${heroRect.width}px`;
      brainRef.current.style.height = `${heroRect.height}px`;

      let easedP = 0;
      let cardCenterX = 0;
      let cardCenterY = 0;
      let targetScale = 1.0;

      const baseHeroScale = 1.5; // Scale up the brain in the Hero section by 50%

      if (cardAnchor) {
        const cardRect = cardAnchor.getBoundingClientRect();

        // Slow scroll transition: starts immediately at scrollY = 0
        // and finishes when the target card top reaches 40% of viewport
        const initialCardTop = cardRect.top + window.scrollY;
        const endPoint = viewportHeight * 0.40;
        const scrollYNeeded = initialCardTop - endPoint;

        let p = 0;
        if (scrollYNeeded > 0) {
          p = Math.min(Math.max(window.scrollY / scrollYNeeded, 0), 1);
        } else {
          p = 0;
        }

        // Smooth Easing curve (easeInOutCubic)
        easedP = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

        cardCenterX = cardRect.left + cardRect.width / 2;
        cardCenterY = cardRect.top + cardRect.height / 2;
        targetScale = (cardRect.width / heroRect.width) * 2.2; // Scale up the docked brain by 120% relative to the card anchor
      }

      // Centers of Hero anchor (shifted down by 165px to clear the navbar)
      const heroCenterX = heroRect.left + heroRect.width / 2;
      const heroCenterY = heroRect.top + heroRect.height / 2 + 165;

      // Interpolate values
      const cx = cardAnchor ? heroCenterX + (cardCenterX - heroCenterX) * easedP : heroCenterX;
      const cy = cardAnchor ? heroCenterY + (cardCenterY - heroCenterY) * easedP : heroCenterY;
      const scale = cardAnchor ? baseHeroScale + (targetScale - baseHeroScale) * easedP : baseHeroScale;
      const rotate = cardAnchor ? easedP * 360 : 0; // Rotate one full turn smoothly during transition

      // Perform transform updates on the GPU for 60fps scrolling
      brainRef.current.style.transform = `translate3d(${cx - heroRect.width / 2}px, ${cy - heroRect.height / 2}px, 0) scale(${scale}) rotate(${rotate}deg)`;

      // Fade out Hero Blurs/Outer Rings as it docks into the grid
      const rings1 = document.getElementById('brain-hologram-rings');
      const rings2 = document.getElementById('brain-hologram-rings-2');
      if (rings1) rings1.style.opacity = `${1 - easedP}`;
      if (rings2) rings2.style.opacity = `${1 - easedP}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial call to set correct positions
    handleScroll();

    // Poll for the first 3 seconds to capture late-hydrating BentoGrid anchors
    const intervalId = setInterval(handleScroll, 100);
    const cleanupTimeout = setTimeout(() => clearInterval(intervalId), 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
      clearTimeout(cleanupTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={brainRef}
      className={`fixed pointer-events-none select-none z-40 transition-opacity duration-1000 ${
        activeStage >= 1 ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: 0,
        top: 0,
        transformOrigin: 'center center',
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
    >
      <BrainCanvas />
    </div>
  );
};
