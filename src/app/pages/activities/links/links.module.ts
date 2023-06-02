import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { CardsModule, DropdownMenusModule } from "src/app/_metronic/partials";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule } from "@angular/forms";

import { LinksComponent } from "./links.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { ManageLinksComponent } from "./manage-links/manage-links.component";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: LinksComponent
  }
]

@NgModule({
  declarations: [
    LinksComponent,
    ManageLinksComponent,
    StatisticsComponent,
  ],
  imports: [
    CardsModule,//
    SharedModule,
    DropdownMenusModule,
    FormsModule,
    NgbDropdownModule,
    NgApexchartsModule,
    RouterModule.forChild(routes),
  ],

})
export class LinksModule { }