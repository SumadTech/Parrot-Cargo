import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

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
        <div className="absolute inset-0 bg-primary/70" />
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
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-card py-1.5 pe-1.5 ps-5 text-caption-2 font-semibold text-primary transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                {t("cta")}
                <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-secondary">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </MotionWrapper>
      </Container>
    </section>
  );
}