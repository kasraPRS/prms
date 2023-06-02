import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'prms-reward-details',
  templateUrl: './reward-details.component.html',
})
export class RewardDetailsComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = true;
  private unsubscribe: Subscription[] = [];

  constructor(
    private dialogRef: MatDialogRef<RewardDetailsComponent>,
    private cdr: ChangeDetectorRef,
  ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void { }

  onBtnDoneClick() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      this.dialogRef.close();
    }, 1500);
  }

  close() { this.dialogRef.close(); }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
