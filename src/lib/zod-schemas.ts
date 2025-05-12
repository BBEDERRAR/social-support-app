import { z } from 'zod';

// Personal Information Schema (Step 1)
export const createPersonalInfoSchema = (t: any) => z.object({
  name: z.string().min(2, { message: t('validation.nameRequired') }),
  nationalId: z.string()
    .regex(/^\d{15}$/, { 
      message: t('validation.nationalIdInvalid') || 'National ID should be 15 digits (no hyphens)' 
    }),
  dateOfBirth: z.string().refine((val) => {
    const date = new Date(val);
    const today = new Date();
    return !isNaN(date.getTime()) && date <= today;
  }, { message: t('validation.dobInvalid') || 'Date of birth cannot be in the future' }),
  gender: z.enum(['male', 'female'], { 
    errorMap: () => ({ message: t('validation.genderRequired') })
  }),
  address: z.string().min(5, { message: t('validation.addressRequired') }),
  city: z.string().min(2, { message: t('validation.cityRequired') }),
  state: z.string().min(2, { message: t('validation.stateRequired') }),
  country: z.string().min(2, { message: t('validation.countryRequired') }),
  phone: z.string().min(8, { message: t('validation.phoneRequired') }),
  email: z.string().email({ message: t('validation.emailInvalid') }),
});

// Family & Financial Information Schema (Step 2)
export const createFamilyFinancialSchema = (t: any) => z.object({
  maritalStatus: z.enum(['single', 'married', 'divorced'], {
    errorMap: () => ({ message: t('validation.maritalStatusRequired') })
  }),
  dependents: z.number().min(0, { message: t('validation.dependentRequired') }),
  employmentStatus: z.enum(['employed', 'unemployed', 'self-employed', 'retired', 'student'], {
    errorMap: () => ({ message: t('validation.employmentStatusRequired') })
  }),
  monthlyIncome: z.number().min(0, { message: t('validation.incomeRequired') }),
  housingStatus: z.enum(['owner', 'renting', 'with_family', 'homeless', 'other'], {
    errorMap: () => ({ message: t('validation.housingStatusRequired') })
  }),
});

// Situation Description Schema (Step 3)
export const createSituationSchema = (t: any) => z.object({
  financialSituation: z.string().min(50, { message: t('validation.financialSituationRequired') }),
  employmentCircumstances: z.string().min(50, { message: t('validation.employmentCircumstancesRequired') }),
  reasonForApplying: z.string().min(50, { message: t('validation.reasonRequired') }),
});

// Combined schema for the entire form
export const createApplicationSchema = (t: any) => z.object({
  ...createPersonalInfoSchema(t).shape,
  ...createFamilyFinancialSchema(t).shape,
  ...createSituationSchema(t).shape,
}); 