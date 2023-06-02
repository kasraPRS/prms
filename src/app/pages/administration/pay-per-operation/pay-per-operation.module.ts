import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPayPerOperationForAllUsersComponent } from './default-pay-per-operation-for-all-users/default-pay-per-operation-for-all-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { PayPerOperationComponent } from './pay-per-operation.component';
import { LatestPaymentsComponent } from './latest-payments/latest-payments.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: PayPerOperationComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    PayPerOperationComponent,
    DefaultPayPerOperationForAllUsersComponent,
    LatestPaymentsComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PayPerOperationModule { }
