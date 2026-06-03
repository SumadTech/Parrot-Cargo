import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { useTranslations } from "next-intl";
import {
  PiShieldCheck,
  PiSealCheck,
  PiLightning,
  PiTrophy,
  PiUsersThree,
  PiClipboardText,
} from "react-icons/pi";

const valueItems = [
  {
    key: "integrity",
    Icon: PiShieldCheck,
  },
  {
    key: "reliability",
    Icon: PiSealCheck,
  },
  {
    key: "efficiency",
    Icon: PiLightning,
  },
  {
    key: "excellence",
    Icon: PiTrophy,
  },
  {
    key: "customerFocus",
    Icon: PiUsersThree,
  },
  {
    key: "compliance",
    Icon: PiClipboardText,
  },
] as const;

export function AboutValuesSection() {
  const t = useTranslations("aboutValues");

  return (
    <Section className="bg-background">
      <Container>
        <MotionWrapper>
          <div className="max-w-2xl">
            <p className="text-caption-1 font-medium text-secondary">
              {t("eyebrow")}
            </p>

            <h2 className="mt-3 text-heading-4 text-heading">
              {t("title")}
            </h2>
          </div>
        </MotionWrapper>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {valueItems.map(({ key, Icon }, index) => (
            <MotionWrapper key={key} delay={index * 0.05}>
              <article className="group h-full rounded-sm border border-stroke bg-surface-secondary p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6">
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