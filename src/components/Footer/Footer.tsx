'use client';

import React, { useState } from 'react';

const FooterComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setErrorMessage('Please provide an email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate network submission
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  };

  const footerLinks = {
    Product: [
      { name: 'Core Engine', href: '#features' },
      { name: 'Swarms Orchestrator', href: '#features' },
      { name: 'Regional Pricing', href: '#pricing' },
      { name: 'Zero-Trust Vault', href: '#features' },
    ],
    Company: [
      { name: 'About', href: '#' },
      { name: 'Security Center', href: '#' },
      { name: 'System Status', href: '#' },
      { name: 'Developer Docs', href: '#' },
    ],
    Legal: [
      { name: 'Privacy Statement', href: '#' },
      { name: 'Terms of Execution', href: '#' },
      { name: 'SLA Agreement', href: '#' },
      { name: 'Compliance Directory', href: '#' },
    ],
  };

  return (
    <footer className="bg-black border-t border-white/5 relative z-20 pt-20 pb-12 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 pb-16 border-b border-white/5">
          {/* Brand Info & Newsletter */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center border border-purple-400/30">
                <svg
                  className="w-4.5 h-4.5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <span className="text-white font-bold tracking-tight text-lg">AetherData</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              Sovereign data automation and LLM telemetry pipelines. SOC2 compliant. Encrypted via AES-256 and locally auditable.
            </p>

            {/* Newsletter Subscription */}
            <div className="flex flex-col gap-3 max-w-sm mt-2">
              <span className="text-zinc-400 text-xs font-semibold uppercase tracking-widest block">
                Subscribe to Operations Digest
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 relative">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white text-sm focus-ring"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all duration-150 focus-ring hover:shadow-lg hover:shadow-purple-900/20 active:scale-98 disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                </button>
              </form>

              {/* Status Feedbacks */}
              {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs mt-1 animate-pulse">
                  <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Subscription confirmed. Welcome!</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-rose-400 text-xs mt-1">
                  <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1 flex flex-col gap-4">
              <span className="text-white text-xs font-semibold uppercase tracking-widest">
                {category}
              </span>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors duration-150 focus-ring rounded"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-zinc-600 text-xs">
            &copy; {new Date().getFullYear()} AetherData Technologies Inc. All rights reserved.
          </span>

          {/* Social Icons (custom SVG paths) */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="X (formerly Twitter)"
              className="w-9 h-9 rounded-xl border border-white/5 hover:border-white/15 bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-white flex items-center justify-center transition-all duration-200 focus-ring"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="w-9 h-9 rounded-xl border border-white/5 hover:border-white/15 bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-white flex items-center justify-center transition-all duration-200 focus-ring"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl border border-white/5 hover:border-white/15 bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-white flex items-center justify-center transition-all duration-200 focus-ring"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer = React.memo(FooterComponent);
Footer.displayName = 'Footer';
