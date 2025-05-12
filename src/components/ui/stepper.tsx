"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface StepItem {
  id: string | number;
  label: string;
  icon: LucideIcon;
}

interface StepperProps {
  steps: StepItem[];
  currentStep: string | number;
  className?: string;
  ariaLabel?: string;
}

export function Stepper({
  steps,
  currentStep,
  className,
  ariaLabel,
}: StepperProps) {
  return (
    <div
      className={cn("flex justify-center", className)}
      aria-label={ariaLabel || "Form Progress"}
      role="list"
    >
      <div className="flex items-center">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <div
                className="flex flex-col items-center"
                role="listitem"
                aria-current={currentStep === step.id ? "step" : undefined}
              >
                <div
                  className={cn(
                    "size-16 rounded-full flex items-center justify-center",
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  <Icon className="size-8" aria-hidden="true" />
                </div>
                <span className="text-sm mt-2 font-medium">{step.label}</span>
              </div>

              {/* Line between steps (except after the last step) */}
              {index < steps.length - 1 && (
                <div
                  className="h-1 w-16 mx-2 bg-secondary self-start mt-8"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
