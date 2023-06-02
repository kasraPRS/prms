import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TwoFactorAuthDialogComponent } from './two-factor-auth.component';

@NgModule({
  declarations: [TwoFactorAuthDialogComponent],
  imports: [SharedModule],
  exports: [TwoFactorAuthDialogComponent],
  entryComponents: [TwoFactorAuthDialogComponent],
})
export class TwoFactorAuthDialogModule {}
