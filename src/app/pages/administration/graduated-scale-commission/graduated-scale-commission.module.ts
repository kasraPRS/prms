import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GraduatedScaleCommissionComponent } from './graduated-scale-commission.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IncentiveConditionsComponent } from './incentive-conditions/incentive-conditions.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: GraduatedScaleCommissionComponent
  }
]

@NgModule({
  declarations: [
    GraduatedScaleCommissionComponent,
    IncentiveConditionsComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GraduatedScaleCommissionModule { }
