import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardChartComponent } from './reward-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommissionPersentageComponent } from './commission-persentage/commission-persentage.component';

@NgModule({
  declarations: [RewardChartComponent, CommissionPersentageComponent],
  imports: [CommonModule, NgApexchartsModule],
  exports: [RewardChartComponent, CommissionPersentageComponent],
})
export class ManagementSharedModule {}
