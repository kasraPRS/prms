import { ValidatorFn } from "../models/validator";
import { AbstractControl, NG_VALIDATORS } from "@angular/forms";
import { Attribute, Directive, forwardRef } from "@angular/core";

function password(minLength: number = 0, maxLength: number = 100): ValidatorFn {
  if (minLength > maxLength) throw 'minLength bigger than maxLength!';
  return (control: AbstractControl) => {
    let regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$/gm;
    if (!control.value) return null;
    if (control.value.length < minLength || control.value.length > maxLength) return null;
    if (!regexp.test(control.value)) return { password: true }
    return null;
  }
}
@Directive({
  selector: '[ngmPassword][ngModel]',
  providers: [{
    useExisting: forwardRef(() => NgmPasswordDirective),
    provide: NG_VALIDATORS,
    multi: true,
  }]
})
export class NgmPasswordDirective {
  validate: ValidatorFn;
  constructor(@Attribute('ngmPassword') public range: { min: number, max: number }) {
    this.validate = password(range.min, range.max);
  }
}
export { password as NgmPasswordFn };

