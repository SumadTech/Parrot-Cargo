import { PageHero } from "@/components/sections/hero/page-hero";
import { GallerySection } from "@/components/sections/gallery/gallery-section";
import heroImage from "@/public/images/hero/hero-air-cargo.png";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("galleryPage.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function GalleryPage() {
  const t = await getTranslations("galleryPage");

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
            label: t("breadcrumbs.gallery"),
          },
        ]}
      />

      <GallerySection />
    </main>
  );
}