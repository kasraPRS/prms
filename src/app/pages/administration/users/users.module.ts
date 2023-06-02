import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MarketersListComponent } from './marketers-list/marketers-list.component';
import { AdminRolesComponent } from './admin-roles/admin-roles.component';
import { AdminsComponent } from './admins/admins.component';
import { AccessLevelsComponent } from './access-levels/access-levels.component';
import { NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { GenerateSignUpLinkForAffiliateMarketerComponent } from './generate-sign-up-link-for-affiliate-marketer/generate-sign-up-link-for-affiliate-marketer.component';

const routes: Routes = [
  {
    path: 'access-levels',
    component: AccessLevelsComponent
  },
  {
    path: '',
    component: UsersComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    UsersComponent,
    MarketersListComponent,
    AdminRolesComponent,
    AdminsComponent,
    AccessLevelsComponent,
    GenerateSignUpLinkForAffiliateMarketerComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    NgbPopoverModule,
    NgbDropdownModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
