import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import heroAirCargo from "@/public/images/home/home-previ (2).png";
import heroSeaCargo from "@/public/images/home/home-previ (1).png";
import heroWarehouse from "@/public/images/home/home-previ (3).png";
import { ArrowUpRight, } from "lucide-react";
import { HiOutlineCheckBadge } from "react-icons/hi2";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const featureKeys = [
  "fastCustoms",
  "internationalNetwork",
  "transparentOperations",
  "professionalCoordination",
  "reliableMovement",
] as const;

export function AboutPreviewSection() {
  const t = useTranslations("homeAboutPreview");

  return (
    <Section className="bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:items-center xl:gap-14">
          <MotionWrapper className="min-w-0">
            <div className="max-w-2xl">
              <p className="text-caption-1 font-medium text-secondary">
                {t("eyebrow")}
              </p>

              <h2 className="mt-3 text-heading-3 text-heading">
                {t("titleStart")}{" "}
                <span className="text-secondary">{t("titleHighlight")}</span>
              </h2>

              <p className="mt-5 text-body-3 text-body">
                {t("description")}
              </p>

              <ul className="mt-6 grid gap-3">
                {featureKeys.map((featureKey) => (
                  <li
                    key={featureKey}
                    className="flex min-w-0 items-start gap-3 text-caption-1 text-heading"
                  >
                    <HiOutlineCheckBadge className="mt-0.5 size-5 shrink-0 text-secondary" />
                    <span className="min-w-0 wrap-break-word">
                      {t(`features.${featureKey}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <Link
                  href="/about"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-primary px-4 text-caption-2 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
                >
                  {t("cta")}
                  <span className="grid size-7 place-items-center rounded-full bg-primary-foreground text-primary">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.12}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="relative min-h-80 overflow-hidden rounded-lg border border-stroke bg-card shadow-sm sm:min-h-115">
                <Image
                  src={heroSeaCargo}
                  alt={t("images.seaCargo")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="relative min-h-55 overflow-hidden rounded-lg border border-stroke bg-card shadow-sm sm:min-h-55 lg:min-h-60">
                  <Image
                    src={heroWarehouse}
                    alt={t("images.warehouse")}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    className="object-cover"
                  />
                </div>

                <div className="relative min-h-55 overflow-hidden rounded-lg border border-stroke bg-card shadow-sm sm:min-h-55 lg:min-h-60">
                  <Image
                    src={heroAirCargo}
                    alt={t("images.airCargo")}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </Section>
  );
}