import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntriesComponent } from './entries/entries.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConvertedComponent } from './converted/converted.component';
import { BouncedComponent } from './bounced/bounced.component';
import { CampaignViewsComponent } from './campaign-views/campaign-views.component';
import { SiteViewsComponent } from './site-views/site-views.component';
import { DonationPageViewsComponent } from './donation-page-views/donation-page-views.component';
import { PaymentPageViewsComponent } from './payment-page-views/payment-page-views.component';
import { CampaignCreatedComponent } from './campaign-created/campaign-created.component';
import { CreatedACampaignComponent } from './created-acampaign/created-acampaign.component';
import { DonatedToACampaignComponent } from './donated-to-acampaign/donated-to-acampaign.component';


@NgModule({
  declarations: [
    AnalyticsComponent,
    EntriesComponent,
    VisitorsComponent,
    RegistrationComponent,
    ConvertedComponent,
    BouncedComponent,
    CampaignViewsComponent,
    SiteViewsComponent,
    DonationPageViewsComponent,
    PaymentPageViewsComponent,
    CampaignCreatedComponent,
    CreatedACampaignComponent,
    DonatedToACampaignComponent,
  ],
  imports: [
    SharedModule,
    AnalyticsRoutingModule
  ]
})
export class AnalyticsModule { }
