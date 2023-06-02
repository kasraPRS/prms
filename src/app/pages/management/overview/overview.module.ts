import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardsModule } from 'src/app/_metronic/partials';
import { MonthlyNetEarningsComponent } from './monthly-net-earnings/monthly-net-earnings.component';
import { RevenueStatisticsComponent } from './revenue-statistics/revenue-statistics.component';
import { CampaignsStatisticsComponent } from './campaigns-statistics/campaigns-statistics.component';
import { LinksStatisticsComponent } from './links-statistics/links-statistics.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { AllActivitiesComponent } from './all-activities/all-activities.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDialogModule } from '@angular/material/dialog';
import { AllRewardsComponent } from './rewards/all-rewards/all-rewards.component';
import { DialogsModule } from '../_dialogs/_dialogs.module';
import { ManagementSharedModule } from '../management-shared/management-shared.module';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
  },
];

@NgModule({
  declarations: [
    OverviewComponent,
    MonthlyNetEarningsComponent,
    RevenueStatisticsComponent,
    CampaignsStatisticsComponent,
    LinksStatisticsComponent,
    AllTasksComponent,
    AllActivitiesComponent,
    AllRewardsComponent,
  ],
  imports: [
    SharedModule,
    CardsModule,
    NgApexchartsModule,
    MatDialogModule,
    DialogsModule,
    RouterModule.forChild(routes),
    ManagementSharedModule,
  ],
  exports: [],
})
export class OverviewModule {}
