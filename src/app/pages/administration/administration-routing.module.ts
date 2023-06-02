import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: 'contracts',
        loadChildren: () => import('./contracts/contracts.module').then(m => m.ContractsModule),
      },
      {
        path: 'marketers',
        loadChildren: () => import('./marketers/marketers.module').then(m => m.MarketersModule),
      },
      {
        path: 'links-and-campaigns',
        loadChildren: () => import('./links-and-campaigns/links-and-campaigns.module').then(m => m.LinksAndCampaignsModule),
      },
      {
        path: 'graduated-scale-commission',
        loadChildren: () => import('./graduated-scale-commission/graduated-scale-commission.module').then(m => m.GraduatedScaleCommissionModule),
      },
      {
        path: 'pay-per-operation',
        loadChildren: () => import('./pay-per-operation/pay-per-operation.module').then(m => m.PayPerOperationModule),
      },
      {
        path: 'access-levels',
        loadChildren: () => import('./access-levels/access-levels.module').then(m => m.AccessLevelsModule),
      },
      {
        path: 'commissions',
        loadChildren: () => import('./commissions/commissions.module').then(m => m.CommissionsModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      },
      { path: '', redirectTo: 'contracts', pathMatch: 'full' },
      { path: '**', redirectTo: 'contracts', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
