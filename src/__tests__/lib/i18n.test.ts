import { readFileSync } from 'fs';
import path from 'path';

describe('Internationalization Configuration', () => {
  let enMessages: any;
  let arMessages: any;

  beforeAll(() => {
    const enPath = path.join(process.cwd(), 'messages', 'en.json');
    const arPath = path.join(process.cwd(), 'messages', 'ar.json');
    
    enMessages = JSON.parse(readFileSync(enPath, 'utf8'));
    arMessages = JSON.parse(readFileSync(arPath, 'utf8'));
  });

  test('both language files have the same structure', () => {
    function checkStructure(enObj: any, arObj: any, path = '') {
      // Check if both objects have the same keys
      const enKeys = Object.keys(enObj).sort();
      const arKeys = Object.keys(arObj).sort();
      
      expect(enKeys).toEqual(arKeys);
      
      // Recursively check nested objects
      enKeys.forEach(key => {
        const newPath = path ? `${path}.${key}` : key;
        if (typeof enObj[key] === 'object' && enObj[key] !== null) {
          expect(typeof arObj[key]).toBe('object');
          checkStructure(enObj[key], arObj[key], newPath);
        }
      });
    }
    
    checkStructure(enMessages, arMessages);
  });

  test('validation messages are present in both languages', () => {
    expect(enMessages.validation).toBeDefined();
    expect(arMessages.validation).toBeDefined();
    
    const enValidationKeys = Object.keys(enMessages.validation);
    const arValidationKeys = Object.keys(arMessages.validation);
    
    expect(enValidationKeys.sort()).toEqual(arValidationKeys.sort());
  });

  test('form step labels are present in both languages', () => {
    expect(enMessages.Form.stepper).toBeDefined();
    expect(arMessages.Form.stepper).toBeDefined();
    
    const enStepperKeys = Object.keys(enMessages.Form.stepper);
    const arStepperKeys = Object.keys(arMessages.Form.stepper);
    
    expect(enStepperKeys.sort()).toEqual(arStepperKeys.sort());
  });
}); 