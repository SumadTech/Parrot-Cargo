import { PageHero } from "@/components/sections/hero/page-hero";
import { LegalContentSection } from "@/components/sections/legal/legal-content-section";
import heroImage from "@/public/images/hero/SeaFreightPage.webp";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legalPages.termsConditions.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TermsAndConditionsPage() {
  const t = await getTranslations("legalPages.termsConditions");

  return (
    <main>
      <PageHero
        title={t("hero.title")}
        image={heroImage}
         titleClassName="text-heading-3 sm:text-heading-1 [color:var(--text-foreground)]"
        align="center"
        breadcrumbs={[
          {
            label: t("breadcrumbs.home"),
            href: "/",
          },
          {
            label: t("breadcrumbs.current"),
          },
        ]}
      />

      <LegalContentSection pageKey="termsConditions" />
    </main>
  );
}
