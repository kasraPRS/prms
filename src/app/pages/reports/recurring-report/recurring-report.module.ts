import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecurringReportComponent } from './recurring-report.component';
import { RouterModule, Routes } from '@angular/router';
import { DialogsModule } from '../_dialogs/dialogs.module';


const routes: Routes = [
  {
    path: '',
    component: RecurringReportComponent,
  },
];
@NgModule({
  declarations: [RecurringReportComponent],
  imports: [
    SharedModule,
    DialogsModule,
    RouterModule.forChild(routes)
  ]
})
export class RecurringReportModule { }
