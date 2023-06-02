import { NgModule } from '@angular/core';
import { DropdownMenusModule, WidgetsModule } from 'src/app/_metronic/partials';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProfileDetailsComponent } from './forms/profile-details/profile-details.component';
import { DeactivateAccountComponent } from './forms/deactivate-account/deactivate-account.component';
import { SettingsComponent } from './settings.component';
import { ngfModule } from 'angular-file';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    SettingsComponent,
    ProfileDetailsComponent,
    DeactivateAccountComponent,
  ],
  imports: [
    SharedModule,
    ngfModule,
    SettingsRoutingModule,
    DropdownMenusModule,
    WidgetsModule,
    GooglePlaceModule,
    NgxIntlTelInputModule,
  ],
})
export class AccountModule {}
