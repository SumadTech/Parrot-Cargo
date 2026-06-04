import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { useTranslations } from "next-intl";
import {
  PiGlobeHemisphereWest,
  PiShieldCheck,
  PiPackage,
  PiUsersThree,
  PiHeadset,
} from "react-icons/pi";
import { LuBadgeDollarSign } from "react-icons/lu";

const whyItems = [
  {
    key: "globalNetwork",
    Icon: PiGlobeHemisphereWest,
  },
  {
    key: "fastCustoms",
    Icon: PiShieldCheck,
  },
  {
    key: "secureHandling",
    Icon: PiPackage,
  },
  {
    key: "transparentPricing",
    Icon: LuBadgeDollarSign,
  },
  {
    key: "experiencedTeam",
    Icon: PiUsersThree,
  },
  {
    key: "customerSupport",
    Icon: PiHeadset,
  },
] as const;

export function WhyParrotSection() {
  const t = useTranslations("homeWhyParrot");

  return (
    <Section className="bg-primary">
      <Container>
        <MotionWrapper>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-caption-1 font-medium text-secondary">
              {t("eyebrow")}
            </p>

            <h2 className="mt-3 text-heading-3 text-primary-foreground">
              {t("title")}
            </h2>
          </div>
        </MotionWrapper>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {whyItems.map(({ key, Icon }, index) => (
            <MotionWrapper key={key} delay={index * 0.05}>
              <article className="group h-full rounded-sm border border-border bg-card p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1">
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
