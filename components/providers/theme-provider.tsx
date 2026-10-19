"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      themes={["light", "dark"]}
      storageKey="parrot-cargo-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}