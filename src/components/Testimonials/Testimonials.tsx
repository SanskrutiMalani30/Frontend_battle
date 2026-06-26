'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarLetter: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'VP of Engineering',
    company: 'Stripe Integration Hub',
    content: 'AetherData has completely revolutionized how we orchestrate transactional webhooks. The sub-millisecond pipeline latency means our ledger checks resolve instantly. Highly recommended.',
    avatarLetter: 'S',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    role: 'Lead Infrastructure Architect',
    company: 'Vercel Apps',
    content: 'We migrated our multi-agent pipelines to AetherData in a single afternoon. The developer experience is stellar, the zero-trust VPC isolation works out of the box, and the cost efficiency is noticeable.',
    avatarLetter: 'M',
    rating: 5,
  },
  {
    id: 3,
    name: 'Aiden Chen',
    role: 'Head of Data Operations',
    company: 'Axiom Telemetry',
    content: 'Running predictive models on telemetry feeds used to require complex Spark configurations. With AetherData, we deploy automated forecasting agents in seconds using simple declarative files.',
    avatarLetter: 'A',
    rating: 5,
  },
  {
    id: 4,
    name: 'Elena Rostova',
    role: 'Chief Security Officer',
    company: 'SafeGuard FinTech',
    content: 'Compliance and data residency were major hurdles for our migration to AI cloud products. AetherData’s local KMS integration and AES-256 zero-trust architecture made the approval process seamless.',
    avatarLetter: 'E',
    rating: 5,
  },
  {
    id: 5,
    name: 'Liam Peterson',
    role: 'Founder & CEO',
    company: 'ScribeAI',
    content: 'As an early-stage startup, developer velocity is our lifeblood. By automating our backend scheduling and pipeline routing through AetherData swarms, we saved 35+ engineering hours per week.',
    avatarLetter: 'L',
    rating: 5,
  },
  {
    id: 6,
    name: 'Maya Lin',
    role: 'Principal AI Scientist',
    company: 'NeuralFlow',
    content: 'Deploying production swarms with local KMS integrations used to be a security bottleneck. AetherData solved it instantly, matching security with massive throughput.',
    avatarLetter: 'M',
    rating: 5,
  },
];

