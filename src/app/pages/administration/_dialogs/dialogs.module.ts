import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewContractComponent } from './new-contract/new-contract.component';
import { NewContractTemplateComponent } from './new-contract-template/new-contract-template.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MarketersCategoriesComponent } from './marketers-categories/marketers-categories.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryMarketersComponent } from './category-marketers/category-marketers.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { AddMerketersToCategoryComponent } from './add-merketers-to-category/add-merketers-to-category.component';



@NgModule({
  declarations: [
    NewContractComponent,
    NewContractTemplateComponent,
    MarketersCategoriesComponent,
    CategoryMarketersComponent,
    NewCategoryComponent,
    AddMerketersToCategoryComponent
  ],
  imports: [
    SharedModule,
    CKEditorModule,
    NgbTooltipModule
  ]
})
export class DialogsModule { }
