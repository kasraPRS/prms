import { ValidatorFn } from '../models/validator';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Attribute, Directive, forwardRef } from '@angular/core';

function confirmPassword(passwordControl: AbstractControl): ValidatorFn {
  if (!passwordControl) throw "Don't Send Control to Confirm Password!";
  return (confirmPasswordControl: AbstractControl) => {
    let passwordValue = passwordControl.value;
    let cPasswordValue = confirmPasswordControl.value;
    if (passwordValue !== cPasswordValue) return { confirmPassword: true };
    return null;
  };
}
@Directive({
  selector: '[ngmConfirmPassword][ngModel]',
  providers: [
    {
      useExisting: forwardRef(() => NgmConfirmPasswordDirective),
      provide: NG_VALIDATORS,
      multi: true,
    },
  ],
})
export class NgmConfirmPasswordDirective {
  validate: ValidatorFn;
  constructor(@Attribute('ngmPassword') public password: AbstractControl) {
    this.validate = confirmPassword(password);
  }
}
export { confirmPassword as NgmConfirmPasswordFn };
