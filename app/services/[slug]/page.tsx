import { PageHero } from "@/components/sections/hero/page-hero";
import {
  ServiceDetailSection,
  ServiceIndustriesSection,
  ServiceWorkflowSection,
} from "@/components/sections/services/service-detail-section";
import { CtaSection } from "@/components/sections/shared/cta-section";
import { WhyParrotSection } from "@/components/sections/home/why-parrot-section";
import { getServiceBySlug, services } from "@/data/services";
import type { ServiceKey } from "@/data/service-details";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  const t = await getTranslations("serviceDetails");

  return {
    title: t(`${service.key}.metadata.title`),
    description: t(`${service.key}.metadata.description`),
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const pageT = await getTranslations("servicesPage");
  const servicesT = await getTranslations("servicesPage.items");

  const typedService = {
    ...service,
    key: service.key as ServiceKey,
  };

  return (
    <main>
      <PageHero
        title={servicesT(`${typedService.key}.title`)}
        image={typedService.image}
        breadcrumbs={[
          {
            label: pageT("breadcrumbs.home"),
            href: "/",
          },
          {
            label: pageT("breadcrumbs.services"),
            href: "/services",
          },
          {
            label: servicesT(`${typedService.key}.title`),
          },
        ]}
      />

      <ServiceDetailSection service={typedService} />
      <ServiceWorkflowSection service={typedService} />
      <ServiceIndustriesSection service={typedService} />
      <WhyParrotSection />
      <CtaSection />
    </main>
  );
}
