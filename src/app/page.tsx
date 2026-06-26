import type { Metadata } from 'next';
import { Navbar } from '../components/Hero/Navbar';
import { Hero } from '../components/Hero/Hero';
import { ScrollBrainManager } from '../components/Hero/ScrollBrainManager';
import { TrustedCompanies } from '../components/Hero/TrustedCompanies';
import { FeaturesSection } from '../components/Features/FeaturesSection';
import { PricingSection } from '../components/Pricing/PricingSection';
import { Testimonials } from '../components/Testimonials/Testimonials';
import { FAQ } from '../components/FAQ/FAQ';
import { Footer } from '../components/Footer/Footer';
import { RevealSection } from '../components/RevealSection';

export const metadata: Metadata = {
  title: 'AetherData | Sovereign AI-Powered Data Automation Platform',
  description: 'Deploy autonomous AI agent swarms to automate operational pipelines, forecast demand, and secure enterprise telemetry with zero-trust isolation.',
  keywords: ['AI workflow automation', 'predictive analytics', 'real-time insights', 'AI agents', 'enterprise security', 'smart dashboards', 'zero-trust'],
  authors: [{ name: 'AetherData Technologies' }],
  metadataBase: new URL('https://aetherdata.io'),
  alternates: {
    canonical: 'https://aetherdata.io',
  },
  openGraph: {
    title: 'AetherData | Sovereign AI-Powered Data Automation Platform',
    description: 'Deploy autonomous AI agent swarms to automate operational pipelines, secure enterprise telemetry, and forecast operational bottlenecks.',
    url: 'https://aetherdata.io',
    siteName: 'AetherData',
    images: [
      {
        url: 'https://aetherdata.io/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AetherData - AI Powered Data Automation Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AetherData | Sovereign AI-Powered Data Automation Platform',
    description: 'Deploy autonomous AI agent swarms to automate operational pipelines, secure enterprise telemetry, and forecast operational bottlenecks.',
    images: ['https://aetherdata.io/twitter-image.jpg'],
  },
};

export default function Home() {
  // JSON-LD Structured Data for SoftwareApplication
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AetherData Platform',
    operatingSystem: 'All',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '29',
      highPrice: '499',
      offerCount: '3',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '142',
    },
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Scroll-based 3D floating brain manager */}
      <ScrollBrainManager />

      {/* Global Blurred Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 w-full">
        {/* Hero Banner (with statistics and visual canvas) */}
        <Hero />

        {/* Fictional Client Logos strip */}
        <RevealSection>
          <TrustedCompanies />
        </RevealSection>

        {/* Bento Grid & Accordion Features Section */}
        <FeaturesSection />

        {/* Localized Price Switcher Section */}
        <RevealSection>
          <PricingSection />
        </RevealSection>

        {/* Masonry Review Board */}
        <RevealSection>
          <Testimonials />
        </RevealSection>

        {/* Interactive FAQ Drawer */}
        <RevealSection>
          <FAQ />
        </RevealSection>
      </main>

      {/* Newsletter Signup & Copyright Footer */}
      <RevealSection>
        <Footer />
      </RevealSection>
    </>
  );
}
