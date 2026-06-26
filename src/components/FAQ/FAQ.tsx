'use client';

import React, { useState, useRef, useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How is the regional pricing configured?',
    answer: 'Our pricing engine uses a dynamic configuration matrix that adjusts base rates based on selected currency, exchange rates, and purchasing power parity (PPP) regional tariffs. When you pay in INR or EUR, a dedicated regional multiplier protects your organization from exchange-rate volatility. Annual agreements also apply a flat 20% discount computed live on your invoice details.',
  },
  {
    question: 'What makes AetherData swarms "sovereign"?',
    answer: 'Unlike generic LLM products that process telemetry in shared multi-tenant space, AetherData allocates dedicated orchestrator swarms to your isolated environment. These agents execute logic in local runtime containers. They are sandboxed, auditable, and can be restricted to local network boundaries, complying with GDPR, HIPAA, and CCPA standards.',
  },
  {
    question: 'How is zero-trust security implemented on your platform?',
    answer: 'We secure pipelines through column-level KMS encryption, strict TLS 1.3 encryption, and private VPC tunnels. All data-in-transit is encrypted. You control the decryption keys, meaning AetherData core systems cannot read sensitive values. We undergo annual audits to verify SOC2 Type II status and ISO-27001 standards.',
  },
  {
    question: 'Can we deploy AetherData on-premise or in hybrid configurations?',
    answer: 'Yes. Our Enterprise tier includes options to build the agent runners inside your private Kubernetes clusters (AWS EKS, GCP GKE, Azure AKS, or on-premise hardware). Telemetry coordinates in your cloud, while AetherData only acts as the orchestration shell and audit viewer.',
  },
  {
    question: 'Can we train custom predictive models on our telemetry streams?',
    answer: 'Absolutely. Professional and Enterprise tiers grant access to custom fine-tuning interfaces. You can supply historical time-series datasets to specialize our base transformer models for your specific schema, improving forecasting accuracies for specialized hardware, traffic flows, or financial systems.',
  },
];

const FAQComponent: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
        glow1Ref.current.style.transform = `translate3d(${px * 35}px, ${py * 35}px, 0)`;
      }
      if (glow2Ref.current) {
        glow2Ref.current.style.transform = `translate3d(${px * -30}px, ${py * -30}px, 0)`;
      }
    };

    section.addEventListener('mousemove', handleBgMouseMove);
    return () => section.removeEventListener('mousemove', handleBgMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-title"
      className="relative py-24 md:py-32 bg-dark-bg overflow-hidden border-t border-white/5"
    >
      {/* Background Decorative Blurs - Moving & Colorful */}
      <div 
        ref={glow1Ref}
        className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full blur-[125px] pointer-events-none transition-transform duration-300 ease-out" 
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(236,72,153,0.05) 60%, rgba(0,0,0,0) 100%)',
          willChange: 'transform'
        }}
      />
      <div 
        ref={glow2Ref}
        className="absolute top-10 left-10 w-[380px] h-[380px] rounded-full blur-[110px] pointer-events-none transition-transform duration-300 ease-out" 
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, rgba(59,130,246,0.04) 60%, rgba(0,0,0,0) 100%)',
          willChange: 'transform'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 inline-block mb-4">
            Answering Inquiries
          </span>
          <h2
            id="faq-title"
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Frequently Asked <span className="text-gradient-purple">Technical Questions</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
            Deep dive into the architecture, billing parity, security compliance, and deployment topology of AetherData.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto" role="presentation">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            const headerId = `faq-header-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-purple-500/30 bg-zinc-900/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]'
                    : 'border-white/5 bg-zinc-950/20 hover:border-white/10'
                }`}
              >
                {/* FAQ Header Button */}
                <button
                  id={headerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus-ring rounded-2xl cursor-pointer group"
                >
                  <span className="font-medium text-white text-base md:text-lg tracking-tight group-hover:text-purple-300 transition-colors duration-200">
                    {item.question}
                  </span>

                  {/* Indicator Icon */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 ml-4 transition-all duration-300 ${
                      isOpen
                        ? 'border-purple-400/30 text-purple-300 rotate-180'
                        : 'border-zinc-800 text-zinc-500'
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

                {/* FAQ Body Drawer */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-1 text-sm md:text-base text-zinc-400 leading-relaxed border-t border-white/5 mt-1 font-normal">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const FAQ = React.memo(FAQComponent);
FAQ.displayName = 'FAQ';
