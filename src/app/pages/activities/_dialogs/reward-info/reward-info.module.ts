import { NgModule } from "@angular/core";
import { CardsModule } from "src/app/_metronic/partials";
import { SharedModule } from "src/app/shared/shared.module";
import { RewardInfoComponent } from "./reward-info.component";
import { MarketersDialogModule } from "../marketers/marketers.module";

@NgModule({
  declarations: [
    RewardInfoComponent,
  ],
  imports: [
    CardsModule,
    SharedModule,
  ],
  exports: [
    MarketersDialogModule,
    RewardInfoComponent,
  ],
  entryComponents: [
    RewardInfoComponent,
  ]
})
export class RewardInfoDialogModule { }