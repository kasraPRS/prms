import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AutosizeDirective } from "./_autosize.directive";
import { FilterArrayDirective } from "./_filter-array.directive";
import { NgmSelect2Directive } from "./_ngm-select2.directive";

const Directives = [
  AutosizeDirective,
  NgmSelect2Directive,
  FilterArrayDirective,
];

@NgModule({
  declarations: [
    ...Directives,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...Directives,
  ]

})
export class DirectivesModule { }