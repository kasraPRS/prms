import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddPhoneComponent } from './add-phone/add-phone.component';
import { PhoneNumberComponent } from './phone-number.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

const routes: Routes = [
  {
    path: '',
    component: PhoneNumberComponent,
    data: { returnUrl: window.location.pathname },
    children: [
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      { path: 'add', component: AddPhoneComponent },
      { path: 'verify-code', component: VerifyCodeComponent },
    ],
  },
];

@NgModule({
  declarations: [PhoneNumberComponent, AddPhoneComponent, VerifyCodeComponent],
  imports: [SharedModule, NgxIntlTelInputModule, RouterModule.forChild(routes)],
})
export class PhoneNumberModule {}
