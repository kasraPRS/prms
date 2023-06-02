import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BehaviorSubject, finalize } from 'rxjs';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { DialogData } from '../new-meeting/new-meeting.component';
import { AddOtherMarketersComponent } from '../add-other-marketers/add-other-marketers.component';
import { AddThirdPartyParticipentsComponent } from '../add-third-party-participents/add-third-party-participents.component';
import { MeetingServiceService } from 'src/app/_requests/meeting/meeting.service';
import { ActivitiesTooltips } from 'src/app/_tooltip/tooltips';

@Component({
  selector: 'prms-add-new-meeting',
  templateUrl: './add-new-meeting.component.html',
  styleUrls: ['./add-new-meeting.component.scss'],
})
export class AddNewMeetingComponent implements OnInit, OnDestroy {
  tooltips = ActivitiesTooltips.dialogs.newMeeting;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dialogType: 'edit' | 'create' = 'create';
  participantes: any[] = [];
  thirdPartyParticipants: any[] = [];
  form: FormGroup = new FormGroup({
    duration: new FormControl(1),
    date: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    // participantes: new FormArray([]),
    // thirdPartyParticipants: new FormArray([]),
  });
  // get thirdPartyParticipants(): FormArray {
  //   return this.form.get('thirdPartyParticipants') as FormArray;
  // }
  // get participantes(): FormArray {
  //   return this.form.get('participantes') as FormArray;
  // }

  constructor(
    private _dialog: MatDialog,
    private dialogRef: MatDialogRef<AddNewMeetingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _fb: FormBuilder,
    private _service: MeetingServiceService
  ) {}

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }
  getRequestBody() {
    let value = this.form.value;
    return {
      title: value?.title,
      description: value?.description,
      date: value?.date,
      duration: value?.duration,
      participantUserIds: this.participantes.map((i) => i.id),
      thirdPartyParticipants: this.thirdPartyParticipants,
    };
  }
  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading$.next(true);
    let body = this.getRequestBody();
    this._service
      .post(body)
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((result) => {
        this.dialogRef.close(body);
      });
  }

  addOtherMarketersDialog() {
    let ref = this._dialog
      .open(AddOtherMarketersComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.participantes = result.participantesIds || [];
        }
        ref.unsubscribe();
      });
  }
  addThirdPartyPerticipants() {
    let ref = this._dialog
      .open(AddThirdPartyParticipentsComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.thirdPartyParticipants.push(result);
        }
        ref.unsubscribe();
      });
  }

  ngOnDestroy(): void {}
}
