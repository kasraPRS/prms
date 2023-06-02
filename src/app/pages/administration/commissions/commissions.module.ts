import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionsComponent } from './commissions.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DefaultCommissionsForAllRmsComponent } from './default-commissions-for-all-rms/default-commissions-for-all-rms.component';
import { RmsListComponent } from './rms-list/rms-list.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: CommissionsComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    CommissionsComponent,
    DefaultCommissionsForAllRmsComponent,
    RmsListComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    NgbDropdownModule,
    RouterModule.forChild(routes)
  ]
})
export class CommissionsModule { }
