import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

import { LogoutComponent } from './components/logout/logout.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SentEmailMessageComponent } from './components/message/sent-email-message/sent-email-message.component';
import { ChangePasswordMessageComponent } from './components/message/change-password-message/change-password-message.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'forgot-password/sent-email',
    component: SentEmailMessageComponent,
  },
  {
    path: 'change-password/message',
    component: ChangePasswordMessageComponent,
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./components/login/login.module').then((m) => m.AuthModule),
      },
      {
        path: 'phone-number',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./components/phone-number/phone-number.module').then(
            (m) => m.PhoneNumberModule
          ),
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'change-password',
        canActivate: [AuthGuard],
        component: ChangePasswordComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
