"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
}

export function ThemeToggle() {
  const isClient = useIsClient();
  const { resolvedTheme, setTheme } = useTheme();

  if (!isClient) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-heading"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-heading transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}