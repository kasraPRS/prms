import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveMarketersComponent } from './active-marketers/active-marketers.component';
import { InActiveMarketersComponent } from './in-active-marketers/in-active-marketers.component';
import { MarketersIncomeComponent } from './marketers-income/marketers-income.component';
import { MarketersLinkCountComponent } from './marketers-link-count/marketers-link-count.component';
import { MarketersNumberInCanadaComponent } from './marketers-number-in-canada/marketers-number-in-canada.component';
import { MarketersNumberInUsComponent } from './marketers-number-in-us/marketers-number-in-us.component';
import { MarketersReturnToPlatformComponent } from './marketers-return-to-platform/marketers-return-to-platform.component';
import { MarketersSuccessInCanadaComponent } from './marketers-success-in-canada/marketers-success-in-canada.component';
import { MarketersSuccessInUsComponent } from './marketers-success-in-us/marketers-success-in-us.component';
import { MarketersSuccessfulLinksComponent } from './marketers-successful-links/marketers-successful-links.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
    {
      path: 'overview',
      loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
    },
    {
      path: 'marketeres-return-to-platform',
      component: MarketersReturnToPlatformComponent,
    },
    {
      path: 'marketeres-income',
      component: MarketersIncomeComponent
    },
    {
      path: 'active-marketers',
      component: ActiveMarketersComponent
    },
    {
      path: 'inactive-marketers',
      component: InActiveMarketersComponent
    },
    {
      path: 'marketers-link-count',
      component: MarketersLinkCountComponent
    },
    {
      path: 'marketers-successful-links',
      component: MarketersSuccessfulLinksComponent
    },
    {
      path: 'marketers-success-in-us',
      component: MarketersSuccessInUsComponent
    },
    {
      path: 'marketers-number-in-us',
      component: MarketersNumberInUsComponent
    },
    {
      path: 'marketers-success-in-canada',
      component: MarketersSuccessInCanadaComponent
    },
    {
      path: 'marketers-number-in-canada',
      component: MarketersNumberInCanadaComponent
    },
    {
      path: 'recurring-report',
      loadChildren: () => import('./recurring-report/recurring-report.module').then(m => m.RecurringReportModule),
    },
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: '**', redirectTo: 'overview', pathMatch: 'full' },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
