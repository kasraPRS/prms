import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionsComponent } from './commissions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DefaultCommissionPercentageForEachLevelComponent } from './default-commission-percentage-for-each-level/default-commission-percentage-for-each-level.component';
import { BranchsComponent } from './branchs/branchs.component';


const routes: Routes = [
  {
    path: '',
    component: CommissionsComponent,
  },
  {
    path: 'create-team/:id',
    loadChildren: () => import('./create-team/create-team.module').then(m => m.CreateTeamModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]
@NgModule({
  declarations: [
    CommissionsComponent,
    DefaultCommissionPercentageForEachLevelComponent,
    BranchsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CommissionsModule { }
