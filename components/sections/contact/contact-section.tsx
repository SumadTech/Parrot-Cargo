"use client";

import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { QuoteButton } from "@/components/common/quote-button";
import { Section } from "@/components/common/section";
import { contactMapLocations, contactOffices } from "@/data/contact";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { PiMapPin } from "react-icons/pi";

type FormState = "idle" | "loading" | "success" | "error";

const serviceOptions = [
  "airFreight",
  "seaFreight",
  "customsClearance",
  "projectCargo",
] as const;

export function ContactSection() {
  const t = useTranslations("contactPage");
  const [activeMap, setActiveMap] = useState<"bakaro" | "dabka">("bakaro");
  const [formState, setFormState] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");

  const currentLocation =
    contactMapLocations.find((location) => location.key === activeMap) ??
    contactMapLocations[0];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      service: String(formData.get("service") || ""),
      message: String(formData.get("message") || ""),
    };

    setFormState("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || t("form.error"));
      }

      setFormState("success");
      setFeedback(t("form.success"));
      form.reset();
    } catch (error) {
      setFormState("error");
      setFeedback(error instanceof Error ? error.message : t("form.error"));
    }
  }

  return (
    <Section className="bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(420px,1.2fr)] lg:items-start xl:gap-10">
          <MotionWrapper className="min-w-0">
            <div className="max-w-2xl">
              <p className="text-caption-1 font-medium text-secondary">
                {t("eyebrow")}
              </p>

              <h2 className="mt-3 text-heading-4 text-heading">{t("title")}</h2>

              <p className="mt-5 text-body-3 text-body">{t("description")}</p>
            </div>

            <div className="mt-10">
              <h3 className="text-heading-4 text-heading">
                {t("offices.title")}
              </h3>

              <div className="mt-6 grid gap-5">
                {contactOffices.map((office) => (
                  <article
                    key={office.key}
                    className="rounded-sm border border-stroke bg-surface-secondary p-5">
                    <h4 className="text-body-2 font-semibold text-heading">
                      {t(`offices.items.${office.key}.title`)}
                    </h4>

                    <div className="mt-5 grid gap-4">
                      {office.details.map(({ key, Icon }) => (
                        <div
                          key={key}
                          className="flex min-w-0 items-center gap-3 text-caption-1 text-heading">
                          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>

                          <span className="min-w-0 wrap-break-word">
                            {t(`offices.items.${office.key}.${key}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.12} className="min-w-0">
            <div className="rounded-sm border border-stroke bg-surface-secondary p-5 sm:p-6 lg:p-7">
              <div className="max-w-xl">
                <h3 className="text-heading-5 text-heading">
                  {t("form.title")}
                </h3>

                <p className="mt-3 text-caption-1 text-body">
                  {t("form.description")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <input
                    name="fullName"
                    type="text"
                    required
                    placeholder={t("form.fields.fullName")}
                    className="min-h-12 rounded-md border border-primary bg-background px-4 text-caption-1 text-heading outline-none placeholder:text-body focus-visible:ring-2 focus-visible:ring-ring"
                  />

                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={t("form.fields.email")}
                    className="min-h-12 rounded-md border border-primary bg-background px-4 text-caption-1 text-heading outline-none placeholder:text-body focus-visible:ring-2 focus-visible:ring-ring"
                  />

                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder={t("form.fields.phone")}
                    className="min-h-12 rounded-md border border-primary bg-background px-4 text-caption-1 text-heading outline-none placeholder:text-body focus-visible:ring-2 focus-visible:ring-ring"
                  />

                  <div className="relative">
                    <select
                      name="service"
                      required
                      defaultValue=""
                      className="min-h-12 w-full appearance-none rounded-md border border-primary bg-background px-4 pe-10 text-caption-1 text-heading outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="" disabled>
                        {t("form.fields.service")}
                      </option>

                      {serviceOptions.map((option) => (
                        <option
                          key={option}
                          value={t(`form.services.${option}`)}>
                          {t(`form.services.${option}`)}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      className="pointer-events-none absolute inset-e-4 top-1/2 size-4 -translate-y-1/2 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <textarea
                  name="message"
                  required
                  placeholder={t("form.fields.message")}
                  rows={7}
                  className="min-h-40 rounded-md border border-primary bg-background px-4 py-4 text-caption-1 text-heading outline-none placeholder:text-body focus-visible:ring-2 focus-visible:ring-ring"
                />

                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <p
                    className={cn(
                      "text-caption-1",
                      formState === "success"
                        ? "text-primary"
                        : formState === "error"
                          ? "text-secondary"
                          : "text-body",
                    )}
                    role={feedback ? "status" : undefined}>
                    {feedback}
                  </p>

                  <QuoteButton
                    type="submit"
                    disabled={formState === "loading"}
                    variant="primary"
                    iconSize="sm"
                    className="w-full  sm:w-auto">
                    {formState === "loading"
                      ? t("form.sending")
                      : t("form.submit")}
                  </QuoteButton>
                </div>
              </form>

              <div className="mt-8 rounded-sm bg-background p-4">
                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div>
                    <h4 className="text-body-3 font-semibold text-heading">
                      {t("whatsapp.title")}
                    </h4>

                    <p className="mt-1 text-caption-1 text-body">
                      {t("whatsapp.description")}
                    </p>
                  </div>

                  <a
                    href="https://wa.me/252613212221"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-secondary px-4 text-caption-2 font-semibold text-secondary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    <FaWhatsapp className="size-5" aria-hidden="true" />
                    {t("whatsapp.cta")}
                  </a>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>

        <MotionWrapper delay={0.16} className="mt-16">
          <div className="rounded-sm border border-stroke bg-card p-4 sm:p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <PiMapPin className="size-5" aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <h3 className="text-body-2 font-semibold text-heading">
                    {t(`maps.items.${activeMap}.title`)}
                  </h3>

                  <p className="mt-1 text-caption-1 text-body">
                    {t(`maps.items.${activeMap}.address`)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-full bg-surface-secondary p-1">
                {contactMapLocations.map((location) => (
                  <button
                    key={location.key}
                    type="button"
                    onClick={() => setActiveMap(location.key)}
                    className={cn(
                      "min-h-11 rounded-full px-6 text-caption-1 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      activeMap === location.key
                        ? "bg-primary text-primary-foreground"
                        : "text-heading hover:bg-card",
                    )}>
                    {t(`maps.items.${location.key}.tab`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mt-5 min-h-80 overflow-hidden rounded-md border border-stroke bg-surface-secondary sm:min-h-100 lg:min-h-112">
              <iframe
                key={currentLocation.key}
                src={currentLocation.mapSrc}
                title={t(`maps.items.${currentLocation.key}.title`)}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-5 flex justify-end">
              <a
                href={
                  activeMap === "bakaro"
                    ? "https://www.google.com/maps/search/?api=1&query=Bakara+Market+Mogadishu+Somalia"
                    : "https://www.google.com/maps/search/?api=1&query=Igsyidka+Dabka+Mogadishu+Somalia"
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-3 rounded-md bg-primary px-5 text-caption-2 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                {t("maps.directions")}

                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </MotionWrapper>
      </Container>
    </Section>
  );
}
