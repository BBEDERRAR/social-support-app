import { useTranslations } from "next-intl";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const t = useTranslations("Success");

  return (
    <div className="max-w-lg mx-auto py-12 text-center">
      <div className="mb-6 flex justify-center">
        <CheckCircle className="h-20 w-20 text-green-500" />
      </div>

      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>

      <div className="space-y-4 mb-8">
        <p>{t("message")}</p>
        <p className="text-muted-foreground">{t("nextSteps")}</p>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {t("referenceNumberLabel")}
        </p>
        <div className="bg-primary/5 p-3 rounded-md font-mono">
          {/* Generate a random reference ID for demonstration purposes */}
          {`APP-${Math.floor(Math.random() * 900000) + 100000}`}
        </div>
      </div>

      <div className="mt-8">
        <Button asChild>
          <Link href="/">{t("backToHome")}</Link>
        </Button>
      </div>
    </div>
  );
}
