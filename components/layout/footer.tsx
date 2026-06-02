import { Container } from "@/components/common/container";
import { siteConfig } from "@/config/site";
import logo from "@/public/images/logo.png";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { CiLinkedin } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa6";
import { SlSocialInstagram } from "react-icons/sl";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

const quickLinks = [
  {
    key: "home",
    href: "/",
  },
  {
    key: "about",
    href: "/about",
  },
  {
    key: "services",
    href: "/services",
  },
  {
    key: "industries",
    href: "/#industries",
  },
  {
    key: "contact",
    href: "/contact",
  },
] as const;

const serviceLinks = [
  {
    key: "airFreight",
    href: "/services/air-freight",
  },
  {
    key: "seaFreight",
    href: "/services/sea-freight",
  },
  {
    key: "customClearance",
    href: "/services/customs-clearance",
  },
  {
    key: "projectHandling",
    href: "/services/project-cargo",
  },
] as const;

const socials = [
  {
    key: "facebook",
    href: siteConfig.socials.facebook,
    Icon: FaFacebookF,
  },
  {
    key: "x",
    href: siteConfig.socials.x,
    Icon: FaXTwitter,
  },
  {
    key: "instagram",
    href: siteConfig.socials.instagram,
    Icon: SlSocialInstagram,
  },
  {
    key: "linkedin",
    href: siteConfig.socials.linkedin,
    Icon: CiLinkedin,
  },
] as const;

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-primary text-primary-foreground">
      <Container>
        <div className="border-b border-primary-foreground/15 py-10 sm:py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:items-center">
            <h2 className="max-w-xl text-heading-4 text-primary-foreground">
              {t("newsletter.title")}
            </h2>

            <form className="flex w-full flex-col gap-3 sm:flex-row lg:justify-end">
              <label htmlFor="newsletter-email" className="sr-only">
                {t("newsletter.emailLabel")}
              </label>

              <input
                id="newsletter-email"
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="min-h-12 w-full rounded-full border border-primary-foreground/10 bg-primary-foreground/20 px-5 text-caption-1 text-primary-foreground placeholder:text-primary-foreground/70 outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/40 sm:max-w-82.5"
              />

              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-card py-1.5 pe-1.5 ps-5 text-caption-2 font-semibold text-primary transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                {t("newsletter.submit")}
                <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 border-b border-primary-foreground/15 py-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_0.8fr_1.1fr] lg:gap-12">
          <div>
            <Link
              href="/"
              aria-label={siteConfig.name}
              className="inline-flex outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              <Image
                src={logo}
                alt={t("logoAlt")}
                width={92}
                height={92}
                className="h-auto w-20 sm:w-24"
              />
            </Link>

            <p className="mt-5 max-w-xs text-caption-1 text-primary-foreground/80">
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="text-body-3 font-semibold text-primary-foreground">
              {t("quickLinks.title")}
            </h3>

            <div className="mt-3 h-px w-full bg-primary-foreground/15" />

            <ul className="mt-5 grid gap-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-caption-1 text-primary-foreground/80 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    {t(`quickLinks.items.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-body-3 font-semibold text-primary-foreground">
              {t("services.title")}
            </h3>

            <div className="mt-3 h-px w-full bg-primary-foreground/15" />

            <ul className="mt-5 grid gap-3">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-caption-1 text-primary-foreground/80 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    {t(`services.items.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-body-3 font-semibold text-primary-foreground">
              {t("contact.title")}
            </h3>

            <div className="mt-3 h-px w-full bg-primary-foreground/15" />

            <ul className="mt-5 grid gap-4">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-secondary" />
                <div>
                  <p className="text-caption-1 font-semibold text-primary-foreground">
                    {t("contact.somalia.title")}
                  </p>
                  <p className="mt-1 text-caption-2 text-primary-foreground/75">
                    {t("contact.somalia.address")}
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-secondary" />
                <Link
                  href={`tel:${siteConfig.contact.somaliaDesk.replace(/\s/g, "")}`}
                  className="text-caption-1 text-primary-foreground/80 transition-colors hover:text-secondary"
                >
                  {siteConfig.contact.somaliaDesk}
                </Link>
              </li>

              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-secondary" />
                <div>
                  <p className="text-caption-1 font-semibold text-primary-foreground">
                    {t("contact.china.title")}
                  </p>
                  <p className="mt-1 text-caption-2 text-primary-foreground/75">
                    {t("contact.china.address")}
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-secondary" />
                <Link
                  href={`tel:${siteConfig.contact.chinaOps.replace(/\s/g, "")}`}
                  className="text-caption-1 text-primary-foreground/80 transition-colors hover:text-secondary"
                >
                  {siteConfig.contact.chinaOps}
                </Link>
              </li>

              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-secondary" />
                <Link
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all text-caption-1 text-primary-foreground/80 transition-colors hover:text-secondary"
                >
                  {siteConfig.contact.email}
                </Link>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {socials.map(({ key, href, Icon }) => (
                <Link
                  key={key}
                  href={href}
                  aria-label={t(`socials.${key}`)}
                  className="grid size-9 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 text-caption-2  sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">{t("copyright", { year: new Date().getFullYear() })}</p>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-secondary"
            >
              {t("legal.privacy")}
            </Link>
            <span aria-hidden="true">|</span>
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-secondary"
            >
              {t("legal.terms")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}