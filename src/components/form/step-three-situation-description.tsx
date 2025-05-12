"use client";

import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { HelpMeWriteButton } from "@/components/form/help-me-write-button";
import { useState } from "react";
import { AiSuggestionDialog } from "@/components/form/ai-suggestion-dialog";

export function StepThreeSituationDescription() {
  const { control, setValue, getValues } = useFormContext();
  const t = useTranslations("Form.Situation");

  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [currentField, setCurrentField] = useState<
    | "financialSituation"
    | "employmentCircumstances"
    | "reasonForApplying"
    | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to gather all personal info fields
  const getPersonalInfo = () => {
    const values = getValues();
    return {
      name: values.name,
      nationalId: values.nationalId,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      address: values.address,
      city: values.city,
      state: values.state,
      country: values.country,
      phone: values.phone,
      email: values.email,
      maritalStatus: values.maritalStatus,
      dependents: values.dependents,
      employmentStatus: values.employmentStatus,
      monthlyIncome: values.monthlyIncome,
      housingStatus: values.housingStatus,
    };
  };

  const handleGetAiSuggestion = async (
    fieldName:
      | "financialSituation"
      | "employmentCircumstances"
      | "reasonForApplying",
    currentValue: string
  ) => {
    setIsLoading(true);
    setCurrentField(fieldName);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          field: fieldName,
          currentValue: currentValue,
          personalInfo: getPersonalInfo(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI suggestion");
      }

      const data = await response.json();
      setAiSuggestion(data.suggestion);
      setIsAiDialogOpen(true);
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptSuggestion = () => {
    if (currentField) {
      setValue(currentField, aiSuggestion, { shouldValidate: true });
    }
    handleCloseDialog();
  };

  const handleEditSuggestion = (editedSuggestion: string) => {
    setAiSuggestion(editedSuggestion);
  };

  const handleCloseDialog = () => {
    setIsAiDialogOpen(false);
    setAiSuggestion("");
    setCurrentField(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="space-y-6">
        <FormField
          control={control}
          name="financialSituation"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>{t("financialSituation")}</FormLabel>
                <HelpMeWriteButton
                  onClick={() =>
                    handleGetAiSuggestion("financialSituation", field.value)
                  }
                  isLoading={isLoading && currentField === "financialSituation"}
                />
              </div>
              <FormDescription>{t("financialSituationHelp")}</FormDescription>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder={t("financialSituationPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="employmentCircumstances"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>{t("employmentCircumstances")}</FormLabel>
                <HelpMeWriteButton
                  onClick={() =>
                    handleGetAiSuggestion(
                      "employmentCircumstances",
                      field.value
                    )
                  }
                  isLoading={
                    isLoading && currentField === "employmentCircumstances"
                  }
                />
              </div>
              <FormDescription>
                {t("employmentCircumstancesHelp")}
              </FormDescription>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder={t("employmentCircumstancesPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="reasonForApplying"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>{t("reasonForApplying")}</FormLabel>
                <HelpMeWriteButton
                  onClick={() =>
                    handleGetAiSuggestion("reasonForApplying", field.value)
                  }
                  isLoading={isLoading && currentField === "reasonForApplying"}
                />
              </div>
              <FormDescription>{t("reasonForApplyingHelp")}</FormDescription>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder={t("reasonForApplyingPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <AiSuggestionDialog
        isOpen={isAiDialogOpen}
        onClose={handleCloseDialog}
        suggestion={aiSuggestion}
        onAccept={handleAcceptSuggestion}
        onEdit={handleEditSuggestion}
      />
    </div>
  );
}
