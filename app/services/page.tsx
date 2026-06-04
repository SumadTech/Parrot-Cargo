import { PageHero } from "@/components/sections/hero/page-hero";
import { ServicesListSection } from "@/components/sections/services/services-list-section";
import heroImage from "@/public/images/hero/SeaFreightPage.webp";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/shared/cta-section";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("servicesPage.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("servicesPage");

  return (
    <main>
      <PageHero
        title={t("hero.title")}
        image={heroImage}
        breadcrumbs={[
          {
            label: t("breadcrumbs.home"),
            href: "/",
          },
          {
            label: t("breadcrumbs.services"),
          },
        ]}
      />

      <ServicesListSection />
      <CtaSection />
    </main>
  );
}
