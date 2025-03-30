import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[password-strength]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordStrengthValidatorDirective,
    multi: true,
  }]
})
export class PasswordStrengthValidatorDirective implements Validator {

  public validate(control: AbstractControl): ValidationErrors | null {
    return (createPasswordStrengthValidator())(control);
  }
}

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase: boolean = /[A-Z]+/.test(value);
    const hasLowerCase: boolean = /[a-z]+/.test(value);
    const hasNumber: boolean = /[0-9]+/.test(value);

    return value.length >= 8 && hasNumber && hasUpperCase && hasLowerCase
      ? null
      : {passwordStrength: true};
  };
}
