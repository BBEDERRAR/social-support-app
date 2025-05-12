"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AiSuggestionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  suggestion: string;
  onAccept: () => void;
  onEdit: (editedSuggestion: string) => void;
}

export function AiSuggestionDialog({
  isOpen,
  onClose,
  suggestion,
  onAccept,
  onEdit,
}: AiSuggestionDialogProps) {
  const t = useTranslations("AI");
  const [editedSuggestion, setEditedSuggestion] = useState(suggestion);

  // Update local state when suggestion changes
  if (suggestion !== editedSuggestion && suggestion !== "") {
    setEditedSuggestion(suggestion);
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedSuggestion(e.target.value);
    onEdit(e.target.value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("suggestionTitle")}</DialogTitle>
          <DialogDescription>{t("suggestionDescription")}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Textarea
            value={editedSuggestion}
            onChange={handleChange}
            rows={10}
            className="resize-none"
            placeholder={t("suggestionPlaceholder")}
          />
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("discard")}
          </Button>
          <Button type="button" onClick={onAccept}>
            {t("accept")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
