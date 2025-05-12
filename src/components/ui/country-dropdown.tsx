"use client";
import React, { forwardRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// data
import { countries } from "country-data-list";

// Country interface
export interface Country {
  alpha2: string;
  alpha3: string;
  name: string;
}

// Dropdown props
interface CountryDropdownProps {
  onChange?: (countryCode: string) => void;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const CountryDropdownComponent = (
  {
    onChange,
    value,
    disabled = false,
    placeholder = "Select a country",
    className,
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  // Filter only countries with names, active status, and valid alpha3 codes
  const options = countries.all.filter(
    (country: { name: string; status: string; alpha3: string }) =>
      country.name &&
      country.status !== "deleted" &&
      country.alpha3 &&
      country.alpha3.trim() !== ""
  );

  const handleValueChange = (newValue: string) => {
    onChange?.(newValue);
  };

  return (
    <Select
      defaultValue={value}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <SelectTrigger
        ref={ref}
        className={`w-full ${className || ""}`}
        {...props}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-full">
        {options.map((country, index) => (
          <SelectItem
            key={`${country.alpha3 || country.name}-${index}`}
            value={country.alpha3 || `country-${index}`}
          >
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

CountryDropdownComponent.displayName = "CountryDropdown";

export const CountryDropdown = forwardRef(CountryDropdownComponent);
