"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Spinner } from "@/components/ui/spinner";

interface HelpMeWriteButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function HelpMeWriteButton({
  onClick,
  isLoading = false,
}: HelpMeWriteButtonProps) {
  const t = useTranslations("AI");

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={isLoading}
      className="text-xs gap-1"
    >
      {isLoading ? (
        <Spinner className="h-3 w-3" />
      ) : (
        <Sparkles className="h-3 w-3" />
      )}
      {t("helpMeWrite")}
    </Button>
  );
}
