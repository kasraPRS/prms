import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "src/app/shared/shared.module";
import { ContractsComponent } from "./contracts.component";
import { ContractInformationComponent } from './contract-information/contract-information.component';


const routes: Routes = [
  {
    path: '',
    component: ContractsComponent
  },
  {
    path: 'contract-information',
    component: ContractInformationComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    ContractsComponent,
    ContractInformationComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],

})
export class ContractsModule { }