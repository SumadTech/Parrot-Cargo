import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import seaFreightImage from "@/public/images/home/home-previ (1).png";
import warehouseImage from "@/public/images/home/home-previ (3).png";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const featuredInsight = {
  key: "featured",
  href: "/blogs/air-freight-vs-sea-freight",
  image: seaFreightImage,
} as const;

const insightItems = [
  {
    key: "seaFreight",
    href: "/blogs/customs-documentation-mistakes",
    image: warehouseImage,
  },
  {
    key: "airFreight",
    href: "/blogs/air-freight-vs-sea-freight",
    image: warehouseImage,
  },
] as const;

export function InsightsSection() {
  const t = useTranslations("homeInsights");

  return (
    <Section className="bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,1fr)] lg:items-stretch xl:gap-8">
          <MotionWrapper>
            <Link
              href={featuredInsight.href}
              className="group block h-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <article className="relative min-h-80 overflow-hidden rounded-lg border border-stroke bg-card shadow-sm sm:min-h-97.5 lg:min-h-100">
                <Image
                  src={featuredInsight.image}
                  alt={t("featured.imageAlt")}
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-media-card-overlay-soft" />
                <div className="absolute inset-0 bg-linear-to-t from-media-card-overlay via-media-card-overlay-soft to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="max-w-md text-body-2 font-semibold text-media-card-foreground sm:text-body-1 lg:text-body-2">
                      {t("featured.title")}
                    </h3>

                    <span className="hidden shrink-0 items-center gap-3 rounded-full border border-primary-foreground/40 bg-primary-foreground/10 py-1.5 pe-1.5 ps-4 text-caption-2 font-medium text-media-card-foreground backdrop-blur-sm transition-colors duration-300 group-hover:bg-primary-foreground group-hover:text-primary sm:inline-flex">
                      {t("readMore")}
                      <span className="grid size-8 place-items-center rounded-full bg-primary-foreground text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </span>
                    </span>

                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-foreground text-primary transition-colors duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground sm:hidden">
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </MotionWrapper>

          <MotionWrapper delay={0.12}>
            <div className="flex h-full flex-col  p-0 lg:p-0">
              <div className="max-w-2xl">
                <p className="text-caption-1 font-medium text-secondary">
                  {t("eyebrow")}
                </p>

                <h2 className="mt-3 text-heading-5 text-heading sm:text-heading-3">
                  {t("title")}
                </h2>
              </div>

              <div className="mt-6 grid gap-5 sm:gap-6 lg:mt-auto">
                {insightItems.map((item, index) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <article className="grid grid-cols-1 gap-4 rounded-lg transition-transform duration-300 group-hover:-translate-y-1 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-center lg:grid-cols-[minmax(0,1fr)_160px]">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-caption-2 text-body">
                          <span className="font-semibold text-heading">
                            {t(`items.${item.key}.category`)}
                          </span>

                          <span
                            className="size-1.5 rounded-full bg-secondary"
                            aria-hidden="true"
                          />

                          <time dateTime={t(`items.${item.key}.dateTime`)}>
                            {t(`items.${item.key}.timeAgo`)}
                          </time>
                        </div>

                        <h3 className="mt-3 text-body-4 font-semibold text-heading transition-colors duration-300 group-hover:text-primary">
                          {t(`items.${item.key}.title`)}
                        </h3>

                        <p className="mt-2 line-clamp-3 text-caption-1 text-body sm:line-clamp-2">
                          {t(`items.${item.key}.description`)}
                        </p>
                      </div>

                      <div className="relative min-h-45 overflow-hidden rounded-md border border-stroke bg-card sm:min-h-30">
                        <Image
                          src={item.image}
                          alt={t(`items.${item.key}.imageAlt`)}
                          fill
                          sizes="(max-width: 640px) 100vw, 160px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </Section>
  );
}