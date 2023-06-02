import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LinksAndCampaignsComponent } from './links-and-campaigns.component';
import { RouterModule, Routes } from '@angular/router';
import { ManageLinksComponent } from './manage-links/manage-links.component';
import { ManageCampaignsComponent } from './manage-campaigns/manage-campaigns.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: LinksAndCampaignsComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    LinksAndCampaignsComponent,
    ManageLinksComponent,
    ManageCampaignsComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    NgbDropdownModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ]
})
export class LinksAndCampaignsModule { }
