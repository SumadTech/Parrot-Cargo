import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { serviceDetails, type ServiceKey } from "@/data/service-details";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  ChevronRight,
  MoveDown,
  MoveRight,
  MoveUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

type ServiceDetailSectionProps = {
  service: {
    key: ServiceKey;
    slug: string;
    image: StaticImageData;
  };
};

function RelatedServicesAside({ service }: ServiceDetailSectionProps) {
  const t = useTranslations("serviceDetails");
  const servicesT = useTranslations("servicesPage.items");

  return (
    <aside aria-label={t("relatedServices")} className="min-w-0">
      <h2 className="text-body-2 font-semibold text-heading">
        {t("relatedServices")}
      </h2>

      <nav className="mt-5 grid gap-3">
        {services.map((item) => {
          const isActive = item.slug === service.slug;

          return (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group flex min-h-12 items-center justify-between gap-4 rounded-md border border-transparent bg-surface-secondary px-4 text-caption-1 font-medium text-heading transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "text-secondary"
                  : "hover:border-stroke hover:bg-card hover:text-primary",
              )}>
              <span className="min-w-0 wrap-break-word">
                {servicesT(`${item.key}.title`)}
              </span>

              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full transition-colors",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-heading group-hover:bg-primary group-hover:text-primary-foreground",
                )}>
                <ChevronRight
                  className="size-4 rtl:rotate-180"
                  aria-hidden="true"
                />
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function ServiceDetailSection({ service }: ServiceDetailSectionProps) {
  const t = useTranslations("serviceDetails");
  const servicesT = useTranslations("servicesPage.items");

  const detail = serviceDetails[service.key];

  return (
    <Section className="bg-background" safeX={false}>
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start xl:gap-14">
          {/* Left scrolling content */}
          <MotionWrapper className="min-w-0">
            <article className="min-w-0">
              <p className="text-caption-1 font-medium text-secondary">
                {t(`${service.key}.overview.eyebrow`)}
              </p>

              <h2 className="mt-3 max-w-3xl text-heading-4 text-heading">
                {t(`${service.key}.overview.title`)}
              </h2>

              <p className="mt-5 max-w-3xl text-body-3 text-body">
                {t(`${service.key}.overview.description`)}
              </p>

              <ul className="mt-5 grid gap-3">
                {detail.overviewItems.map((item) => (
                  <li
                    key={item}
                    className="flex min-w-0 items-start gap-3 text-caption-1 text-heading">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-secondary" />
                    <span className="min-w-0 wrap-break-word">
                      {t(`${service.key}.overview.items.${item}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative min-h-52 overflow-hidden rounded-sm border border-stroke bg-card shadow-sm sm:min-h-56">
                    <Image
                      src={service.image}
                      alt={servicesT(`${service.key}.imageAlt`)}
                      fill
                      sizes="(max-width: 640px) 100vw, 280px"
                      className="object-cover"
                    />
                  </div>

                  <div className="relative min-h-52 overflow-hidden rounded-sm border border-stroke bg-card shadow-sm sm:min-h-56">
                    <Image
                      src={service.image}
                      alt={servicesT(`${service.key}.imageAlt`)}
                      fill
                      sizes="(max-width: 640px) 100vw, 280px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="relative min-h-72 overflow-hidden rounded-sm border border-stroke bg-card shadow-sm sm:min-h-116">
                  <Image
                    src={service.image}
                    alt={servicesT(`${service.key}.imageAlt`)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 520px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-16">
                <p className="text-caption-1 font-medium text-secondary">
                  {t(`${service.key}.benefits.eyebrow`)}
                </p>

                <h2 className="mt-3 max-w-3xl text-heading-4 text-heading">
                  {t(`${service.key}.benefits.title`)}
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {detail.benefits.map(({ key, Icon }, index) => (
                    <MotionWrapper key={key} delay={index * 0.04}>
                      <article className="h-full rounded-sm border border-stroke bg-surface-secondary p-5">
                        <div className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
                          <Icon className="size-6" aria-hidden="true" />
                        </div>

                        <h3 className="mt-5 text-body-3 font-semibold text-heading">
                          {t(`${service.key}.benefits.items.${key}.title`)}
                        </h3>

                        <p className="mt-2 text-caption-1 text-body">
                          {t(
                            `${service.key}.benefits.items.${key}.description`,
                          )}
                        </p>
                      </article>
                    </MotionWrapper>
                  ))}
                </div>
              </div>
            </article>
          </MotionWrapper>

          {/* Right sticky related services */}
          <div className="hidden min-w-0 lg:block lg:self-start">
            <div className="sticky top-28">
              <RelatedServicesAside service={service} />
            </div>
          </div>

          {/* Mobile related services below content */}
          <div className="min-w-0 lg:hidden">
            <RelatedServicesAside service={service} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function ServiceWorkflowSection({ service }: ServiceDetailSectionProps) {
  const t = useTranslations("serviceDetails");
  const detail = serviceDetails[service.key];

  return (
    <Section className="bg-background">
      <Container>
        <MotionWrapper>
          <div className="mx-auto max-w-3xl pb-14 text-center">
            <p className="text-caption-1 font-medium text-secondary">
              {t(`${service.key}.workflow.eyebrow`)}
            </p>

            <h2 className="mt-3 text-heading-3 text-heading">
              {t(`${service.key}.workflow.title`)}
            </h2>
          </div>
        </MotionWrapper>

        <MotionWrapper delay={0.12} className="mt-10 lg:hidden">
          <div className="relative mx-auto max-w-2xl">
            <div className="absolute bottom-8 inset-s-7 top-8 w-px bg-primary" />

            <div className="grid gap-8">
              {detail.workflow.map(({ key, number, Icon }) => (
                <article
                  key={key}
                  className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4">
                  <div className="relative z-10">
                    <div className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Icon className="size-7" aria-hidden="true" />
                    </div>

                    <span className="absolute -inset-e-2 -top-1 grid size-7 place-items-center rounded-full bg-secondary text-caption-2 font-semibold text-secondary-foreground">
                      {number}
                    </span>
                  </div>

                  <div className="min-w-0 rounded-sm border border-stroke bg-card p-4">
                    <h3 className="text-body-3 font-semibold text-heading">
                      {t(`${service.key}.workflow.steps.${key}.title`)}
                    </h3>

                    <p className="mt-2 text-caption-1 text-body">
                      {t(`${service.key}.workflow.steps.${key}.description`)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </MotionWrapper>

        <MotionWrapper delay={0.12} className="mt-12 hidden lg:block">
          <div className="relative mx-auto min-h-97.5 max-w-6xl">
            <div className="absolute left-5 right-5 top-1/2 h-0.5 -translate-y-1/2 bg-primary" />
            <div className="absolute left-5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-primary" />

            <MoveRight
              strokeWidth={1.5}
              className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-primary rtl:rotate-180"
              aria-hidden="true"
            />

            <div className="grid grid-cols-5">
              {detail.workflow.map(({ key, number, Icon, position }) => {
                const isTop = position === "top";

                return (
                  <div
                    key={key}
                    className="relative flex min-h-97.5 justify-center">
                    <div
                      className={
                        isTop
                          ? "absolute bottom-[calc(60%+2.25rem)] w-full max-w-57.5 text-center"
                          : "absolute top-[calc(60%+2.25rem)] w-full max-w-57.5 text-center"
                      }>
                      <div className="mb-5 flex justify-center">
                        <div className="relative">
                          <div className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                            <Icon className="size-7" aria-hidden="true" />
                          </div>

                          <span className="absolute -inset-e-2 -top-1 grid size-7 place-items-center rounded-full bg-secondary text-caption-2 font-semibold text-secondary-foreground">
                            {number}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-body-3 font-semibold text-heading">
                        {t(`${service.key}.workflow.steps.${key}.title`)}
                      </h3>

                      <p className="mt-2 text-caption-1 text-body">
                        {t(`${service.key}.workflow.steps.${key}.description`)}
                      </p>
                    </div>

                    {isTop ? (
                      <MoveUp
                        strokeWidth={1}
                        className="absolute left-1/2 top-[calc(45%-2rem)] size-14 -translate-x-1/2 text-primary"
                        aria-hidden="true"
                      />
                    ) : (
                      <MoveDown
                        strokeWidth={1}
                        className="absolute left-1/2 top-[calc(57%-1.90rem)] size-14 -translate-x-1/2 text-primary"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </MotionWrapper>
      </Container>
    </Section>
  );
}

export function ServiceIndustriesSection({
  service,
}: ServiceDetailSectionProps) {
  const t = useTranslations("serviceDetails");
  const detail = serviceDetails[service.key];

  return (
    <Section className="bg-background">
      <Container>
        <MotionWrapper>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-caption-1 font-medium text-secondary">
              {t(`${service.key}.industries.eyebrow`)}
            </p>

            <h2 className="mt-3 text-heading-3 text-heading">
              {t(`${service.key}.industries.title`)}
            </h2>
          </div>
        </MotionWrapper>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {detail.industries.map(({ key, Icon }, index) => (
            <MotionWrapper key={key} delay={index * 0.05}>
              <article className="flex h-full items-center gap-4 rounded-sm border border-stroke bg-surface-secondary p-5 transition-transform duration-300 hover:-translate-y-1">
                <div className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="size-6" aria-hidden="true" />
                </div>

                <h3 className="min-w-0 text-body-3 font-semibold text-heading">
                  {t(`${service.key}.industries.items.${key}`)}
                </h3>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </Container>
    </Section>
  );
}
