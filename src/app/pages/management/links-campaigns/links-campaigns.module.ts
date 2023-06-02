import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { LinksCampaignsComponent } from './links-campaigns.component';
import { ManageLinksComponent } from './manage-links/manage-links.component';
import { ManageCampaignsComponent } from './manage-campaigns/manage-campaigns.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: LinksCampaignsComponent,
  }
]
@NgModule({
  declarations: [
    LinksCampaignsComponent,
    ManageLinksComponent,
    ManageCampaignsComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    NgbDropdownModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ]
})
export class LinksCampaignsModule { }
