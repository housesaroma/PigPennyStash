import { FormControl } from '@angular/forms';
import { createPasswordStrengthValidator } from './password-strength-validator.directive';

describe('createPasswordStrengthValidator', () => {
  const validator = createPasswordStrengthValidator();

  it('should return null for valid password', () => {
    const control = new FormControl('StrongPass1');
    expect(validator(control)).toBeNull();
  });

  it('should return error if password is too short', () => {
    const control = new FormControl('S1a');
    expect(validator(control)).toEqual({ passwordStrength: true });
  });

  it('should return error if password has no uppercase', () => {
    const control = new FormControl('weakpass1');
    expect(validator(control)).toEqual({ passwordStrength: true });
  });

  it('should return error if password has no lowercase', () => {
    const control = new FormControl('WEAKPASS1');
    expect(validator(control)).toEqual({ passwordStrength: true });
  });

  it('should return error if password has no number', () => {
    const control = new FormControl('WeakPass');
    expect(validator(control)).toEqual({ passwordStrength: true });
  });

  it('should return null if control value is empty', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeNull();
  });

  it('should return null if control value is null', () => {
    const control = new FormControl(null);
    expect(validator(control)).toBeNull();
  });
});