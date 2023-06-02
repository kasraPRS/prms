import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarketersSuccessfulLinksComponent } from './marketers-successful-links.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    MarketersSuccessfulLinksComponent,
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
export class MarketersSuccessfulLinksModule { }
