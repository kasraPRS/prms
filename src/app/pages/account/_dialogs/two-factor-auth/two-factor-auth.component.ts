import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

/**
  get => null
  return => null
  action => active and deactive two factor or two verification user
*/
@Component({
  selector: 'prms-two-factor-auth-dialog',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.scss'],
})
export class TwoFactorAuthDialogComponent implements OnInit {
  form: FormGroup;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private dialogRef: MatDialogRef<TwoFactorAuthDialogComponent>) {
    this.initForm();
  }
  t() {
    console.log(this.form);
    
  }
  initForm() {
    this.form = new FormGroup({
      twoVerification: new FormControl(false),
    });
  }
  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }
}
