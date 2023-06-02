import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'prms-marketers',
  templateUrl: './marketers.component.html',
})
export class MarketersDialogComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  constructor(
    private dialogRef: MatDialogRef<MarketersDialogComponent>,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void { }

  close() { this.dialogRef.close(); }
  
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
