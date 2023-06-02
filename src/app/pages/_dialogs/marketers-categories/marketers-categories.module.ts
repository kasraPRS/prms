import { NgModule } from '@angular/core';
import { CardsModule } from 'src/app/_metronic/partials';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarketersCategoriesDialogComponent } from './marketers-categories.component';

const Dialog = MarketersCategoriesDialogComponent;
@NgModule({
  declarations: [
    Dialog,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    Dialog,
  ],
  entryComponents: [
    Dialog,
  ]
})
export class MarketersCategoriesDialogModule { }