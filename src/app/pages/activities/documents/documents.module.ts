import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "src/app/shared/shared.module";
import { CardsModule, WidgetsModule } from "src/app/_metronic/partials";
import { DocumentsComponent } from "./documents.component";


const routes: Routes = [
  {
    path: '',
    component: DocumentsComponent
  }
]

@NgModule({
  declarations: [
    DocumentsComponent
  ],
  imports: [
    SharedModule,
    CardsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],

})
export class DocumentsModule { }