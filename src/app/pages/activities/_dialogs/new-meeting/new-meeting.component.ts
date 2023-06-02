import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';

export interface DialogData {
  houres: string;
  date: string;
}

@Component({
  selector: 'prms-new-meeting',
  templateUrl: './new-meeting.component.html',
  styleUrls: ['./new-meeting.component.scss'],
})
export class NewMeetingComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = true;
  private unsubscribe: Subscription[] = [];

  constructor(
    private dialogRef: MatDialogRef<NewMeetingComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    console.log(this.data.date);
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
