import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

import en from "./messages/en.json";
import ar from "./messages/ar.json";

const locales = ["en", "ar"] as const;

type Locale = (typeof locales)[number];

const messages = {
  en,
  ar,
};

function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(savedLocale) ? savedLocale : "en";

  return {
    locale,
    messages: messages[locale],
  };
});