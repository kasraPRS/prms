import { NgModule } from '@angular/core';
import { MarketersComponent } from './marketers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

// Components
import { TeamsComponent } from './teams/teams.component';
import { GenerateLinkComponent } from './generate-link/generate-link.component';
import { SubsetMarketersComponent } from './subset-marketers/subset-marketers.component';

// Dialogs
import { MarketersCategoriesDialogModule } from '../../_dialogs/marketers-categories/marketers-categories.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: MarketersComponent,
  }
]

@NgModule({
  declarations: [
    MarketersComponent,
    GenerateLinkComponent,
    SubsetMarketersComponent,
    TeamsComponent
  ],
  imports: [
    SharedModule,
    MarketersCategoriesDialogModule,
    NgbDropdownModule,
    RouterModule.forChild(routes),
  ]
})
export class MarketersModule { }
