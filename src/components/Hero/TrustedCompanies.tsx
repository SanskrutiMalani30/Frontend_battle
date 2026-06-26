'use client';

import React from 'react';

const TrustedCompaniesComponent: React.FC = () => {
  // Fictional custom SVG logos representing premium clients
  const logos = [
    {
      name: 'Vercel',
      svg: (
        <svg className="h-5 w-auto text-zinc-500 hover:text-zinc-300 transition-colors" viewBox="0 0 116 100" fill="currentColor">
          <path d="M57.5 0L115 100H0L57.5 0Z" />
        </svg>
      ),
    },
    {
      name: 'Supabase',
      svg: (
        <svg className="h-5 w-auto text-zinc-500 hover:text-zinc-300 transition-colors" viewBox="0 0 541 123" fill="currentColor">
          <path d="M540.8 77.2c-.3 1.8-1 3.4-2.1 4.7-1.1 1.3-2.5 2.1-4.2 2.6L242.3 122c-1.8.3-3.6.1-5.3-.6-1.7-.7-3.1-2-4-3.6L122 5.3c-.9-1.8-1.1-3.7-.6-5.5.5-1.8 1.6-3.3 3.1-4.2L416.7.1c1.8-.3 3.6-.1 5.3.6 1.7.7 3.1 2 4 3.6l106.8 113.1c.9 1.7 1.1 3.6.6 5.4l7.4-55.6z" />
          <path d="M0 45.8c.3-1.8 1-3.4 2.1-4.7 1.1-1.3 2.5-2.1 4.2-2.6L298.5 1c1.8-.3 3.6-.1 5.3.6 1.7.7 3.1 2 4 3.6l111.1 113.1c.9 1.8 1.1 3.7.6 5.5-.5 1.8-1.6 3.3-3.1 4.2L124.1 123c-1.8.3-3.6.1-5.3-.6-1.7-.7-3.1-2-4-3.6L4 5.7c-.9-1.7-1.1-3.6-.6-5.4L0 45.8z" opacity="0.8" />
        </svg>
      ),
    },
    {
      name: 'Stripe',
      svg: (
        <svg className="h-5 w-auto text-zinc-500 hover:text-zinc-300 transition-colors" viewBox="0 0 80 34" fill="currentColor">
          <path d="M42.1 17.6c0-5.7-3.3-8.8-8.8-8.8-5.7 0-9.2 3.3-9.2 9 0 6.6 4.1 8.8 9.9 8.8 3.1 0 5.4-.7 6.9-1.5v-4.1c-1.6.8-3.7 1.2-5.7 1.2-3.3 0-5-1.1-5.1-3.4h11.8c.1-.4.2-.8.2-1.2zm-12.8-2.6c.1-2 1.6-3.2 3.8-3.2 2.2 0 3.6 1.2 3.6 3.2H29.3zm29 11.2c2.8 0 4.9-1.4 5.7-2.6v2.1h5.8V9.3h-5.8v2.1c-.8-1.2-2.9-2.6-5.7-2.6-5 0-8.6 4-8.6 8.7 0 4.8 3.6 8.7 8.6 8.7zm2-12.7c3 0 4.8 2.2 4.8 4.7 0 2.6-1.8 4.7-4.8 4.7-3 0-4.8-2.2-4.8-4.7 0-2.5 1.8-4.7 4.8-4.7zM18.8 9.3V2.4h-6v6.9H8.4v4.6h4.4v12.3c0 5.1 3.5 7.6 9 7.6 2 0 3.7-.4 4.7-.9v-4.8c-.8.4-1.8.6-2.9.6-3.1 0-4.8-1.4-4.8-5V13.8h5V9.3h-5zM6.5 9.3c-2-.8-4.3-1.4-6.5-1.7v5.1c1.5.2 3 .5 4.3 1 1.7.6 2.3 1.5 2.3 2.7 0 1.5-1.2 2.3-3.3 2.3-2 0-4.2-.7-5.9-1.7v5.2c1.9.8 4.2 1.3 6.4 1.3 5.4 0 8.7-2.7 8.7-6.9 0-4.5-3.3-6.2-6-7.3z" />
        </svg>
      ),
    },
    {
      name: 'Clerk',
      svg: (
        <svg className="h-5 w-auto text-zinc-500 hover:text-zinc-300 transition-colors" viewBox="0 0 100 24" fill="currentColor">
          <rect width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="9" cy="9" r="3" />
          <text x="26" y="16" fontSize="16" fontWeight="bold" fontFamily="sans-serif">clerk</text>
        </svg>
      ),
    },
    {
      name: 'Linear',
      svg: (
        <svg className="h-5 w-auto text-zinc-500 hover:text-zinc-300 transition-colors" viewBox="0 0 100 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
          <text x="28" y="17" fontSize="15" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">LINEAR</text>
        </svg>
      ),
    },
    {
      name: 'OpenAI',
      svg: (
        <svg className="h-5 w-auto text-zinc-500 hover:text-zinc-300 transition-colors" viewBox="0 0 100 24" fill="currentColor">
          <circle cx="10" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M10 6v12M6 10h12" />
          <text x="24" y="17" fontSize="14" fontWeight="bold" fontFamily="sans-serif">OpenAI</text>
        </svg>
      ),
    },
  ];

  return (
    <section
      aria-label="Trusted partners and clients"
      className="py-12 bg-black border-y border-white/5 relative z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-4 text-center">
        <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          Powering workflow orchestration at leading platforms
        </span>
      </div>

      {/* Infinite scrolling track */}
      <div className="relative flex overflow-x-hidden w-full max-w-6xl mx-auto mask-gradient">
        {/* Left/Right fading edge overlay via custom CSS gradient masks in Tailwind */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Scroll Track List (duplicated for seamless wrap) */}
        <div className="animate-infinite-scroll flex gap-20 items-center py-2">
          {logos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="flex items-center gap-2 shrink-0">
              {logo.svg}
            </div>
          ))}
          {/* Duplicate set for loop wrapping */}
          {logos.map((logo, index) => (
            <div key={`${logo.name}-dup-${index}`} className="flex items-center gap-2 shrink-0">
              {logo.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TrustedCompanies = React.memo(TrustedCompaniesComponent);
TrustedCompanies.displayName = 'TrustedCompanies';
