import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'prms-show-marketers',
  templateUrl: './show-marketers.component.html',
  styleUrls: ['./show-marketers.component.scss'],
})
export class ShowMarketersComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ShowMarketersComponent>,
    @Inject(MAT_DIALOG_DATA) public marketers: any[]
  ) {}

  ngOnInit(): void {
    console.log(this.marketers);
  }
  close() {
    this.dialogRef.close();
  }
  deleteMarketers(index: number) {
    this.marketers.splice(index, 1);
  }
}
