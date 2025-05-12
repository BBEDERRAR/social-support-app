import { 
  createPersonalInfoSchema,
  createFamilyFinancialSchema,
  createSituationSchema,
  createApplicationSchema
} from '@/lib/zod-schemas';

// Mock translation function for testing
const mockT = (key: string) => `${key}_translated`;

describe('Personal Info Schema Validation', () => {
  const schema = createPersonalInfoSchema(mockT);

  test('validates correct personal information', () => {
    const validData = {
      name: 'John Doe',
      nationalId: '123456789012345',
      dateOfBirth: '1990-01-01',
      gender: 'male',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      phone: '1234567890',
      email: 'john.doe@example.com',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('rejects invalid name', () => {
    const invalidData = {
      name: 'J', // Too short
      nationalId: '123456789012345',
      dateOfBirth: '1990-01-01',
      gender: 'male',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      phone: '1234567890',
      email: 'john.doe@example.com',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe('name');
    }
  });

  test('rejects invalid national ID format', () => {
    const invalidData = {
      name: 'John Doe',
      nationalId: '12345', // Wrong format
      dateOfBirth: '1990-01-01',
      gender: 'male',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      phone: '1234567890',
      email: 'john.doe@example.com',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe('nationalId');
    }
  });

  test('rejects future date of birth', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    
    const invalidData = {
      name: 'John Doe',
      nationalId: '123456789012345',
      dateOfBirth: futureDate.toISOString().split('T')[0],
      gender: 'male',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      phone: '1234567890',
      email: 'john.doe@example.com',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe('dateOfBirth');
    }
  });

  test('rejects invalid email format', () => {
    const invalidData = {
      name: 'John Doe',
      nationalId: '123456789012345',
      dateOfBirth: '1990-01-01',
      gender: 'male',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      phone: '1234567890',
      email: 'invalid-email',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe('email');
    }
  });
});

describe('Family & Financial Schema Validation', () => {
  const schema = createFamilyFinancialSchema(mockT);

  test('validates correct family and financial information', () => {
    const validData = {
      maritalStatus: 'married',
      dependents: 2,
      employmentStatus: 'employed',
      monthlyIncome: 5000,
      housingStatus: 'owner',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('rejects invalid marital status', () => {
    const invalidData = {
      maritalStatus: 'unknown', // Not in enum
      dependents: 2,
      employmentStatus: 'employed',
      monthlyIncome: 5000,
      housingStatus: 'owner',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe('maritalStatus');
    }
  });

  test('rejects negative monthly income', () => {
    const invalidData = {
      maritalStatus: 'married',
      dependents: 2,
      employmentStatus: 'employed',
      monthlyIncome: -100, // Negative value
      housingStatus: 'owner',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe('monthlyIncome');
    }
  });
});

describe('Situation Schema Validation', () => {
  const schema = createSituationSchema(mockT);

  test('validates correct situation description', () => {
    const validData = {
      financialSituation: 'I have been struggling financially for the past six months after losing my job due to company downsizing.',
      employmentCircumstances: 'I have been applying for jobs consistently but have not received any offers. My field has limited opportunities.',
      reasonForApplying: 'I am applying for support to help cover basic expenses while I continue my job search and possibly retrain for a new career.',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('rejects too short financial situation description', () => {
    const invalidData = {
      financialSituation: 'Short description', // Too short
      employmentCircumstances: 'I have been applying for jobs consistently but have not received any offers. My field has limited opportunities.',
      reasonForApplying: 'I am applying for support to help cover basic expenses while I continue my job search and possibly retrain for a new career.',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe('financialSituation');
    }
  });
});

describe('Full Application Schema Validation', () => {
  const schema = createApplicationSchema(mockT);

  test('validates complete valid application', () => {
    const validData = {
      // Personal info
      name: 'John Doe',
      nationalId: '123456789012345',
      dateOfBirth: '1990-01-01',
      gender: 'male',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      phone: '1234567890',
      email: 'john.doe@example.com',
      
      // Family & Financial info
      maritalStatus: 'married',
      dependents: 2,
      employmentStatus: 'employed',
      monthlyIncome: 5000,
      housingStatus: 'owner',
      
      // Situation description
      financialSituation: 'I have been struggling financially for the past six months after losing my job due to company downsizing.',
      employmentCircumstances: 'I have been applying for jobs consistently but have not received any offers. My field has limited opportunities.',
      reasonForApplying: 'I am applying for support to help cover basic expenses while I continue my job search and possibly retrain for a new career.',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('rejects application with missing fields', () => {
    const invalidData = {
      // Missing several required fields
      name: 'John Doe',
      email: 'john.doe@example.com',
      maritalStatus: 'married',
      housingStatus: 'owner',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
}); 