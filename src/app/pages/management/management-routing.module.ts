import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/_guards/role.guard';
import { ManagementComponent } from './management.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      {
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then((m) => m.OverviewModule),
      },
      {
        path: 'marketers',
        loadChildren: () => import('./marketers/marketers.module').then(m => m.MarketersModule),
      },
      {
        path: 'links-campaigns',
        loadChildren: () => import('./links-campaigns/links-campaigns.module').then(m => m.LinksCampaignsModule),
      },
      {
        path: 'rewards',
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['rm'],
        },
        loadChildren: () => import('./rewards/rewards.module').then((m) => m.RewardsModule),
      },
      {
        path: 'commissions',
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['rm'],
        },
        loadChildren: () => import('./commissions/commissions.module').then((m) => m.CommissionsModule),
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule { }
