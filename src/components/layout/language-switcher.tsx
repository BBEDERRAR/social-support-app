import { LanguageSwitcherClient } from "./language-switcher-client";
import { getLocale } from "next-intl/server";

export async function LanguageSwitcher() {
  // Server component can use useLocale directly
  const locale = await getLocale();

  return <LanguageSwitcherClient initialLocale={locale} />;
}
