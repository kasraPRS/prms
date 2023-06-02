import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { CardsModule, DropdownMenusModule } from "src/app/_metronic/partials";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule } from "@angular/forms";

import { ActivityComponent } from "./activity.component";


const routes: Routes = [
  {
    path: '',
    component: ActivityComponent,
  }
]

@NgModule({
  declarations: [
    ActivityComponent
  ],
  imports: [
    CardsModule,//
    SharedModule,
    DropdownMenusModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],

})
export class ActivityModule { }