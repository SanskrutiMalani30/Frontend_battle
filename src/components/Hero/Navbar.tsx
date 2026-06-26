'use client';

import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';

const NavbarComponent: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-black/65 backdrop-blur-md border-white/5 py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between" aria-label="Global navigation">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 focus-ring rounded-lg group" aria-label="AetherData Home">
          {/* Logo SVG */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center border border-purple-400/30 group-hover:scale-105 transition-transform duration-200">
            <svg
              className="w-4.5 h-4.5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span className="text-white font-bold tracking-tight text-lg group-hover:text-purple-300 transition-colors duration-200">
            AetherData
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-zinc-400 hover:text-zinc-200 text-sm font-medium tracking-wide transition-colors duration-150 focus-ring rounded-md px-2 py-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#pricing"
            className="text-theme-sec hover:text-theme-text text-sm font-medium transition-colors duration-150 px-4 py-2 focus-ring rounded-xl"
          >
            Sign In
          </a>
          <a
            href="#pricing"
            className="bg-theme-btn-bg hover:bg-theme-btn-bg/90 text-theme-btn-text text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 focus-ring shadow-lg active:scale-98"
          >
            Start Free
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle main menu"
          className="md:hidden text-zinc-400 hover:text-white focus-ring p-1.5 rounded-lg"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Drawer (with slide-down transition in pure CSS) */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 border-b border-white/5 bg-black/95 backdrop-blur-lg transition-all duration-300 ease-in-out origin-top ${
          mobileMenuOpen
            ? 'scale-y-100 opacity-100 visible pointer-events-auto py-6'
            : 'scale-y-0 opacity-0 invisible pointer-events-none py-0 h-0'
        }`}
      >
        <div className="flex flex-col gap-4 px-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-400 hover:text-white text-base font-medium py-2 border-b border-white/5 transition-colors focus-ring"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center justify-between py-2 border-b border-theme-border mb-2">
              <span className="text-sm font-medium text-theme-sec">Theme Mode</span>
              <ThemeToggle />
            </div>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-theme-sec hover:text-theme-text text-sm font-medium py-3 border border-theme-border rounded-xl focus-ring"
            >
              Sign In
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-theme-btn-bg text-theme-btn-text text-sm font-medium py-3 rounded-xl focus-ring shadow-lg"
            >
              Start Free
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Navbar = React.memo(NavbarComponent);
Navbar.displayName = 'Navbar';
