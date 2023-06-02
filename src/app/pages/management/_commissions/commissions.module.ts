import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionsComponent } from './commissions/commissions.component';
import { RouterModule, Routes } from '@angular/router';
import { DefaultCommissionsComponent } from './default-commissions/default-commissions.component';
import { ManagementSharedModule } from '../management-shared/management-shared.module';

const routes: Routes = [
  {
    path: '',
    component: CommissionsComponent,
  },
];
@NgModule({
  declarations: [CommissionsComponent, DefaultCommissionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ManagementSharedModule,
  ],
})
export class CommissionsModule {}
