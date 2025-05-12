"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";
import { createApplicationSchema } from "@/lib/zod-schemas";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { StepOnePersonalInfo } from "./step-one-personal-info";
import { StepTwoFamilyFinancialInfo } from "./step-two-family-financial-info";
import { StepThreeSituationDescription } from "./step-three-situation-description";
import { Button } from "@/components/ui/button";
import { Stepper, StepItem } from "@/components/ui/stepper";
import { User, Wallet, FileText } from "lucide-react";
import { FormData } from "@/lib/types";

const FORM_STORAGE_KEY = "social-support-application";
const TOTAL_STEPS = 3;

export function ApplicationFormWizard() {
  const t = useTranslations();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [storedFormData, setStoredFormData] = useLocalStorage<
    Partial<FormData>
  >(FORM_STORAGE_KEY, {
    country: "ARE",
  });

  // Create form methods with the appropriate schema and mode
  const formMethods = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(createApplicationSchema(t)),
    defaultValues: storedFormData,
  });

  // Ensure form is reset with localStorage data on component mount
  useEffect(() => {
    formMethods.reset(storedFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save form data to localStorage on changes
  useEffect(() => {
    const subscription = formMethods.watch((values) => {
      if (Object.keys(values).length > 0) {
        setStoredFormData({ ...storedFormData, ...values });
      }
    });
    return () => subscription.unsubscribe();
  }, [formMethods, setStoredFormData, storedFormData]);

  // Stepper steps with translations
  const stepperSteps: StepItem[] = [
    {
      id: 1,
      label: t("Form.stepper.personalInfo"),
      icon: User,
    },
    {
      id: 2,
      label: t("Form.stepper.familyFinancial"),
      icon: Wallet,
    },
    {
      id: 3,
      label: t("Form.stepper.situation"),
      icon: FileText,
    },
  ];

  // Handle next step
  const handleNext = async () => {
    let isValid = false;

    // Validate only the current step's fields
    if (currentStep === 1) {
      isValid = await formMethods.trigger([
        "name",
        "nationalId",
        "dateOfBirth",
        "gender",
        "address",
        "city",
        "state",
        "country",
        "phone",
        "email",
      ]);
    } else if (currentStep === 2) {
      isValid = await formMethods.trigger([
        "maritalStatus",
        "dependents",
        "employmentStatus",
        "monthlyIncome",
        "housingStatus",
      ]);
    } else if (currentStep === 3) {
      isValid = await formMethods.trigger([
        "financialSituation",
        "employmentCircumstances",
        "reasonForApplying",
      ]);
    }

    if (!isValid) return;

    // Save current data to localStorage
    const currentValues = formMethods.getValues();
    setStoredFormData({ ...storedFormData, ...currentValues });

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Clear form data from localStorage
        setStoredFormData({});
        // Navigate to success page
        router.push("/success");
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOnePersonalInfo />;
      case 2:
        return <StepTwoFamilyFinancialInfo />;
      case 3:
        return <StepThreeSituationDescription />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Stepper
        steps={stepperSteps}
        currentStep={currentStep}
        className="mb-8"
        aria-label="Form Progress"
      />

      <FormProvider {...formMethods}>
        <form
          className="space-y-8"
          onSubmit={formMethods.handleSubmit(handleSubmit)}
        >
          {renderStep()}

          <div className="flex justify-between pt-6 border-t">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" onClick={handlePrevious}>
                {t("Form.previous")}
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < TOTAL_STEPS ? (
              <Button type="button" onClick={handleNext}>
                {t("Form.next")}
              </Button>
            ) : (
              <Button type="submit">{t("Form.submit")}</Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
