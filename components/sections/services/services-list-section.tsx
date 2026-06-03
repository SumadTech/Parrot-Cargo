import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { services } from "@/data/services";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function ServicesListSection() {
  const t = useTranslations("servicesPage");

  return (
    <Section className="bg-background">
      <Container>
        <MotionWrapper>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-caption-1 font-medium text-secondary">
              {t("section.eyebrow")}
            </p>

            <h2 className="mt-3 text-heading-3 text-heading">
              {t("section.title")}
            </h2>

            <p className="mt-5 text-body-3 text-body">
              {t("section.description")}
            </p>
          </div>
        </MotionWrapper>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <MotionWrapper key={service.slug} delay={index * 0.06}>
              <Link
                href={`/services/${service.slug}`}
                className="group block h-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <article className="relative min-h-80 overflow-hidden rounded-lg border border-stroke bg-card shadow-sm transition-transform duration-300 group-hover:-translate-y-1 sm:min-h-90 lg:min-h-95">
                  <Image
                    src={service.image}
                    alt={t(`items.${service.key}.imageAlt`)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-media-card-overlay-soft" />
                  <div className="absolute inset-0 bg-linear-to-t from-media-card-overlay via-media-card-overlay-soft to-transparent" />

                  <span className="absolute inset-e-4 top-4 grid size-11 place-items-center rounded-full bg-card text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="transition-transform duration-300 md:translate-y-12 md:group-hover:translate-y-0">
                      <h3 className="text-body-2 font-semibold text-media-card-foreground">
                        {t(`items.${service.key}.title`)}
                      </h3>

                      <p className="mt-3 max-w-sm text-caption-1 text-media-card-foreground/90 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                        {t(`items.${service.key}.description`)}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            </MotionWrapper>
          ))}
        </div>
      </Container>
    </Section>
  );
}