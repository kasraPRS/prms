import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FilterArrayPipe } from "./_filter-array.pipe";
import { HiddenArrayPipe } from "./_hidden-array.pipe";
import { SplitNumberPipe } from "./_split-number.pipe";
import { RoleConverterPipe } from './_role-converter.pipe';
import { SecondToHourPipe } from "./_second-to-hour.pipe";

const Pipes = [
  SplitNumberPipe,
  FilterArrayPipe,
  HiddenArrayPipe,
  RoleConverterPipe,
  SecondToHourPipe,
];

@NgModule({
  declarations: [
    ...Pipes,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...Pipes,
  ],
  providers: [
    ...Pipes,
  ]
})
export class PipesModule { }