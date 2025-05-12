
export type FormData = {
    // Step 1: Personal Information
    name: string;
    nationalId: string;
    dateOfBirth: string;
    gender: "male" | "female";
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
  
    // Step 2: Family & Financial
    maritalStatus: "single" | "married" | "divorced";
    dependents: number;
    employmentStatus:
      | "employed"
      | "unemployed"
      | "self-employed"
      | "retired"
      | "student";
    monthlyIncome: number;
    housingStatus: "owner" | "renting" | "with_family" | "homeless" | "other";
  
    // Step 3: Situation Description
    financialSituation: string;
    employmentCircumstances: string;
    reasonForApplying: string;
  };