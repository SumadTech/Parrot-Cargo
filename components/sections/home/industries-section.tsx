import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { useTranslations } from "next-intl";
import {
  PiBuildings,
  PiShoppingCart,
  PiTruck,
  PiFactory,
  PiGasPump,
  PiGearSix,
} from "react-icons/pi";

const industryItems = [
  {
    key: "construction",
    Icon: PiBuildings,
  },
  {
    key: "retail",
    Icon: PiShoppingCart,
  },
  {
    key: "automotive",
    Icon: PiTruck,
  },
  {
    key: "manufacturing",
    Icon: PiFactory,
  },
  {
    key: "oilGas",
    Icon: PiGasPump,
  },
  {
    key: "industrialMachinery",
    Icon: PiGearSix,
  },
] as const;

export function IndustriesSection() {
  const t = useTranslations("homeIndustries");

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

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {industryItems.map(({ key, Icon }, index) => (
            <MotionWrapper key={key} delay={index * 0.05}>
              <article className="group h-full rounded-sm border border-stroke bg-surface-secondary p-5 transition-transform duration-300 hover:-translate-y-1">
                <div className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground transition-colors duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <Icon className="size-7" aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-body-3 font-semibold text-heading">
                  {t(`items.${key}.title`)}
                </h3>

                <p className="mt-2 text-caption-1 text-body">
                  {t(`items.${key}.description`)}
                </p>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </Container>
    </Section>
  );
}
