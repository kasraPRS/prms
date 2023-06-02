import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../new-meeting/new-meeting.component';

@Component({
  selector: 'prms-add-third-party-participents',
  templateUrl: './add-third-party-participents.component.html',
  styleUrls: ['./add-third-party-participents.component.scss'],
})
export class AddThirdPartyParticipentsComponent implements OnInit {
  formData: FormGroup;
  participants: any;
  constructor(
    private dialogRef: MatDialogRef<AddThirdPartyParticipentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _fb: FormBuilder
  ) {
    this.formData = this._fb.group({
      fullName: new FormControl(undefined, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(undefined),
    });
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
  onSubmit() {
    this.dialogRef.close(this.formData.value);
  }
}
