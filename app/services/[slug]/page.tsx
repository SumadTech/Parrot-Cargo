import { PageHero } from "@/components/sections/hero/page-hero";
import { getServiceBySlug, services } from "@/data/services";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const t = await getTranslations("homeServicesPreview");

  return (
    <main>
      <PageHero
        title={t(`items.${service.key}.title`)}
         breadcrumbs={[
          {
            label: t("breadcrumbs.home"),
            href: "/",
          },
          {
            label: t("breadcrumbs.services"),
          },
        ]}
        image={service.image}
      />
    </main>
  );
}