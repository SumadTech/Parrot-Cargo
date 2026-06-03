import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineCheckBadge } from "react-icons/hi2";

import aboutShipImage from "@/public/images/home/home-previ (1).png";
import aboutWarehouseImage from "@/public/images/home/home-previ (3).png";
import aboutAirImage from "@/public/images/home/home-previ (2).png";

const featureKeys = [
  "internationalFreight",
  "customsClearance",
  "airSeaExperts",
  "projectCargo",
  "globalTradeSupport",
] as const;

export function AboutIntroSection() {
  const t = useTranslations("aboutIntro");

  return (
    <Section className="bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1fr)] lg:items-center xl:gap-12">

          <MotionWrapper>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)]">
              <div className="relative min-h-90 rounded-sm sm:min-h-121">
                <div className="absolute -inset-s-8 top-8 z-10 rounded-full bg-primary px-3 py-2 text-caption-1 font-semibold text-primary-foreground shadow-sm sm:-inset-s-7">
                  {t("badge")}
                </div>

                <div className="relative h-full min-h-90 overflow-hidden rounded-sm border border-stroke bg-card shadow-sm sm:min-h-130">
                  <Image
                    src={aboutShipImage}
                    alt={t("images.ship")}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="relative min-h-36 overflow-hidden rounded-sm border border-stroke bg-card shadow-sm sm:min-h-36 lg:min-h-38">
                  <Image
                    src={aboutWarehouseImage}
                    alt={t("images.warehouse")}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    className="object-cover"
                  />
                </div>

                <div className="relative min-h-36 overflow-hidden rounded-sm border border-stroke bg-card shadow-sm sm:min-h-36 lg:min-h-38">
                  <Image
                    src={aboutAirImage}
                    alt={t("images.air")}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    className="object-cover"
                  />
                </div>

                <div className="relative min-h-36 overflow-hidden rounded-sm border border-stroke bg-card shadow-sm sm:min-h-36 lg:min-h-38">
                  <Image
                    src={aboutAirImage}
                    alt={t("images.air")}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.12}>
            <div className="max-w-2xl lg:pt-0">
              <p className="text-caption-1 font-medium text-secondary">
                {t("eyebrow")}
              </p>

              <h2 className="mt-3 text-heading-4 text-heading">
                {t("titleStart")}{" "}
                <span className="text-secondary">{t("titleHighlight")}</span>
              </h2>

              <p className="mt-5 text-body-3 text-body">{t("description")}</p>

              <ul className="mt-6 grid gap-3">
                {featureKeys.map((featureKey) => (
                  <li
                    key={featureKey}
                    className="flex min-w-0 items-start gap-3 text-caption-1 text-heading"
                  >
                    <HiOutlineCheckBadge
                      className="mt-0.5 size-5 shrink-0 text-secondary"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 wrap-break-word">
                      {t(`features.${featureKey}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-primary px-5 text-caption-2 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
                >
                  {t("cta")}
                  <span className="grid size-7 place-items-center rounded-full bg-primary-foreground text-primary">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </Section>
  );
}