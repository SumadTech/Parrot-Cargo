"use client";

import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa6";
import testimonialImage from "@/public/images/home/tesetimonial.png";

const testimonials = [
  {
    key: "sahra",
    initials: "SI",
    image: testimonialImage,
  },
  {
    key: "ahmed",
    initials: "AM",
    image: testimonialImage,
  },
  {
    key: "li",
    initials: "LW",
    image: testimonialImage,
  },
  {
    key: "fatima",
    initials: "FH",
    image: testimonialImage,
  },
] as const;

export function TestimonialsSection() {
  const t = useTranslations("homeTestimonials");
  const locale = useLocale();

  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const isRtl = locale === "ar";

  const scrollToCard = useCallback((index: number) => {
    const slider = sliderRef.current;
    const nextIndex = (index + testimonials.length) % testimonials.length;
    const card = cardRefs.current[nextIndex];

    if (!slider || !card) return;

    setActiveIndex(nextIndex);

    const sliderRect = slider.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const currentLeft = slider.scrollLeft;
    const cardCenter = cardRect.left - sliderRect.left + cardRect.width / 2;
    const sliderCenter = sliderRect.width / 2;

    slider.scrollTo({
      left: currentLeft + cardCenter - sliderCenter,
      behavior: "smooth",
    });
  }, []);

  const goPrevious = useCallback(() => {
    scrollToCard(activeIndex - 1);
  }, [activeIndex, scrollToCard]);

  const goNext = useCallback(() => {
    scrollToCard(activeIndex + 1);
  }, [activeIndex, scrollToCard]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (isRtl) {
        goPrevious();
      } else {
        goNext();
      }
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, [goNext, goPrevious, isRtl]);

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

        <MotionWrapper delay={0.12} className="mt-8">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-background to-transparent sm:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-background to-transparent sm:w-20" />

            <div
              ref={sliderRef}
              dir={isRtl ? "rtl" : "ltr"}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden"
              aria-label={t("carouselLabel")}
            >
              {testimonials.map((testimonial, index) => (
                <article
                  key={testimonial.key}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className="w-[86vw] shrink-0 snap-center rounded-sm border border-stroke bg-surface-secondary p-5 sm:w-170 sm:p-7 lg:w-190"
                >
                  <div className="flex items-center gap-1 text-secondary">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <FaStar
                        key={starIndex}
                        className="size-4 sm:size-5"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <blockquote className="mt-7 text-body-3 text-heading sm:text-body-2">
                    “{t(`items.${testimonial.key}.quote`)}”
                  </blockquote>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary text-caption-1 font-semibold text-secondary-foreground">
                      {testimonial.initials}
                    </div>

                    <div className="min-w-0">
                      <p className="text-body-3 font-semibold text-heading">
                        {t(`items.${testimonial.key}.name`)}
                      </p>

                      <p className="mt-1 text-caption-2 text-body">
                        {t(`items.${testimonial.key}.role`)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label={t("previous")}
              onClick={goPrevious}
              className="grid size-11 place-items-center rounded-full border border-stroke bg-card text-primary transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ArrowLeft className="size-5 rtl:rotate-180" />
            </button>

            <div className="flex items-center gap-1.5" aria-hidden="true">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.key}
                  type="button"
                  aria-label={t("goTo", { number: index + 1 })}
                  onClick={() => scrollToCard(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    activeIndex === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/40 hover:bg-primary",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label={t("next")}
              onClick={goNext}
              className="grid size-11 place-items-center rounded-full border border-stroke bg-card text-primary transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ArrowRight className="size-5 rtl:rotate-180" />
            </button>
          </div>
        </MotionWrapper>
      </Container>
    </Section>
  );
}