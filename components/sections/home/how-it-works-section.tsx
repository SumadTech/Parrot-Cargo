import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { MoveDown, MoveRight, MoveUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { LuFileCheck } from "react-icons/lu";
import {
  PiClipboardText,
  PiPackage,
  PiPaperPlaneTilt,
  PiTruck,
} from "react-icons/pi";

const processSteps = [
  {
    key: "consultation",
    number: "01",
    Icon: PiClipboardText,
    position: "top",
  },
  {
    key: "pickup",
    number: "02",
    Icon: PiPackage,
    position: "bottom",
  },
  {
    key: "documentation",
    number: "03",
    Icon: LuFileCheck,
    position: "top",
  },
  {
    key: "transportation",
    number: "04",
    Icon: PiPaperPlaneTilt,
    position: "bottom",
  },
  {
    key: "delivery",
    number: "05",
    Icon: PiTruck,
    position: "top",
  },
] as const;

export function HowItWorksSection() {
  const t = useTranslations("homeHowItWorks");

  return (
    <Section className="bg-background">
      <Container>
        <MotionWrapper>
          <div className="mx-auto max-w-3xl pb-14 text-center">
            <p className="text-caption-1 font-medium text-secondary">
              {t("eyebrow")}
            </p>

            <h2 className="mt-3 text-heading-3 text-heading">{t("title")}</h2>
          </div>
        </MotionWrapper>

        {/* Mobile / tablet vertical timeline */}
        <MotionWrapper delay={0.12} className="mt-10 lg:hidden">
          <div className="relative mx-auto max-w-2xl">
            <div className="absolute bottom-8 inset-s-7 top-8 w-px bg-primary" />

            <div className="grid gap-8">
              {processSteps.map(({ key, number, Icon }) => (
                <article
                  key={key}
                  className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4">
                  <div className="relative z-10">
                    <div className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Icon className="size-7" aria-hidden="true" />
                    </div>

                    <span className="absolute -inset-e-2 -top-1 grid size-7 place-items-center rounded-full bg-secondary text-caption-2 font-semibold text-secondary-foreground">
                      {number}
                    </span>
                  </div>

                  <div className="min-w-0 rounded-sm border border-stroke bg-card p-4">
                    <h3 className="text-body-3 font-semibold text-heading">
                      {t(`steps.${key}.title`)}
                    </h3>

                    <p className="mt-2 text-caption-1 text-body">
                      {t(`steps.${key}.description`)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Desktop horizontal timeline */}
        <MotionWrapper delay={0.12} className="mt-12 hidden lg:block">
          <div className="relative mx-auto min-h-97.5 max-w-6xl">
            <div className="absolute left-5 right-5 top-1/2 h-0.5 -translate-y-1/2 bg-primary" />

            <div className="absolute left-5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-primary" />

            <MoveRight
              strokeWidth={1.5}
              className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-primary rtl:rotate-180"
              aria-hidden="true"
            />

            <div className="grid grid-cols-5">
              {processSteps.map(({ key, number, Icon, position }) => {
                const isTop = position === "top";

                return (
                  <div
                    key={key}
                    className="relative flex min-h-97.5 justify-center">
                    <div
                      className={
                        isTop
                          ? "absolute bottom-[calc(60%+2.25rem)] w-full max-w-57.5 text-center"
                          : "absolute top-[calc(60%+2.25rem)] w-full max-w-57.5 text-center"
                      }>
                      <div className="mb-5 flex justify-center">
                        <div className="relative">
                          <div className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                            <Icon className="size-7" aria-hidden="true" />
                          </div>

                          <span className="absolute -inset-e-2 -top-1 grid size-7 place-items-center rounded-full bg-secondary text-caption-2 font-semibold text-secondary-foreground">
                            {number}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-body-3 font-semibold text-heading">
                        {t(`steps.${key}.title`)}
                      </h3>

                      <p className="mt-2 text-caption-1 text-body">
                        {t(`steps.${key}.description`)}
                      </p>
                    </div>

                    {isTop ? (
                      <MoveUp
                        strokeWidth={1}
                        className="absolute left-1/2 top-[calc(45%-2rem)] size-14 -translate-x-1/2 text-primary"
                        aria-hidden="true"
                      />
                    ) : (
                      <MoveDown
                        strokeWidth={1}
                        className="absolute left-1/2 top-[calc(57%-1.90rem)] size-14 -translate-x-1/2 text-primary"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </MotionWrapper>
      </Container>
    </Section>
  );
}
