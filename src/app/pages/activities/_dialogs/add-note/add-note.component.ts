import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../new-meeting/new-meeting.component';

@Component({
  selector: 'prms-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  formData: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
  onSubmit() {}
}
