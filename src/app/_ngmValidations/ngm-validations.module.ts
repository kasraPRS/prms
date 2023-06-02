import { NgModule } from '@angular/core';

import { NgmValidators } from './validations/ngm-validators';

import { NgmUrlDirective } from './validations/_url';
import { NgmEmailDirective } from './validations/_email';
import { NgmZipCodeDirective } from './validations/_zipcode';
import { NgmPasswordDirective } from './validations/_password';
import { NgmConfirmPasswordDirective } from './validations/_confirm-password';
import { NgmGooglePhoneNumberDirective } from './validations/_google-phone-number';

const Validations = [
  // NgmUrlDirective,
  // NgmEmailDirective,
  NgmZipCodeDirective,
  // NgmPhoneNumberDirective,
  NgmPasswordDirective,
  NgmConfirmPasswordDirective,
  NgmGooglePhoneNumberDirective,
];

@NgModule({
  providers: [NgmValidators],
  declarations: [...Validations],
  exports: [...Validations],
})
export class NgmValidationsModule {}
