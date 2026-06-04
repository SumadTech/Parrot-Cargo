"use client";

import { QuoteButton } from "@/components/common/quote-button";
import { homeHeroSlides } from "@/data/home-hero-slides";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const AUTO_SLIDE_DELAY = 3000;

export function HomeHero() {
  const t = useTranslations("homeHero");
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const activeSlide = homeHeroSlides[activeIndex];
  const totalSlides = homeHeroSlides.length;

  function goToNext() {
    setActiveIndex((index) => (index + 1) % totalSlides);
  }

  function goToPrevious() {
    setActiveIndex((index) => (index - 1 + totalSlides) % totalSlides);
  }

  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      goToNext();
    }, AUTO_SLIDE_DELAY);

    return () => {
      window.clearInterval(timer);
    };
  }, [activeIndex, shouldReduceMotion]);

  const slideNumber = useMemo(() => {
    return String(activeIndex + 1).padStart(2, "0");
  }, [activeIndex]);

  return (
    <section className="relative min-h-dvh overflow-hidden bg-heading text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0">
          <Image
            src={activeSlide.image}
            alt=""
            fill
            priority={activeIndex === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-linear-to-r from-hero-overlay-strong via-hero-overlay to-hero-overlay-soft" />

      <div className="container-page relative z-10 flex min-h-dvh items-center pt-32 sm:pt-36 lg:pt-44">
        <div className="grid w-full grid-cols-1 gap-10 pb-16 pt-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center xl:grid-cols-[minmax(0,1fr)_420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${activeSlide.id}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl">
              <h1 className="text-heading-1 text-white">
                {t(activeSlide.titleKey)}
              </h1>

              <p className="mt-5 max-w-3xl text-body-3 text-white/88 sm:mt-6">
                {t(activeSlide.descriptionKey)}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <QuoteButton
                  href="/contact"
                  variant="light"
                  className="w-full sm:w-auto">
                  {t("requestQuote")}
                </QuoteButton>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xs justify-self-start rounded-sm bg-card p-4 text-heading  lg:justify-self-end">
            <div className="flex items-center justify-between gap-4">
              <span className="text-caption-1 font-medium text-body">
                {slideNumber}/{String(totalSlides).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous hero slide"
                  onClick={goToPrevious}
                  className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-blue-normal-hover">
                  <ArrowLeft className="size-4" />
                </button>

                <button
                  type="button"
                  aria-label="Next hero slide"
                  onClick={goToNext}
                  className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-blue-normal-hover">
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${activeSlide.id}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}>
                <p className="mt-6 text-body-3 font-medium text-heading">
                  {t(activeSlide.cardTextKey)}
                </p>

                <div className="relative mt-5 aspect-4/3 overflow-hidden rounded-sm">
                  <Image
                    src={activeSlide.cardImage}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="border-t border-white/25 pt-5 lg:col-span-2">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 text-caption-1 text-white/85">
              {[
                "since",
                "regions",
                "routes",
                "support",
                "customs",
                "handling",
              ].map((key) => (
                <li key={key} className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-secondary" />
                  <span>{t(`stats.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
