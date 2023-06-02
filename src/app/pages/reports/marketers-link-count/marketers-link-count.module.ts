import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarketersLinkCountComponent } from './marketers-link-count.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    MarketersLinkCountComponent,
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
export class MarketersLinkCountModule { }
