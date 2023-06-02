import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dialog-marketers-categories',
  templateUrl: './marketers-categories.component.html',
})
export class MarketersCategoriesDialogComponent implements OnInit {
  status: 'show' | 'hide' = 'show';
  private unsubscribe: Subscription[] = [];

  constructor(
    private dialogRef: MatDialogRef<MarketersCategoriesDialogComponent>,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void { }

  close() { this.dialogRef.close(); }

  showMarketers() {
    this.status = 'hide';
    // this.dialog.open(MarketersDialogComponent, {
    //   backdropClass: 'bg-transparent',
    // }).afterClosed().subscribe(result => {
    //   this.status = 'show';
    // });
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
