import { Attribute, Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import * as libphonenumber from 'google-libphonenumber';
import { ValidatorRs } from '../models/validator';

// Just Use For GooglePhoneNumber parseAndKeepRawInput Has Errrrrrrrrrrror!
function googlePhoneNumber(control: AbstractControl): ValidatorRs {
  if (!control.value?.nationalNumber) return null;
  // Check Phone Number
  let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  let value = control.value?.e164Number.toString().replace(/\s|\(|\)|-/g, '');
  let phoneNumber = phoneUtil.parseAndKeepRawInput(value, control.value?.countryCode);

  if (!phoneUtil.isValidNumber(phoneNumber)) return { phoneNumber: true };
  return null;
}
@Directive({
  selector: '[ngmGooglePhoneNumber][ngModel]',
  providers: [
    {
      useValue: googlePhoneNumber,
      provide: NG_VALIDATORS,
      multi: true,
    },
  ],
})
export class NgmGooglePhoneNumberDirective {}
export { googlePhoneNumber as NgmGooglePhoneNumberFn };
