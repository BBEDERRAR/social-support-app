import { ApplicationFormWizard } from "@/components/form/application-form-wizard";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <div className="py-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      <ApplicationFormWizard />
    </div>
  );
}
