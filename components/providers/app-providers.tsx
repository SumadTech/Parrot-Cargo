"use client";

import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/providers/theme-provider";
import {Toaster} from "sonner";
type AppProvidersProps = {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
};

export function AppProviders({
  children,
  locale,
  messages,
}: AppProvidersProps) {
  return (
    <ThemeProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
        <Toaster richColors position="top-right" />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}