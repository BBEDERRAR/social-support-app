"use client";

import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StepTwoFamilyFinancialInfo() {
  const { control } = useFormContext();
  const t = useTranslations("Form.FamilyFinancial");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("maritalStatus")}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("selectMaritalStatus")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="single">{t("single")}</SelectItem>
                  <SelectItem value="married">{t("married")}</SelectItem>
                  <SelectItem value="divorced">{t("divorced")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dependents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dependents")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="employmentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("employmentStatus")}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("selectEmploymentStatus")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="employed">{t("employed")}</SelectItem>
                  <SelectItem value="unemployed">{t("unemployed")}</SelectItem>
                  <SelectItem value="self-employed">
                    {t("selfEmployed")}
                  </SelectItem>
                  <SelectItem value="retired">{t("retired")}</SelectItem>
                  <SelectItem value="student">{t("student")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="monthlyIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("monthlyIncome")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="housingStatus"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>{t("housingStatus")}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("selectHousingStatus")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="owner">{t("owner")}</SelectItem>
                  <SelectItem value="renting">{t("renting")}</SelectItem>
                  <SelectItem value="with_family">{t("withFamily")}</SelectItem>
                  <SelectItem value="homeless">{t("homeless")}</SelectItem>
                  <SelectItem value="other">{t("other")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
