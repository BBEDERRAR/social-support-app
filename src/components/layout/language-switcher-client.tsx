"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSwitcherClientProps {
  initialLocale: string;
}

export function LanguageSwitcherClient({
  initialLocale,
}: LanguageSwitcherClientProps) {
  const t = useTranslations("Common");
  const router = useRouter();

  const handleChange = (value: string) => {
    // Set cookie using client-side JavaScript
    document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <Select value={initialLocale} onValueChange={handleChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={t("selectLanguage")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ar">العربية</SelectItem>
      </SelectContent>
    </Select>
  );
}