const TestimonialsComponent: React.FC = () => {
  const [baseAngle, setBaseAngle] = useState<number>(0);
  const [hoverParallax, setHoverParallax] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const angleRef = useRef<number>(0);
  const targetAngleRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const dragStartAngle = useRef<number>(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  const total = testimonialsData.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleBgMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const px = x / (rect.width / 2);
      const py = y / (rect.height / 2);

      if (glow1Ref.current) {
        glow1Ref.current.style.transform = `translate3d(calc(-50% + ${px * 45}px), calc(-50% + ${py * 45}px), 0)`;
      }
      if (glow2Ref.current) {
        glow2Ref.current.style.transform = `translate3d(${px * -30}px, ${py * -30}px, 0)`;
      }
    };

    section.addEventListener('mousemove', handleBgMouseMove);
    return () => section.removeEventListener('mousemove', handleBgMouseMove);
  }, []);

  // Responsive sizing for 3D Helical parameters
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous 60fps rotation tick with requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      if (targetAngleRef.current !== null) {
        // Easing interpolation (lerp) to target slide angle
        const diff = targetAngleRef.current - angleRef.current;
        if (Math.abs(diff) < 0.05) {
          angleRef.current = targetAngleRef.current;
          targetAngleRef.current = null;
          isDraggingRef.current = false;
        } else {
          angleRef.current += diff * 0.08; // 8% move per frame
        }
        setBaseAngle(angleRef.current);
      } else if (!isDraggingRef.current) {
        // Slow, constant spinning (0.05 degrees per frame)
        angleRef.current = (angleRef.current - 0.06) % 360;
        setBaseAngle(angleRef.current);
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Navigate to specific card using shortest angular distance
  const rotateToCard = useCallback((index: number) => {
    isDraggingRef.current = true; // halt auto-rotation
    const targetAngle = -index * 60; // 60 degrees spacing
    
    // Find closest angular path
    let diff = ((targetAngle - angleRef.current + 180) % 360) - 180;
    if (diff < -180) diff += 360;
    
    targetAngleRef.current = angleRef.current + diff;
  }, []);

  const nextSlide = useCallback(() => {
    const currentIndex = Math.round(-angleRef.current / 60) % total;
    const nextIndex = (currentIndex + 1 + total) % total;
    rotateToCard(nextIndex);
  }, [rotateToCard, total]);

  const prevSlide = useCallback(() => {
    const currentIndex = Math.round(-angleRef.current / 60) % total;
    const prevIndex = (currentIndex - 1 + total) % total;
    rotateToCard(prevIndex);
  }, [rotateToCard, total]);

  // Determine currently focused index for pagination dot rendering
  // (maps the infinite rolling baseAngle back to a 0-5 card index)
  const getActiveCardIndex = () => {
    const rawIndex = Math.round(-baseAngle / 60) % total;
    return (rawIndex + total) % total;
  };

  // --- Interactive Drag & Cursor Parallax Handlers ---

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    targetAngleRef.current = null; // stop any ongoing transition
    startX.current = e.clientX;
    dragStartAngle.current = angleRef.current;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (isDragging) {
      const deltaX = e.clientX - startX.current;
      // Convert drag pixel length to degrees
      const angleOffset = (deltaX / rect.width) * 120;
      angleRef.current = dragStartAngle.current + angleOffset;
      setBaseAngle(angleRef.current);
    } else {
      // Hover Parallax: slight relative twist following the cursor
      const x = e.clientX - rect.left - rect.width / 2;
      const ratio = x / (rect.width / 2);
      setHoverParallax(ratio * 8); // max 8 degrees tilt
    }
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      
      // Determine nearest index to lock into on release
      const nearestIndex = Math.round(-angleRef.current / 60);
      const targetAngle = -nearestIndex * 60;
      targetAngleRef.current = targetAngle;
    }
    setHoverParallax(0);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    targetAngleRef.current = null;
    startX.current = e.touches[0].clientX;
    dragStartAngle.current = angleRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const deltaX = e.touches[0].clientX - startX.current;
    const angleOffset = (deltaX / rect.width) * 120;
    angleRef.current = dragStartAngle.current + angleOffset;
    setBaseAngle(angleRef.current);
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      const nearestIndex = Math.round(-angleRef.current / 60);
      targetAngleRef.current = -nearestIndex * 60;
    }
  };

  // Compute 3D translations
  const getCardStyle = (index: number) => {
    // Current angle is combination of rolling baseAngle + fixed offset + hover tilt
    const angleDegree = index * 60 + baseAngle + hoverParallax;
    const angleRad = (angleDegree * Math.PI) / 180;

    // Adjust parameters dynamically based on screen width
    const radius = isMobile ? 120 : isTablet ? 220 : 340;
    const stepY = isMobile ? 40 : isTablet ? 55 : 65;

    // Cylinder coordinate projection
    const x = Math.sin(angleRad) * radius;
    const z = Math.cos(angleRad) * radius;
    
    // Vertical staircase step remains static for each index card
    const y = (index - 2.5) * stepY;

    // Depth scaling and opacity
    const scale = 0.6 + 0.4 * ((z + radius) / (2 * radius));
    const opacity = z > 0 ? 0.2 + 0.8 * (z / radius) : 0.15;

    // Rotates the card around the Y-axis to follow the cylinder contour
    const rotateY = -angleDegree * 0.45;

    return {
      transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: Math.round(z + radius),
      // Prevent background cards from blocking hover on front cards
      pointerEvents: z > 0 ? ('auto' as const) : ('none' as const),
      // Direct drag is immediate (80ms), release transitions are smooth (600ms)
      transition: isDragging
        ? 'transform 80ms ease-out, opacity 80ms ease'
        : 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease',
    } as React.CSSProperties;
  };

  const activeCardIndex = getActiveCardIndex();

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative py-24 md:py-32 bg-dark-bg overflow-hidden border-t border-white/5"
    >
      {/* Decorative Glows - Moving & Colorful */}
      <div 
        ref={glow1Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[150px] pointer-events-none transition-transform duration-300 ease-out" 
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(34,211,238,0.10) 50%, rgba(0,0,0,0) 100%)',
          willChange: 'transform'
        }}
      />
      <div 
        ref={glow2Ref}
        className="absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full blur-[110px] pointer-events-none transition-transform duration-300 ease-out" 
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(236,72,153,0.12) 60%, rgba(0,0,0,0) 100%)',
          willChange: 'transform'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 inline-block mb-4">
            Customer Validation
          </span>
          <h2
            id="testimonials-title"
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Vetted by <span className="text-gradient-purple">Top-Tier Infrastructure Teams</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
            The staircase rotates continuously. Hover to tilt, or drag left and right to spin the cylinder.
          </p>
        </div>

        {/* 3D Helical Staircase Carousel Wrapper */}
        <div
          className="relative w-full max-w-4xl mx-auto h-[480px] md:h-[540px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Fading Edge Masks */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-dark-bg to-transparent z-30 pointer-events-none hidden md:block" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-dark-bg to-transparent z-30 pointer-events-none hidden md:block" />

          {/* Cards Stack Container */}
          <div className="relative w-full h-full transform-style:preserve-3d">
            {testimonialsData.map((test, index) => {
              const isActive = index === activeCardIndex;
              const cardStyle = getCardStyle(index);

              return (
                <div
                  key={test.id}
                  onClick={() => rotateToCard(index)}
                  style={cardStyle}
                  className={`absolute top-1/2 left-1/2 w-[290px] sm:w-[340px] md:w-[390px] h-[220px] sm:h-[240px] glass-card p-6 md:p-8 rounded-3xl flex flex-col justify-between cursor-pointer border ${
                    isActive
                      ? 'border-purple-500/50 shadow-[0_0_30px_rgba(139,92,246,0.15)] bg-zinc-900/40'
                      : 'border-white/5 bg-zinc-950/40'
                  }`}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`Testimonial from ${test.name}`}
                >
                  <div>
                    {/* Header: Rating & Staircase Step */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: test.rating }).map((_, i) => (
                          <svg
                            key={i}
                            className="w-3.5 h-3.5 text-purple-400 fill-purple-400"
                            viewBox="0 0 24 24"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                        Step 0{test.id}
                      </span>
                    </div>

                    {/* Content Quote */}
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal line-clamp-4 sm:line-clamp-5">
                      &ldquo;{test.content}&rdquo;
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-200 flex items-center justify-center font-bold text-xs">
                      {test.avatarLetter}
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-white leading-tight">
                        {test.name}
                      </span>
                      <span className="block text-[10px] sm:text-xs text-zinc-500 mt-0.5">
                        {test.role}, {test.company}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:-px-8 z-30 pointer-events-none">
            <button
              type="button"
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-white/5 bg-black/60 hover:bg-black/90 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200 focus-ring pointer-events-auto shadow-md"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-white/5 bg-black/60 hover:bg-black/90 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200 focus-ring pointer-events-auto shadow-md"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mb-16 relative z-10">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => rotateToCard(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeCardIndex ? 'w-6 bg-purple-500' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl mx-auto border-t border-white/5 pt-12 relative z-10">
          <div className="glass-card p-6 rounded-2xl text-center">
            <span className="block text-3xl md:text-4xl font-extrabold text-white tracking-tight">40%</span>
            <span className="block text-xs text-zinc-500 uppercase tracking-widest mt-1.5">Engineering Hours Saved</span>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center">
            <span className="block text-3xl md:text-4xl font-extrabold text-white tracking-tight">97%</span>
            <span className="block text-xs text-zinc-500 uppercase tracking-widest mt-1.5">CSAT Satisfaction</span>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center">
            <span className="block text-3xl md:text-4xl font-extrabold text-white tracking-tight">1.2B+</span>
            <span className="block text-xs text-zinc-500 uppercase tracking-widest mt-1.5">Tasks Orchestrated</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Testimonials = React.memo(TestimonialsComponent);
Testimonials.displayName = 'Testimonials';
