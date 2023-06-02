import { NgModule } from '@angular/core';

import { AdministrationRoutingModule } from './administration-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministrationComponent } from './administration.component';
import { CardsModule } from 'src/app/_metronic/partials';

@NgModule({
  declarations: [
    AdministrationComponent,
  ],
  imports: [
    SharedModule,
    CardsModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
