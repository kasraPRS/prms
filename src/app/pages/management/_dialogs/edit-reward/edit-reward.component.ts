import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ShowMarketersComponent } from '../show-marketers/show-marketers.component';

@Component({
  selector: 'prms-edit-reward',
  templateUrl: './edit-reward.component.html',
  styleUrls: ['./edit-reward.component.scss'],
})
export class EditRewardComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditRewardComponent>,
    @Inject(MAT_DIALOG_DATA) public reward: any
  ) {}

  ngOnInit(): void {
    console.log(this.reward);
  }
  close() {
    this.dialogRef.close();
  }
  showMarketersDialog(marketers: any) {
    this.dialog.open(ShowMarketersComponent, {
      data: marketers,
    });
  }
}
