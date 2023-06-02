import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamComponent } from './create-team.component';
import { TeamCommissionsComponent } from './team-commissions/team-commissions.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamMembersComponent } from './team-members/team-members.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RewardsComponent } from './rewards/rewards.component';


const routes: Routes = [
  {
    path: '',
    component: CreateTeamComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]
@NgModule({
  declarations: [
    CreateTeamComponent,
    TeamCommissionsComponent,
    TeamMembersComponent,
    RewardsComponent
  ],
  imports: [
    SharedModule,
    NgbTooltipModule,
    NgbDropdownModule,
    RouterModule.forChild(routes)
  ]
})
export class CreateTeamModule { }
