import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewRecurringReportComponent } from './new-recurring-report/new-recurring-report.component';



@NgModule({
  declarations: [
    NewRecurringReportComponent
  ],
  imports: [
    SharedModule
  ]
})
export class DialogsModule { }
