"use client";

import { useFormContext, useWatch } from "react-hook-form";
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

import { CountryDropdown } from "@/components/ui/country-dropdown";

export function StepOnePersonalInfo() {
  const { control, setValue } = useFormContext();
  const t = useTranslations("Form.PersonalInfo");

  // Watch for country changes to conditionally render city field
  const selectedCountry = useWatch({
    control,
    name: "country",
    defaultValue: "",
  });

  // Check if UAE is selected
  const isUAE = selectedCountry === "ARE";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">{t("name")}</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  {...field}
                  aria-describedby="name-error"
                  placeholder={t("namePlaceholder")}
                />
              </FormControl>
              <FormMessage id="name-error" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="nationalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("nationalId")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("nationalIdPlaceholder")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel htmlFor="dateOfBirth">{t("dateOfBirth")}</FormLabel>
              <FormControl>
                <Input
                  id="dateOfBirth"
                  {...field}
                  placeholder={t("dateOfBirthPlaceholder")}
                  type="date"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="gender">{t("gender")}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl className="w-full">
                  <SelectTrigger id="gender" aria-label={t("gender")}>
                    <SelectValue placeholder={t("selectGender")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">{t("male")}</SelectItem>
                  <SelectItem value="female">{t("female")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("country")}</FormLabel>
              <CountryDropdown
                placeholder={t("selectCountry")}
                value={field.value ? field.value : "ARE"}
                onChange={(country) => {
                  field.onChange(country);
                  if (country !== "ARE") {
                    setValue("state", "");
                  }
                }}
                aria-label={t("country")}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("state")}</FormLabel>
              {isUAE ? (
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectEmirateCity")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="abu_dhabi">
                      {t("emirates.abuDhabi")}
                    </SelectItem>
                    <SelectItem value="dubai">{t("emirates.dubai")}</SelectItem>
                    <SelectItem value="sharjah">
                      {t("emirates.sharjah")}
                    </SelectItem>
                    <SelectItem value="ajman">{t("emirates.ajman")}</SelectItem>
                    <SelectItem value="umm_al_quwain">
                      {t("emirates.ummAlQuwain")}
                    </SelectItem>
                    <SelectItem value="ras_al_khaimah">
                      {t("emirates.rasAlKhaimah")}
                    </SelectItem>
                    <SelectItem value="fujairah">
                      {t("emirates.fujairah")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <FormControl>
                  <Input {...field} placeholder={t("statePlaceholder")} />
                </FormControl>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="city">{t("city")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("cityPlaceholder")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("phone")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  placeholder={t("phonePlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>{t("address")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("addressPlaceholder")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t("emailPlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
