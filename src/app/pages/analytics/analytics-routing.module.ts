import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { BouncedComponent } from './bounced/bounced.component';
import { CampaignCreatedComponent } from './campaign-created/campaign-created.component';
import { CampaignViewsComponent } from './campaign-views/campaign-views.component';
import { ConvertedComponent } from './converted/converted.component';
import { CreatedACampaignComponent } from './created-acampaign/created-acampaign.component';
import { DonatedToACampaignComponent } from './donated-to-acampaign/donated-to-acampaign.component';
import { DonationPageViewsComponent } from './donation-page-views/donation-page-views.component';
import { EntriesComponent } from './entries/entries.component';
import { PaymentPageViewsComponent } from './payment-page-views/payment-page-views.component';
import { RegistrationComponent } from './registration/registration.component';
import { SiteViewsComponent } from './site-views/site-views.component';
import { VisitorsComponent } from './visitors/visitors.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent,
    children: [
      {
        path: 'entries',
        component: EntriesComponent
      },
      {
        path: 'visitors',
        component: VisitorsComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'converted',
        component: ConvertedComponent
      },
      {
        path: 'bounced',
        component: BouncedComponent
      },
      {
        path: 'campaign-views',
        component: CampaignViewsComponent
      },
      {
        path: 'site-views',
        component: SiteViewsComponent
      },
      {
        path: 'donation-page-views',
        component: DonationPageViewsComponent
      },
      {
        path: 'payment-page-views',
        component: PaymentPageViewsComponent
      },
      {
        path: 'campaign-created',
        component: CampaignCreatedComponent
      },
      {
        path: 'created-a-campaign',
        component: CreatedACampaignComponent
      },
      {
        path: 'donated-to-a-campaign',
        component: DonatedToACampaignComponent
      },
      {
        path: '',
        loadChildren: () => import('./status/status.module').then(m => m.StatusModule),
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
