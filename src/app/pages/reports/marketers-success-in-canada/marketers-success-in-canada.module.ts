import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarketersSuccessInCanadaComponent } from './marketers-success-in-canada.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    MarketersSuccessInCanadaComponent,
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
export class MarketersSuccessInCanadaModule { }
