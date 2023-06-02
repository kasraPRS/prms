import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewRecurringReportComponent } from '../_dialogs/new-recurring-report/new-recurring-report.component';
@Component({
  selector: 'prms-recurring-report',
  templateUrl: './recurring-report.component.html',
})
export class RecurringReportComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onBtnCreateClick() {
    this.dialog.open(NewRecurringReportComponent);
  }

}
