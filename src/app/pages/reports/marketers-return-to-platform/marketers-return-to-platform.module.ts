import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketersReturnToPlatformComponent } from './marketers-return-to-platform.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    MarketersReturnToPlatformComponent,
    ChartComponent,
    ListComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    ChartComponent,
    ListComponent
  ]
})
export class MarketersReturnToPlatformModule { }
