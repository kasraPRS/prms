import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CodeLoginComponent } from './code-login/code-login.component';

import { LoginComponent } from './login.component';
import { PasswordLoginComponent } from './password-login/password-login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { returnUrl: window.location.pathname },
    children: [
      { path: '', redirectTo: 'password', pathMatch: 'full' },
      { path: 'password', component: PasswordLoginComponent },
      { path: 'code', component: CodeLoginComponent },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, PasswordLoginComponent, CodeLoginComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
