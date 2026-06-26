# Task List

## 1. Setup Base Styles and Config
- [x] Configure `tailwind.config.ts` or globals CSS variables for glassmorphism and animations
- [x] Create shared pricing config (`src/data/pricingConfig.ts`) and calculator utility (`src/utils/pricingCalculator.ts`)
- [x] Create shared feature data (`src/data/featureData.ts`)

## 2. Context Providers
- [x] Create `PricingContext.tsx` for isolated pricing state
- [x] Create `FeatureContext.tsx` for shared Bento-Accordion active state

## 3. Section Components
- [x] Create `Navbar.tsx` (blurred glass header)
- [x] Create `Hero.tsx` (entrance motion, animated canvas, trust badges, stats cards)
- [x] Create Bento/Accordion features (`BentoGrid.tsx`, `Accordion.tsx`, `FeaturesSection.tsx`)
- [x] Create Pricing layout (`PricingControls.tsx`, `PricingText.tsx`, `PricingCard.tsx`, `PricingSection.tsx`)
- [x] Create Testimonials component (`Testimonials.tsx`)
- [x] Create FAQ component (`FAQ.tsx`)
- [x] Create Footer component (`Footer.tsx` with newsletter form)

## 4. Main Page & Metadata
- [x] Integrate into `src/app/page.tsx`
- [x] Add JSON-LD schema, open graph, and metadata
- [x] Verify accessibility properties and ARIA attributes

## 5. Testing and Optimization
- [x] Verify state isolation (no re-renders on other sections during pricing toggle)
- [x] Verify Bento-Accordion breakpoint state persistence
- [x] Run typescript checks and production builds
