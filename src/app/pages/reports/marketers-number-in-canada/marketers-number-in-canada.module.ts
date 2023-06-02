import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarketersNumberInCanadaComponent } from './marketers-number-in-canada.component';
import { ChartComponent } from './chart/chart.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    MarketersNumberInCanadaComponent,
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
export class MarketersNumberInCanadaModule { }
