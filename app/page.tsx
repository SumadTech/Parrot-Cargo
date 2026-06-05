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
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HomeHero />
      <AboutPreviewSection />
      <ServicesPreviewSection />
      <WhyParrotSection />
      <IndustriesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <StatsSection />
      <InsightsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}