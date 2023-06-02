import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from '../account/account.component';
import { DropdownMenusModule, WidgetsModule } from 'src/app/_metronic/partials';
import { EarningsComponent } from './earnings/earnings.component';
import { SecurityComponent } from './security/security.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TwoFactorAuthDialogModule } from './_dialogs/two-factor-auth/two-factor-auth.module';

@NgModule({
  declarations: [
    AccountComponent,
    EarningsComponent,
    SecurityComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    TwoFactorAuthDialogModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    SharedModule
  ],
})
export class AccountModule {}
