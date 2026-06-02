import { AboutPreviewSection } from "@/components/sections/home/about-preview-section";
import { HowItWorksSection } from "@/components/sections/home/how-it-works-section";
import { IndustriesSection } from "@/components/sections/home/industries-section";
import { InsightsSection } from "@/components/sections/home/insights-section";
import { ServicesPreviewSection } from "@/components/sections/home/services-preview-section";
import { StatsSection } from "@/components/sections/home/stats-section";
import { TestimonialsSection } from "@/components/sections/home/testimonials-section";
import { WhyParrotSection } from "@/components/sections/home/why-parrot-section";
import { HomeHero } from "@/components/sections/hero/home-hero";
import { CtaSection } from "@/components/sections/shared/cta-section";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <AboutPreviewSection />
      <ServicesPreviewSection />
      <WhyParrotSection />
      <IndustriesSection />
      <HowItWorksSection />
      <InsightsSection />
      <TestimonialsSection />
      <StatsSection />
      <InsightsSection />
      <CtaSection />
    </main>
  );
}