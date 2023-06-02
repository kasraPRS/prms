import { NgModule } from '@angular/core';
import { ActivitiesComponent } from './activities.component';
import {
  CardsModule,
  DropdownMenusModule,
  WidgetsModule,
} from '../../_metronic/partials';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ActivitiesComponent,
  ],
  imports: [
    SharedModule,
    ActivitiesRoutingModule,
    DropdownMenusModule,
    WidgetsModule,
    FormsModule,
    CardsModule,
    MatDialogModule
  ],
})
export class ActivitiesModule { }
