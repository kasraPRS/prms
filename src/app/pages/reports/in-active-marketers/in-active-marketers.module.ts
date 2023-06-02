import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InActiveMarketersComponent } from './in-active-marketers.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { ListComponent } from './list/list.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    InActiveMarketersComponent,
    ChartComponent,
    ListComponent
  ],
  imports: [
    SharedModule,
    NgApexchartsModule
  ],
  exports: [
    ChartComponent
  ]
})
export class InActiveMarketersModule { }
