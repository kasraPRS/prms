import { NgModule } from '@angular/core';
import { ManagementComponent } from './management.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { ManagementRoutingModule } from './management-routing.module';



@NgModule({
  declarations: [
    ManagementComponent
  ],
  imports: [
    SharedModule,
    ManagementRoutingModule,
  ]
})
export class ManagementModule { }
