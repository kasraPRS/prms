import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { EarningsComponent } from './earnings/earnings.component';
import { SecurityComponent } from './security/security.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.AccountModule),
      },
      {
        path: 'earnings',
        component: EarningsComponent,
      },
      {
        path: 'security',
        component: SecurityComponent,
      },
      { path: '', redirectTo: 'settings', pathMatch: 'full' },
      { path: '**', redirectTo: 'settings', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
