import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { HierarchyComponent } from './hierarchy.component';
import { AddToCategoryDialogModule } from 'src/app/pages/_dialogs/add-to-category/add-to-category.module';

import { QuickReviewComponent } from './quick-review/quick-review.component';
import { SubsetMarketersComponent } from './subset-marketers/subset-marketers.component';
import { MarketerHierarchyComponent } from './marketer-hierarchy/marketer-hierarchy.component';
import { GenerateAffiliateMarketerSignupLinkComponent } from './generate-affiliate-marketer-signup-link/generate-affiliate-marketer-signup-link.component';

const routes: Routes = [
  {
    path: '',
    component: HierarchyComponent,
  },
];

@NgModule({
  declarations: [
    HierarchyComponent,
    GenerateAffiliateMarketerSignupLinkComponent,
    SubsetMarketersComponent,
    QuickReviewComponent,
    MarketerHierarchyComponent
  ],
  imports: [
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    SharedModule,
    AddToCategoryDialogModule,
    RouterModule.forChild(routes)
  ]
})
export class HierarchyModule { }
