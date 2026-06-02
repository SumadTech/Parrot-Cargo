"use client";

import { LanguageToggle } from "@/components/common/language-toggle";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { navigationItems } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

type MobileNavProps = {
  isScrolled: boolean;
};

export function MobileNav({ isScrolled }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("navigation");

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((value) => !value)}
        className={cn(
          "grid size-11 place-items-center rounded-full border transition-colors",
          isScrolled
            ? "border-border bg-card text-heading"
            : "border-white/20 bg-card/15 text-white backdrop-blur-md",
        )}>
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {isOpen ? (
        <div className="absolute inset-x-4 top-[calc(100%+0.75rem)] rounded-3xl border border-border bg-card p-4 text-card-foreground shadow-xl">
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 text-caption-1 font-medium text-heading transition-colors hover:bg-accent">
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="mt-4 grid gap-3 border-t border-border pt-4">
            <LanguageToggle className="w-full border-border bg-muted text-heading hover:bg-accent" />

            <div className="flex items-center justify-between gap-3">
              <span className="text-caption-1 font-medium text-heading">
                Theme
              </span>
              <ThemeToggle />
            </div>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover">
              {t("requestQuote")}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
