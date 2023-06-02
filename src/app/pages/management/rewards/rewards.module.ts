import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsComponent } from './rewards/rewards.component';
import { RouterModule, Routes } from '@angular/router';
import { OpenRewardsComponent } from './open-rewards/open-rewards.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ClosedRewardsComponent } from './closed-rewards/closed-rewards.component';
import { OverviewModule } from '../overview/overview.module';
import { ManagementSharedModule } from '../management-shared/management-shared.module';

const routes: Routes = [
  {
    path: '',
    component: RewardsComponent,
  },
];

@NgModule({
  declarations: [
    RewardsComponent,
    OpenRewardsComponent,
    ClosedRewardsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDialogModule,
    ManagementSharedModule,
  ],
})
export class RewardsModule {}
