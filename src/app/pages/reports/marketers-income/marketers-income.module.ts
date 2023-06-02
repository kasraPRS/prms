import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarketersIncomeComponent } from './marketers-income.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    MarketersIncomeComponent,
    ChartComponent,
    ListComponent
  ],
  imports: [
    SharedModule,
  ],
  exports:[
    ChartComponent,
  ]
})
export class MarketersIncomeModule { }
