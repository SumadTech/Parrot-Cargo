import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PiEye, PiFlag } from "react-icons/pi";

import journeyShipImage from "@/public/images/home/home-previ (1).png";
import journeyWarehouseImage from "@/public/images/home/home-previ (3).png";
import journeyAirImage from "@/public/images/home/home-previ (2).png";

const stats = [
  {
    key: "experience",
    value: "6+",
    highlight: false,
  },
  {
    key: "support",
    value: "24/7",
    highlight: true,
  },
  {
    key: "shipments",
    value: "500+",
    highlight: false,
  },
] as const;

const valueCards = [
  {
    key: "mission",
    Icon: PiFlag,
  },
  {
    key: "vision",
    Icon: PiEye,
  },
] as const;

export function AboutJourneySection() {
  const t = useTranslations("aboutJourney");

  return (
    <Section className="bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:items-start xl:gap-12">
          <MotionWrapper>
            <div className="max-w-2xl">
              <p className="text-caption-1 font-medium text-secondary">
                {t("eyebrow")}
              </p>

              <h2 className="mt-3 text-heading-4 text-heading">{t("title")}</h2>

              <p className="mt-5 text-body-3 text-body">{t("description")}</p>

              <div className="mt-6 h-px bg-stroke" />

              <dl className="mt-5 grid grid-cols-3 gap-4 sm:gap-8">
                {stats.map((stat) => (
                  <div key={stat.key} className="min-w-0">
                    <dt
                      className={
                        stat.highlight
                          ? "text-heading-3 font-semibold text-secondary"
                          : "text-heading-3 font-semibold text-primary"
                      }>
                      {stat.value}
                    </dt>

                    <dd className="mt-2 text-caption-2 text-body">
                      {t(`stats.${stat.key}`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.12}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)]">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative min-h-44 overflow-hidden rounded-sm border border-stroke bg-card shadow-sm sm:min-h-40 lg:min-h-48">
                  <Image
                    src={journeyWarehouseImage}
                    alt={t("images.warehouse")}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 260px"
                    className="object-cover"
                  />
                </div>

                <div className="relative min-h-44 overflow-hidden rounded-sm border border-stroke bg-card shadow-sm sm:min-h-40 lg:min-h-48">
                  <Image
                    src={journeyAirImage}
                    alt={t("images.air")}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 260px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative min-h-90 overflow-hidden rounded-sm border border-stroke bg-card shadow-sm sm:min-h-full">
                <Image
                  src={journeyShipImage}
                  alt={t("images.ship")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 360px"
                  className="object-cover"
                />
              </div>
            </div>
          </MotionWrapper>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:mt-18 lg:grid-cols-2">
          {valueCards.map(({ key, Icon }, index) => (
            <MotionWrapper key={key} delay={index * 0.08}>
              <article className="h-full rounded-sm bg-primary p-5 text-primary-foreground shadow-sm sm:p-7 lg:p-8">
                <div className="grid size-14 place-items-center rounded-full bg-secondary text-secondary-foreground">
                  <Icon className="size-7" aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-body-2 font-semibold text-primary-foreground">
                  {t(`cards.${key}.title`)}
                </h3>

                <p className="mt-4 max-w-xl text-body-3 text-primary-foreground/85">
                  {t(`cards.${key}.description`)}
                </p>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </Container>
    </Section>
  );
}
