"use client";

import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { services } from "@/data/services";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

export function ServicesPreviewSection() {
  const t = useTranslations("homeServicesPreview");
  const locale = useLocale();

  const sliderRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);

  const isRtl = locale === "ar";

  const scrollToIndex = useCallback((nextIndex: number) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const slides = Array.from(slider.children);
    const slide = slides[nextIndex] as HTMLElement | undefined;

    if (!slide) return;

    activeIndexRef.current = nextIndex;

    slider.scrollTo({
      left: slide.offsetLeft,
      behavior: "smooth",
    });
  }, []);

  const scrollSlider = useCallback(
    (direction: "previous" | "next") => {
      const lastIndex = services.length - 1;

      const normalDirection = isRtl
        ? direction === "next"
          ? "previous"
          : "next"
        : direction;

      const nextIndex =
        normalDirection === "next"
          ? activeIndexRef.current >= lastIndex
            ? 0
            : activeIndexRef.current + 1
          : activeIndexRef.current <= 0
            ? lastIndex
            : activeIndexRef.current - 1;

      scrollToIndex(nextIndex);
    },
    [isRtl, scrollToIndex],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      scrollSlider("next");
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, [scrollSlider]);

  return (
    <Section className="bg-background">
      <Container>
        <MotionWrapper>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-caption-1 font-medium text-secondary">
              {t("eyebrow")}
            </p>

            <h2 className="mt-3 text-heading-3 text-heading">{t("title")}</h2>
          </div>
        </MotionWrapper>

        <MotionWrapper delay={0.12} className="mt-10">
          <div className="relative overflow-hidden">
            {/* <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background via-background/70 to-transparent sm:w-28" />

            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background via-background/70 to-transparent sm:w-28" /> */}

            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-background via-background/55 to-transparent sm:w-16" />

            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-background via-background/55 to-transparent sm:w-16" />

            <div
              ref={sliderRef}
              dir={isRtl ? "rtl" : "ltr"}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden sm:gap-5"
              aria-label={t("carouselLabel")}>
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group block w-[82vw] shrink-0 snap-start rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-85 lg:w-92.5">
                  <article className="relative min-h-72.5 overflow-hidden rounded-sm border border-stroke bg-card transition-transform duration-300 group-hover:-translate-y-1 md:min-h-80">
                    <Image
                      src={service.image}
                      alt={t(`items.${service.key}.imageAlt`)}
                      fill
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 340px, 370px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-media-card-overlay-soft" />
                    <div className="absolute inset-0 bg-linear-to-t from-media-card-overlay via-media-card-overlay-soft to-transparent" />

                    <span className="absolute inset-e-4 top-4 grid size-10 place-items-center rounded-full bg-card text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground">
                      <ArrowUpRight className="size-5" />
                    </span>

                    <div className="absolute inset-x-0 bottom-0 px-5 pb-2 pt-16 transition-all duration-300 group-hover:pb-5">
                      <div className="transition-transform duration-300 md:translate-y-20 md:group-hover:translate-y-0">
                        <h3 className="text-body-2 font-semibold text-media-card-foreground">
                          {t(`items.${service.key}.title`)}
                        </h3>

                        <p className="mt-3 max-w-sm text-caption-1 text-media-card-foreground opacity-90 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-90">
                          {t(`items.${service.key}.description`)}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 lg:justify-end">
            <button
              type="button"
              aria-label={t("previous")}
              onClick={() => scrollSlider("previous")}
              className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              <ArrowLeft className="size-5 rtl:rotate-180" />
            </button>

            <button
              type="button"
              aria-label={t("next")}
              onClick={() => scrollSlider("next")}
              className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              <ArrowRight className="size-5 rtl:rotate-180" />
            </button>
          </div>
        </MotionWrapper>
      </Container>
    </Section>
  );
}
