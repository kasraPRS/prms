import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ContractsComponent } from './contracts.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractTemplatesComponent } from './contract-templates/contract-templates.component';
import { MarketersWithoutContractComponent } from './marketers-without-contract/marketers-without-contract.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogsModule } from '../_dialogs/dialogs.module';


const routes: Routes = [
  {
    path: '',
    component: ContractsComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    ContractsComponent,
    ContractListComponent,
    ContractTemplatesComponent,
    MarketersWithoutContractComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    DialogsModule,
    RouterModule.forChild(routes),
  ]
})
export class ContractsModule { }
