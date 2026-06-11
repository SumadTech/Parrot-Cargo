import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { QuoteButton } from "@/components/common/quote-button";
import ctaImage from "@/public/images/cta.png";

export function CtaSection() {
  const t = useTranslations("sharedCta");

  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <Image
          src={ctaImage}
          alt={t("imageAlt")}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-media-card-overlay" />
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      <Container className="relative z-10">
        <MotionWrapper>
          <div className="mx-auto flex min-h-90 max-w-5xl flex-col items-center justify-center py-16 text-center sm:min-h-105 sm:py-20 lg:min-h-112.5">
            <h2 className="text-heading-3 text-primary-foreground sm:text-heading-2">
              {t("title")}
            </h2>

            <p className="mt-5 max-w-3xl text-body-3 text-primary-foreground/90">
              {t("description")}
            </p>

            <div className="mt-8">
              <QuoteButton href="/contact" variant={"primary"}>
                {t("cta")}
              </QuoteButton>
            </div>
          </div>
        </MotionWrapper>
      </Container>
    </section>
  );
}
