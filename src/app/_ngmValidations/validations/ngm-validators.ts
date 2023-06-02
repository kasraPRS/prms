import { Injectable } from "@angular/core";

// #region Validators
import { NgmUrlFn } from "./_url";
import { NgmEmailFn } from "./_email";
import { NgmZipCodeFn } from "./_zipcode";
import { NgmPasswordFn } from "./_password";
import { NgmConfirmPasswordFn } from "./_confirm-password";
import { NgmGooglePhoneNumberFn } from "./_google-phone-number";
// #endregion Validators

@Injectable()
export class NgmValidators {
  // static url = NgmUrlFn;.
  // static email = NgmEmailFn;.
  static zipCode = NgmZipCodeFn;
  // static phoneNumber = NgmPhoneNumberFn;
  static password = NgmPasswordFn;
  static confirmPassword = NgmConfirmPasswordFn;
  static googlePhoneNumber = NgmGooglePhoneNumberFn;
}