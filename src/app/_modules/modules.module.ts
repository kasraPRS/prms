import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePaginationComponent } from './table-pagination/table-pagination.component';
import { SharedModule } from '../shared/shared.module';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TablePaginationComponent,
    ToolTipComponent
  ],
  imports: [
    CommonModule,
    NgbTooltipModule
  ],
  exports: [
    TablePaginationComponent,
    ToolTipComponent
  ]
})
export class ModulesModule { }
