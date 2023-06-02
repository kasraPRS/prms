import { NgModule } from '@angular/core';
import { MarketersComponent } from './marketers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { MarketersListComponent } from './marketers-list/marketers-list.component';
import { CreateNewMarketerComponent } from './create-new-marketer/create-new-marketer.component';
import { GenerateAffiliateMarketerSignupLinkComponent } from './generate-affiliate-marketer-signup-link/generate-affiliate-marketer-signup-link.component';

const routes: Routes = [
  {
    path: '',
    component: MarketersComponent
  },
  {
    path: 'create',
    component: CreateNewMarketerComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    MarketersComponent,
    MarketersListComponent,
    CreateNewMarketerComponent,
    GenerateAffiliateMarketerSignupLinkComponent,
  ],
  imports: [
    SharedModule,
    NgbDropdownModule,
    RouterModule.forChild(routes)
  ]
})
export class MarketersModule { }
