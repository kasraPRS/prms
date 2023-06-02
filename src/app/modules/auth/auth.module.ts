import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { TranslationModule } from '../i18n/translation.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ngfModule } from 'angular-file';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { AuthComponent } from './auth.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SentEmailMessageComponent } from './components/message/sent-email-message/sent-email-message.component';
import { ChangePasswordMessageComponent } from './components/message/change-password-message/change-password-message.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
@NgModule({
  declarations: [
    RegistrationComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    AuthComponent,
    SentEmailMessageComponent,
    ChangePasswordMessageComponent,
    ResetPasswordComponent,
  ],
  imports: [
    ngfModule,
    SharedModule,
    TranslationModule,
    MatTabsModule,
    NgxIntlTelInputModule,
    AuthRoutingModule,
    HttpClientModule,
    GooglePlaceModule,
  ],
})
export class AuthModule {}
