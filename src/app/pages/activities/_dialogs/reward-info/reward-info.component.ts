import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MarketersDialogComponent } from '../marketers/marketers.component';

@Component({
  selector: 'prms-reward-info',
  templateUrl: './reward-info.component.html',
})
export class RewardInfoComponent implements OnInit {
  status: 'show' | 'hide' = 'show';
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = true;
  private unsubscribe: Subscription[] = [];

  constructor(
    private dialogRef: MatDialogRef<RewardInfoComponent>,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void { }

  close() { this.dialogRef.close(); }

  showMarketers() {
    this.status = 'hide';
    this.dialog.open(MarketersDialogComponent, {
      backdropClass: 'bg-transparent',
    }).afterClosed().subscribe(result => {
      this.status = 'show';
    });
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
