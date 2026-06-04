import { PageHero } from "@/components/sections/hero/page-hero";
import { AboutIntroSection } from "@/components/sections/about/about-intro-section";
import { AboutJourneySection } from "@/components/sections/about/about-journey-section";
import aboutHeroImage from "@/public/images/hero/hero-air-cargo.png";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { AboutValuesSection } from "@/components/sections/about/about-values-section";
import { WhyParrotSection } from "@/components/sections/home/why-parrot-section";
import { CtaSection } from "@/components/sections/shared/cta-section";
import { AboutTeamSection } from "@/components/sections/about/about-team-section";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("aboutPage.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("aboutPage");

  return (
    <main>
      <PageHero
        title={t("hero.title")}
        image={aboutHeroImage}
        breadcrumbs={[
          {
            label: t("breadcrumbs.home"),
            href: "/",
          },
          {
            label: t("breadcrumbs.about"),
          },
        ]}
      />

      <AboutIntroSection />
      <AboutJourneySection />
      <AboutValuesSection />
      <WhyParrotSection />
      <AboutTeamSection />
      <CtaSection />
    </main>
  );
}
