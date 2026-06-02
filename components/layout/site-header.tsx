"use client";

import { LanguageToggle } from "@/components/common/language-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { TopHeader } from "@/components/layout/top-header";
import { navigationItems } from "@/config/navigation";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.png";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../common/theme-toggle";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("navigation");

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <TopHeader isScrolled={isScrolled} />

      <div
        className={cn(
          "transition-colors duration-300",
          isScrolled
            ? "border-b border-border bg-surface/95  backdrop-blur-xl"
            : "bg-transparent",
        )}>
        <div className="container-page relative flex h-20 items-center justify-between gap-4">
          <Link href="/" aria-label="Parrot Cargo home" className="shrink-0">
            <Image
              src={logo}
              alt="Parrot Cargo"
              width={120}
              height={72}
              priority
              className="h-auto w-18 sm:w-24 lg:w-28 mb-4"
            />
          </Link>

          <nav
            aria-label="Main navigation"
            className={cn(
              "hidden items-center rounded-full border px-2 py-2 backdrop-blur-xl lg:flex",
              isScrolled
                ? "border-border bg-card text-heading "
                : "border-white/20 bg-card/20 text-card",
            )}>
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-5 py-1 text-caption-1 font-medium transition-colors",
                  isScrolled
                    ? "text-heading hover:bg-accent"
                    : "text-white hover:bg-card/20",
                )}>
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle
              className={cn(
                isScrolled
                  ? "border-border bg-card text-heading hover:bg-accent"
                  : "border-white/20 bg-card/15 text-white hover:bg-card/25",
              )}
            />

            <ThemeToggle />

            <Link
              href="/contact"
              className={cn(
                "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-5 text-caption-1 font-semibold transition-colors",
                isScrolled
                  ? "bg-primary text-primary-foreground hover:bg-blue-normal-hover"
                  : "bg-card text-heading hover:bg-card/90",
              )}>
              {t("requestQuote")}
              <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </div>

          <MobileNav isScrolled={isScrolled} />
        </div>
      </div>
    </header>
  );
}
