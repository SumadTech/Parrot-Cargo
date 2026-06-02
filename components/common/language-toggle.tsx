"use client";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

type LanguageToggleProps = {
  className?: string;
  showLabel?: boolean;
};

export function LanguageToggle({
  className,
  showLabel = true,
}: LanguageToggleProps) {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const nextLocale = locale === "ar" ? "en" : "ar";

  function switchLanguage() {
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      disabled={isPending}
      aria-label="Switch language"
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/20 bg-card/15 px-4 text-caption-1 font-medium text-white backdrop-blur-md transition-colors hover:bg-card/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:pointer-events-none disabled:opacity-60",
        className,
      )}>
      <Languages className="size-4" />
      {showLabel ? (
        <span>{locale === "ar" ? "العربية" : "English"}</span>
      ) : null}
    </button>
  );
}
