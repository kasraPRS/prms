import { NgModule } from "@angular/core";
import { CardsModule } from "src/app/_metronic/partials";
import { SharedModule } from "src/app/shared/shared.module";
import { MarketersDialogComponent } from "./marketers.component";

@NgModule({
  declarations: [
    MarketersDialogComponent,
  ],
  imports: [
    CardsModule,
    SharedModule,
  ],
  exports: [
    MarketersDialogComponent,
  ],
  entryComponents: [
    MarketersDialogComponent,
  ]
})
export class MarketersDialogModule { }