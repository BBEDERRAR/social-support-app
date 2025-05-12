import { readFileSync } from 'fs';
import path from 'path';

// Define type for the messages structure
type MessageObject = {
  [key: string]: string | MessageObject;
};

describe('Internationalization Configuration', () => {
  let enMessages: MessageObject;
  let arMessages: MessageObject;

  beforeAll(() => {
    const enPath = path.join(process.cwd(), 'messages', 'en.json');
    const arPath = path.join(process.cwd(), 'messages', 'ar.json');
    
    enMessages = JSON.parse(readFileSync(enPath, 'utf8'));
    arMessages = JSON.parse(readFileSync(arPath, 'utf8'));
  });

  test('both language files have the same structure', () => {
    function checkStructure(enObj: MessageObject, arObj: MessageObject, path = '') {
      // Check if both objects have the same keys
      const enKeys = Object.keys(enObj).sort();
      const arKeys = Object.keys(arObj).sort();
      
      expect(enKeys).toEqual(arKeys);
      
      // Recursively check nested objects
      enKeys.forEach(key => {
        const newPath = path ? `${path}.${key}` : key;
        if (typeof enObj[key] === 'object' && enObj[key] !== null) {
          expect(typeof arObj[key]).toBe('object');
          checkStructure(
            enObj[key] as MessageObject, 
            arObj[key] as MessageObject, 
            newPath
          );
        }
      });
    }
    
    checkStructure(enMessages, arMessages);
  });

  test('validation messages are present in both languages', () => {
    expect(enMessages.validation).toBeDefined();
    expect(arMessages.validation).toBeDefined();
    
    const enValidationKeys = Object.keys(enMessages.validation as MessageObject);
    const arValidationKeys = Object.keys(arMessages.validation as MessageObject);
    
    expect(enValidationKeys.sort()).toEqual(arValidationKeys.sort());
  });

  test('form step labels are present in both languages', () => {
    const enForm = enMessages.Form as MessageObject;
    const arForm = arMessages.Form as MessageObject;
    
    expect(enForm.stepper).toBeDefined();
    expect(arForm.stepper).toBeDefined();
    
    const enStepperKeys = Object.keys(enForm.stepper as MessageObject);
    const arStepperKeys = Object.keys(arForm.stepper as MessageObject);
    
    expect(enStepperKeys.sort()).toEqual(arStepperKeys.sort());
  });
}); 