import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const t = useTranslations("Common");

  return (
    <header className="w-full py-4 bg-primary/5 border-b px-3 lg:px-8">
      <div className="container flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">{t("portalTitle")}</h1>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
