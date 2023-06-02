import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarketersNumberInUsComponent } from './marketers-number-in-us.component';
import { ChartComponent } from './chart/chart.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    MarketersNumberInUsComponent,
    ChartComponent,
    ListComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    ChartComponent
  ]
})
export class MarketersNumberInUsModule { }
