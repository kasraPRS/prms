import { NgModule } from '@angular/core';
import { StatusComponent } from './status.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardsModule } from 'src/app/_metronic/partials';
import { CampaignCreationFunnelComponent } from './campaign-creation-funnel/campaign-creation-funnel.component';
import { DonationFunnelComponent } from './donation-funnel/donation-funnel.component';
import { EntriesComponent } from './entries/entries.component';

const routes: Routes = [
  {
    path: '',
    component: StatusComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    StatusComponent,
    CampaignCreationFunnelComponent,
    DonationFunnelComponent,
    EntriesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StatusModule { }
