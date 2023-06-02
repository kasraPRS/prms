import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { CardsModule, DropdownMenusModule } from "src/app/_metronic/partials";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule } from "@angular/forms";

import { CampaignsComponent } from "./campaigns.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { ManageCampaignsComponent } from "./manage-campaigns/manage-campaigns.component";
import { CampaignInformationComponent } from './campaign-information/campaign-information.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: CampaignsComponent,
  },
  {
    path: 'campaign-information',
    component: CampaignInformationComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    CampaignsComponent,
    StatisticsComponent,
    ManageCampaignsComponent,
    CampaignInformationComponent,
  ],
  imports: [
    CardsModule,//
    SharedModule,
    DropdownMenusModule,
    FormsModule,
    NgbDropdownModule,
    NgApexchartsModule,
    RouterModule.forChild(routes),
  ],

})
export class CampaignsModule { }