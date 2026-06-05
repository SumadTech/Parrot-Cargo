"use client";

import { LanguageToggle } from "@/components/common/language-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { TopHeader } from "@/components/layout/top-header";
import { navigationItems } from "@/config/navigation";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QuoteButton } from "../common/quote-button";
import { ThemeToggle } from "../common/theme-toggle";

type AuthMeResponse = {
  authenticated: boolean;
  user?: {
    email: string;
    role: "admin";
  };
};

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

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

  useEffect(() => {
    let cancelled = false;

    async function checkAdminAuth() {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = (await res.json()) as AuthMeResponse;

        if (!cancelled) {
          setIsAdminLoggedIn(Boolean(data.authenticated));
        }
      } catch {
        if (!cancelled) {
          setIsAdminLoggedIn(false);
        }
      }
    }

    checkAdminAuth();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "hidden overflow-hidden transition-all duration-300 lg:block",
          isScrolled ? "max-h-0 opacity-0" : "max-h-14 opacity-100",
        )}
      >
        <TopHeader isScrolled={isScrolled} />
      </div>

      <div
        className={cn(
          "transition-colors duration-300",
          isScrolled
            ? "border-b border-border bg-surface/95 shadow-sm backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-page relative flex items-center justify-between gap-4 transition-all duration-300",
            isScrolled ? "h-18" : "h-20",
          )}
        >
          <Link href="/" aria-label="Parrot Cargo home" className="shrink-0">
            <Image
              src={logo}
              alt="Parrot Cargo"
              width={120}
              height={72}
              priority
              className={cn(
                "h-auto transition-all duration-300",
                isScrolled
                  ? "mb-0 w-16 sm:w-20 lg:w-24"
                  : "mb-4 w-18 sm:w-24 lg:w-28",
              )}
            />
          </Link>

          <nav
            aria-label="Main navigation"
            className={cn(
              "hidden items-center rounded-full border px-2 py-2 backdrop-blur-xl lg:flex",
              isScrolled
                ? "border-border bg-card text-heading"
                : "border-white/20 bg-card/20 text-card",
            )}
          >
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-5 py-1 text-caption-1 font-medium transition-colors",
                  isScrolled
                    ? "text-heading hover:bg-accent"
                    : "text-white hover:bg-card/20",
                )}
              >
                {t(item.labelKey)}
              </Link>
            ))}

            {isAdminLoggedIn ? (
              <Link
                href="/admin"
                className={cn(
                  "rounded-full px-5 py-1 text-caption-1 font-medium transition-colors",
                  isScrolled
                    ? "text-heading hover:bg-accent"
                    : "text-white hover:bg-card/20",
                )}
              >
                Dashboard
              </Link>
            ) : null}
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

            <QuoteButton
              href="/contact"
              variant={isScrolled ? "primary" : "light"}
            >
              {t("requestQuote")}
            </QuoteButton>
          </div>

          <MobileNav
            isScrolled={isScrolled}
            isAdminLoggedIn={isAdminLoggedIn}
          />
        </div>
      </div>
    </header>
  );
}