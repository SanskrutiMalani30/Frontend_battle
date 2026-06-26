import React from 'react';

interface FeatureIconProps {
  svgKey: string;
  className?: string;
  variant?: 'mini' | 'full';
}

export const FeatureIcon: React.FC<FeatureIconProps> = ({ svgKey, className = "w-full h-full", variant = "full" }) => {
  // Mini outline icons for small spaces (like accordion headers)
  if (variant === 'mini') {
    switch (svgKey) {
      case 'agents':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 19.5 12 24 2 19.5 2 8.5" />
            <path d="M12 22v-8M12 14L4 9.5M12 14l8-4.5" />
            <circle cx="12" cy="14" r="2.5" className="fill-indigo-500/80 stroke-indigo-400" />
          </svg>
        );
      case 'analytics':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M18.7 8l-5.1 5.2-2.8-2.7-4.8 4.8" stroke="currentColor" strokeWidth="2" />
            <circle cx="18.7" cy="8" r="2" className="fill-purple-500/80 stroke-purple-400" />
          </svg>
        );
      case 'automation':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v8M12 14v8M5 12h14" />
            <circle cx="12" cy="2" r="1.5" className="fill-purple-400 stroke-purple-400" />
            <circle cx="12" cy="12" r="3" className="stroke-indigo-400" />
            <circle cx="12" cy="22" r="1.5" className="fill-purple-400 stroke-purple-400" />
          </svg>
        );
      case 'security':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="11" r="3" />
          </svg>
        );
      case 'integration':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18M3 9h18" />
            <circle cx="6" cy="6" r="1" className="fill-cyan-400 stroke-cyan-400" />
            <circle cx="15" cy="15" r="1.5" className="fill-sky-400 stroke-sky-400" />
          </svg>
        );
      case 'performance':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 10s3-2 5-2 5 4 5 4 3 2 5 2 5-4 5-4" />
            <circle cx="7" cy="8" r="2" className="fill-emerald-400 stroke-emerald-300" />
            <circle cx="17" cy="14" r="2" className="fill-teal-400 stroke-teal-300" />
          </svg>
        );
      default:
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
    }
  }
  // Shared Glow and Gradient Definitions
  const renderDefs = (idPrefix: string) => (
    <defs>
      {/* Glow Filter */}
      <filter id={`${idPrefix}-glow`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={`${idPrefix}-intense-glow`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="12" result="blur" />
        <feComponentTransfer in="blur" result="boost">
          <feFuncA type="linear" slope="1.5" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="boost" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Isometric Shading Gradients */}
      {/* Cyan/Purple Theme (Agents) */}
      <linearGradient id="agents-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#c084fc" />
      </linearGradient>
      <linearGradient id="agents-accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="agents-base-glow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
      </linearGradient>
      
      {/* Glass Cube Face Gradients */}
      <linearGradient id="glass-face-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="glass-face-left" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#312e81" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="glass-face-right" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#c084fc" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#581c87" stopOpacity="0.05" />
      </linearGradient>

      {/* Small Cube Gradients */}
      <linearGradient id="small-cube-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient id="small-cube-left" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient id="small-cube-right" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
      </linearGradient>

      {/* Blue/Indigo Theme (Analytics) */}
      <linearGradient id="analytics-base-glow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="analytics-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="50%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#f472b6" />
      </linearGradient>
      <linearGradient id="analytics-pillar-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient id="analytics-pillar-left" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="analytics-pillar-right" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.05" />
      </linearGradient>
      <radialGradient id="sphere-glow" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#93c5fd" />
        <stop offset="100%" stopColor="#1e40af" />
      </radialGradient>

      {/* Purple Theme (Automation) */}
      <linearGradient id="auto-base-glow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="auto-pulse-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#818cf8" />
      </linearGradient>
      <linearGradient id="auto-node-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#18181b" />
        <stop offset="100%" stopColor="#27272a" />
      </linearGradient>
      <linearGradient id="auto-node-side-left" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#581c87" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="auto-node-side-right" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#c084fc" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#6b21a8" stopOpacity="0.1" />
      </linearGradient>

      {/* Red/Rose Theme (Security) */}
      <linearGradient id="security-base-glow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="security-shield-left" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e1b4b" />
        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.15" />
      </linearGradient>
      <linearGradient id="security-shield-right" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#312e81" />
        <stop offset="100%" stopColor="#fda4af" stopOpacity="0.15" />
      </linearGradient>
      <linearGradient id="security-rim-left" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#be123c" />
      </linearGradient>
      <linearGradient id="security-rim-right" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fda4af" />
        <stop offset="100%" stopColor="#e11d48" />
      </linearGradient>
      <linearGradient id="security-ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0" />
        <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
      </linearGradient>

      {/* Cyan/Blue Theme (Integration) */}
      <linearGradient id="integ-base-glow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="integ-tube" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
      </linearGradient>
      <radialGradient id="integ-core" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#e0f7fa" />
        <stop offset="40%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#0891b2" />
      </radialGradient>

      {/* Emerald/Cyan Theme (Performance Ribbon) */}
      <linearGradient id="perf-base-glow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="perf-ribbon-1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#059669" stopOpacity="0.7" />
        <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7" />
      </linearGradient>
      <linearGradient id="perf-ribbon-2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#34d399" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.6" />
      </linearGradient>
      <radialGradient id="perf-sphere-1" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#a7f3d0" />
        <stop offset="100%" stopColor="#047857" />
      </radialGradient>
      <radialGradient id="perf-sphere-2" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#93c5fd" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </radialGradient>
      <radialGradient id="perf-sphere-3" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#ddd6fe" />
        <stop offset="100%" stopColor="#6d28d9" />
      </radialGradient>
    </defs>
  );

  switch (svgKey) {
    case 'agents':
      return (
        <svg
          className={className}
          viewBox="0 0 300 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {renderDefs('agents')}
          
          {/* Base Platform Glow */}
          <ellipse cx="150" cy="185" rx="80" ry="24" fill="url(#agents-base-glow)" />
          <ellipse cx="150" cy="185" rx="65" ry="18" fill="none" stroke="url(#agents-primary-grad)" strokeWidth="1.5" opacity="0.4" />
          <ellipse cx="150" cy="185" rx="45" ry="12" fill="none" stroke="url(#agents-accent-grad)" strokeWidth="2" opacity="0.8" />
          
          {/* Center Column Base */}
          <path d="M125 180 C125 170 175 170 175 180 L175 190 C175 198 125 198 125 190 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          <ellipse cx="150" cy="180" rx="25" ry="7" fill="#27272a" stroke="#52525b" strokeWidth="1" />

          {/* Dotted Wireframe Network lines */}
          <path d="M150 135 L105 85 M150 135 L195 85 M150 135 L150 65 M105 85 L150 65 M195 85 L150 65" stroke="url(#agents-primary-grad)" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.6" />
          
          {/* Main Glass Isometric Cube (Centered at cx=150, cy=135, size=40) */}
          {/* Cube Left Face */}
          <polygon points="115,115 150,135 150,175 115,155" fill="url(#glass-face-left)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
          {/* Cube Right Face */}
          <polygon points="150,135 185,115 185,155 150,175" fill="url(#glass-face-right)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
          {/* Cube Top Face */}
          <polygon points="150,95 185,115 150,135 115,115" fill="url(#glass-face-top)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />

          {/* Inner Glowing Core */}
          <circle cx="150" cy="135" r="14" fill="url(#agents-accent-grad)" filter="url(#agents-glow)" opacity="0.85" className="animate-pulse" />

          {/* Small Floating Isometric Cubes */}
          {/* Floating Cube 1 (Left, cx=105, cy=85, size=18) */}
          <polygon points="90,75 105,84 105,102 90,93" fill="url(#small-cube-left)" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="0.5" />
          <polygon points="105,84 120,75 120,93 105,102" fill="url(#small-cube-right)" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="0.5" />
          <polygon points="105,66 120,75 105,84 90,75" fill="url(#small-cube-top)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5" />

          {/* Floating Cube 2 (Right, cx=195, cy=85, size=18) */}
          <polygon points="180,75 195,84 195,102 180,93" fill="url(#small-cube-left)" stroke="rgba(192, 132, 252, 0.3)" strokeWidth="0.5" />
          <polygon points="195,84 210,75 210,93 195,102" fill="url(#small-cube-right)" stroke="rgba(192, 132, 252, 0.3)" strokeWidth="0.5" />
          <polygon points="195,66 210,75 195,84 180,75" fill="url(#small-cube-top)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5" />

          {/* Floating Cube 3 (Top-Center, cx=150, cy=55, size=20) */}
          <polygon points="133,45 150,55 150,75 133,65" fill="url(#glass-face-left)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
          <polygon points="150,55 167,45 167,65 150,75" fill="url(#glass-face-right)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
          <polygon points="150,35 167,45 150,55 133,45" fill="url(#glass-face-top)" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.5" />
          <circle cx="150" cy="55" r="5" fill="#c084fc" filter="url(#agents-glow)" opacity="0.7" />

          {/* Floating Particles/Spheres (Depth layers) */}
          <circle cx="65" cy="130" r="6" fill="url(#sphere-glow)" opacity="0.3" filter="url(#agents-glow)" />
          <circle cx="235" cy="120" r="5" fill="url(#sphere-glow)" opacity="0.4" />
          <circle cx="90" cy="180" r="3" fill="#22d3ee" opacity="0.6" />
          <circle cx="210" cy="170" r="4" fill="#a855f7" opacity="0.5" />
          <circle cx="120" cy="50" r="2.5" fill="#ffffff" opacity="0.8" />
        </svg>
      );

    case 'analytics':
      return (
        <svg
          className={className}
          viewBox="0 0 300 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {renderDefs('analytics')}

          {/* Base Platform Glow */}
          <ellipse cx="150" cy="195" rx="90" ry="24" fill="url(#analytics-base-glow)" />
          <ellipse cx="150" cy="195" rx="75" ry="18" fill="none" stroke="#2563eb" strokeWidth="1" opacity="0.3" />

          {/* 3D Glass Bar Columns */}
          {/* Column 1 (Far Left, cx=95, cy=180, h=45) */}
          <polygon points="85,130 97,136 97,175 85,169" fill="url(#analytics-pillar-left)" stroke="rgba(255,255,255,0.1)" />
          <polygon points="97,136 109,130 109,169 97,175" fill="url(#analytics-pillar-right)" stroke="rgba(255,255,255,0.1)" />
          <polygon points="97,124 109,130 97,136 85,130" fill="url(#analytics-pillar-top)" stroke="rgba(255,255,255,0.2)" />

          {/* Column 2 (Middle Left, cx=130, cy=185, h=75) */}
          <polygon points="120,105 132,111 132,175 120,169" fill="url(#analytics-pillar-left)" stroke="rgba(255,255,255,0.1)" />
          <polygon points="132,111 144,105 144,169 132,175" fill="url(#analytics-pillar-right)" stroke="rgba(255,255,255,0.1)" />
          <polygon points="132,99 144,105 132,111 120,105" fill="url(#analytics-pillar-top)" stroke="rgba(255,255,255,0.2)" />

          {/* Column 3 (Middle Right, cx=165, cy=190, h=105) */}
          <polygon points="155,80 167,86 167,175 155,169" fill="url(#analytics-pillar-left)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <polygon points="167,86 179,80 179,169 167,175" fill="url(#analytics-pillar-right)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <polygon points="167,74 179,80 167,86 155,80" fill="url(#analytics-pillar-top)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

          {/* Column 4 (Far Right, cx=200, cy=195, h=135) */}
          <polygon points="190,55 202,61 202,175 190,169" fill="url(#analytics-pillar-left)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <polygon points="202,61 214,55 214,169 202,175" fill="url(#analytics-pillar-right)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <polygon points="202,49 214,55 202,61 190,55" fill="url(#analytics-pillar-top)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />

          {/* Glowing 3D Line Chart Floating Over Bars */}
          <path
            d="M 75,150 C 97,110 110,120 132,80 C 150,55 167,90 202,45 L 225,25"
            stroke="url(#analytics-line-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            filter="url(#agents-glow)"
          />

          {/* Glowing Spheres along the line chart */}
          <circle cx="97" cy="120" r="5" fill="url(#sphere-glow)" filter="url(#agents-glow)" />
          <circle cx="132" cy="80" r="6" fill="url(#sphere-glow)" filter="url(#agents-glow)" />
          <circle cx="202" cy="45" r="7" fill="url(#sphere-glow)" filter="url(#agents-glow)" />

          {/* Background Grid Accent */}
          <path d="M 80,180 L 220,145 M 80,165 L 220,130" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          
          {/* Subtle Ambient Orbs */}
          <circle cx="240" cy="80" r="4" fill="#f472b6" opacity="0.6" filter="url(#agents-glow)" />
          <circle cx="60" cy="110" r="3.5" fill="#60a5fa" opacity="0.4" />
        </svg>
      );

    case 'automation':
      return (
        <svg
          className={className}
          viewBox="0 0 300 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {renderDefs('automation')}

          {/* Base Glow */}
          <ellipse cx="150" cy="180" rx="90" ry="24" fill="url(#auto-base-glow)" />

          {/* Connection Lines (Tubes) with moving pulses */}
          <g opacity="0.85">
            {/* Tube 1: Node 1 to 2 */}
            <path d="M 100,80 Q 95,125 125,145" stroke="#3f3f46" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 100,80 Q 95,125 125,145" stroke="url(#auto-pulse-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="8 20">
              <animate attributeName="strokeDashoffset" values="28;0" dur="2s" repeatCount="indefinite" />
            </path>

            {/* Tube 2: Node 1 to 3 */}
            <path d="M 100,80 Q 155,75 200,95" stroke="#3f3f46" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 100,80 Q 155,75 200,95" stroke="url(#auto-pulse-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="10 25">
              <animate attributeName="strokeDashoffset" values="35;0" dur="1.6s" repeatCount="indefinite" />
            </path>

            {/* Tube 3: Node 2 to 4 */}
            <path d="M 125,145 Q 145,175 180,185" stroke="#3f3f46" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 125,145 Q 145,175 180,185" stroke="url(#auto-pulse-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="6 18">
              <animate attributeName="strokeDashoffset" values="24;0" dur="1.8s" repeatCount="indefinite" />
            </path>

            {/* Tube 4: Node 3 to 4 */}
            <path d="M 200,95 Q 215,145 180,185" stroke="#3f3f46" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 200,95 Q 215,145 180,185" stroke="url(#auto-pulse-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="10 20">
              <animate attributeName="strokeDashoffset" values="30;0" dur="1.4s" repeatCount="indefinite" />
            </path>
          </g>

          {/* 3D Flow Nodes (Isometric Plates) */}
          {/* Node 1 (Top Left: cx=100, cy=80) */}
          <g transform="translate(0, 0)">
            <polygon points="100,74 116,82 116,87 100,79" fill="url(#auto-node-side-left)" />
            <polygon points="116,82 132,74 132,79 116,87" fill="url(#auto-node-side-right)" />
            <polygon points="116,70 132,74 116,82 100,74" fill="url(#auto-node-top)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <circle cx="116" cy="76" r="3.5" fill="#a855f7" filter="url(#agents-glow)" />
          </g>

          {/* Node 2 (Middle Left: cx=125, cy=145) */}
          <g transform="translate(0, 0)">
            <polygon points="125,139 141,147 141,152 125,144" fill="url(#auto-node-side-left)" />
            <polygon points="141,147 157,139 157,144 141,152" fill="url(#auto-node-side-right)" />
            <polygon points="141,135 157,139 141,147 125,139" fill="url(#auto-node-top)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <circle cx="141" cy="141" r="3.5" fill="#818cf8" filter="url(#agents-glow)" />
          </g>

          {/* Node 3 (Middle Right: cx=200, cy=95) */}
          <g transform="translate(0, 0)">
            <polygon points="200,89 216,97 216,102 200,94" fill="url(#auto-node-side-left)" />
            <polygon points="216,97 232,89 232,94 216,102" fill="url(#auto-node-side-right)" />
            <polygon points="216,85 232,89 216,97 200,89" fill="url(#auto-node-top)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <circle cx="216" cy="91" r="3.5" fill="#c084fc" filter="url(#agents-glow)" />
          </g>

          {/* Node 4 (Bottom Center: cx=180, cy=185) */}
          <g transform="translate(0, 0)">
            <polygon points="180,179 196,187 196,192 180,184" fill="url(#auto-node-side-left)" />
            <polygon points="196,187 212,179 212,184 196,192" fill="url(#auto-node-side-right)" />
            <polygon points="196,175 212,179 196,187 180,179" fill="url(#auto-node-top)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <circle cx="196" cy="181" r="3.5" fill="#ec4899" filter="url(#agents-glow)" />
          </g>

          {/* Ambient Particles */}
          <circle cx="70" cy="100" r="3" fill="#c084fc" opacity="0.4" />
          <circle cx="230" cy="150" r="4.5" fill="#818cf8" opacity="0.5" filter="url(#agents-glow)" />
          <circle cx="150" cy="100" r="2" fill="#ffffff" opacity="0.6" />
        </svg>
      );

    case 'security':
      return (
        <svg
          className={className}
          viewBox="0 0 300 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {renderDefs('security')}

          {/* Base Glow */}
          <ellipse cx="150" cy="195" rx="80" ry="22" fill="url(#security-base-glow)" />
          <ellipse cx="150" cy="195" rx="60" ry="15" fill="none" stroke="#f43f5e" strokeWidth="1" opacity="0.3" />

          {/* Center Platform Pedestal */}
          <ellipse cx="150" cy="180" rx="35" ry="9" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          <path d="M 115,180 C 115,173 185,173 185,180 L 185,188 C 185,193 115,193 115,188 Z" fill="#18181b" stroke="#27272a" strokeWidth="1" />

          {/* Orbiting Security Ring (Back side) */}
          <path d="M 85,120 A 70 20 0 0 1 215,120" stroke="url(#security-ring-grad)" strokeWidth="1.5" fill="none" transform="rotate(-15 150 120)" strokeDasharray="4 8" />

          {/* 3D Angled Shield */}
          <g filter="url(#agents-glow)">
            {/* Left Body Shield */}
            <path d="M 150,60 C 130,62 118,65 115,70 C 107,98 111,130 150,165 Z" fill="url(#security-shield-left)" />
            {/* Right Body Shield */}
            <path d="M 150,60 C 170,62 182,65 185,70 C 193,98 189,130 150,165 Z" fill="url(#security-shield-right)" />

            {/* Left Outer Rim */}
            <path d="M 150,60 C 130,62 118,65 115,70 C 107,98 111,130 150,165 C 146,155 120,123 125,75 C 127,72 135,70 150,68 Z" fill="url(#security-rim-left)" />
            {/* Right Outer Rim */}
            <path d="M 150,60 C 170,62 182,65 185,70 C 193,98 189,130 150,165 C 154,155 180,123 175,75 C 173,72 165,70 150,68 Z" fill="url(#security-rim-right)" />
          </g>

          {/* Center Shield Emblem (Glowing Checkmark/Lock Accent) */}
          <path
            d="M 140,110 L 147,117 L 162,102"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#security-intense-glow)"
          />

          {/* Orbiting Security Ring (Front side) */}
          <path d="M 215,120 A 70 20 0 0 1 85,120" stroke="url(#security-ring-grad)" strokeWidth="2.5" fill="none" transform="rotate(-15 150 120)" />

          {/* Floating Security Particles */}
          <circle cx="75" cy="80" r="3.5" fill="#fda4af" opacity="0.6" />
          <circle cx="225" cy="150" r="4.5" fill="#f43f5e" opacity="0.5" filter="url(#agents-glow)" />
          <circle cx="105" cy="150" r="2.5" fill="#ffffff" opacity="0.8" />
        </svg>
      );

    case 'integration':
      return (
        <svg
          className={className}
          viewBox="0 0 300 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {renderDefs('integration')}

          {/* Base Platform Glow */}
          <ellipse cx="150" cy="185" rx="80" ry="24" fill="url(#integ-base-glow)" />

          {/* 3D Glass Connection Tube */}
          <path
            d="M 105,142 C 120,165 180,110 195,100"
            stroke="url(#integ-tube)"
            strokeWidth="6.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 105,142 C 120,165 180,110 195,100"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* Moving Pulse inside Connection Tube */}
          <circle cx="0" cy="0" r="4" fill="#22d3ee" filter="url(#agents-glow)">
            <animateMotion
              path="M 105,142 C 120,165 180,110 195,100"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Target Module Cube (Left, cx=95, cy=145, size=24) */}
          <g>
            <polygon points="75,133 95,145 95,169 75,157" fill="url(#glass-face-left)" stroke="rgba(255,255,255,0.15)" />
            <polygon points="95,145 115,133 115,157 95,169" fill="url(#glass-face-right)" stroke="rgba(255,255,255,0.15)" />
            <polygon points="95,121 115,133 95,145 75,133" fill="url(#glass-face-top)" stroke="rgba(255,255,255,0.25)" />
            <circle cx="95" cy="145" r="7.5" fill="url(#integ-core)" filter="url(#agents-glow)" />
          </g>

          {/* Core Hub Module Cube (Right, cx=205, cy=95, size=35) */}
          <g>
            {/* Base block shadows */}
            <polygon points="175,77 205,95 205,129 175,111" fill="url(#glass-face-left)" stroke="rgba(255,255,255,0.2)" />
            <polygon points="205,95 235,77 235,111 205,129" fill="url(#glass-face-right)" stroke="rgba(255,255,255,0.2)" />
            <polygon points="205,59 235,77 205,95 175,77" fill="url(#glass-face-top)" stroke="rgba(255,255,255,0.3)" />
            
            {/* Glowing internal sphere */}
            <circle cx="205" cy="95" r="12" fill="url(#agents-primary-grad)" filter="url(#agents-glow)" opacity="0.8" className="animate-pulse" />
          </g>

          {/* Supporting Connective Details */}
          <ellipse cx="205" cy="140" rx="18" ry="5" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
          <line x1="205" y1="129" x2="205" y2="140" stroke="#22d3ee" strokeWidth="1.5" opacity="0.5" strokeDasharray="2 3" />

          {/* Floating Spheres */}
          <circle cx="65" cy="100" r="4.5" fill="#818cf8" opacity="0.6" filter="url(#agents-glow)" />
          <circle cx="230" cy="140" r="3.5" fill="#06b6d4" opacity="0.5" />
          <circle cx="150" cy="80" r="2.5" fill="#ffffff" opacity="0.7" />
        </svg>
      );

    case 'performance':
      return (
        <svg
          className={className}
          viewBox="0 0 600 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {renderDefs('performance')}

          {/* Background Grid Floor (fading perspective lines) */}
          <g opacity="0.1">
            <path d="M 50,180 L 550,180 M 75,195 L 525,195 M 100,210 L 500,210" stroke="#ffffff" strokeWidth="1" />
            <path d="M 300,120 L 50,220 M 300,120 L 150,220 M 300,120 L 300,220 M 300,120 L 450,220 M 300,120 L 550,220" stroke="#ffffff" strokeWidth="1" />
          </g>

          {/* Base Glow */}
          <ellipse cx="300" cy="190" rx="220" ry="40" fill="url(#perf-base-glow)" />

          {/* 3D Sine Wave Ribbons (Overlapping paths) */}
          {/* Ribbon 1 (Back, Purple/Cyan) */}
          <path
            d="M 80,135 C 180,35 240,215 340,125 C 410,65 470,195 520,105"
            stroke="url(#perf-ribbon-1)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            filter="url(#agents-glow)"
          />

          {/* Ribbon 2 (Front, Emerald/Teal) */}
          <path
            d="M 80,115 C 160,205 260,25 320,145 C 380,245 460,75 520,125"
            stroke="url(#perf-ribbon-2)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            filter="url(#agents-glow)"
          />

          {/* High-Fidelity Reflective 3D Spheres sitting on the wave curves */}
          {/* Sphere 1: Left Peak (cx=170, cy=75) */}
          <g filter="url(#agents-glow)">
            <line x1="170" y1="75" x2="170" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="170" cy="75" r="9" fill="url(#perf-sphere-2)" />
            <circle cx="167" cy="72" r="3" fill="#ffffff" opacity="0.6" filter="blur(0.5px)" />
          </g>

          {/* Sphere 2: Center Intersection (cx=300, cy=135) */}
          <g filter="url(#agents-glow)">
            <line x1="300" y1="135" x2="300" y2="195" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="300" cy="135" r="11" fill="url(#perf-sphere-1)" />
            <circle cx="296" cy="131" r="3.5" fill="#ffffff" opacity="0.6" filter="blur(0.5px)" />
          </g>

          {/* Sphere 3: Right Peak (cx=440, cy=85) */}
          <g filter="url(#agents-glow)">
            <line x1="440" y1="85" x2="440" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="440" cy="85" r="10" fill="url(#perf-sphere-3)" />
            <circle cx="436" cy="81" r="3.5" fill="#ffffff" opacity="0.5" filter="blur(0.5px)" />
          </g>

          {/* Floating background dust particles */}
          <circle cx="110" cy="60" r="3" fill="#34d399" opacity="0.5" />
          <circle cx="240" cy="180" r="4" fill="#93c5fd" opacity="0.6" filter="url(#agents-glow)" />
          <circle cx="380" cy="60" r="2.5" fill="#ffffff" opacity="0.8" />
          <circle cx="490" cy="160" r="3.5" fill="#a78bfa" opacity="0.5" />
        </svg>
      );

    default:
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      );
  }
};
