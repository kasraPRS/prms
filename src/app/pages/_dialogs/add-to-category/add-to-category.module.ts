import { AddToCategoryDialogComponent } from './add-to-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AddToCategoryDialogComponent,
  ],
  imports: [
    SharedModule,
    NgbTooltipModule,
  ],
  exports: [
    AddToCategoryDialogComponent,
  ],
  entryComponents: [
    AddToCategoryDialogComponent
  ]
})
export class AddToCategoryDialogModule { }
