import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BehaviorSubject, finalize } from 'rxjs';
import { MeetingServiceService } from 'src/app/_requests/meeting/meeting.service';
import { Meeting_getDTO } from 'src/app/_requests/meeting/meetingModel';
import { ActivitiesTooltips } from 'src/app/_tooltip/tooltips';
import { AddNoteComponent } from '../add-note/add-note.component';
import { AddOtherMarketersComponent } from '../add-other-marketers/add-other-marketers.component';
import { AddThirdPartyParticipentsComponent } from '../add-third-party-participents/add-third-party-participents.component';

@Component({
  selector: 'prms-meeting-title-info-dialog',
  templateUrl: './meeting-title-info-dialog.component.html',
  styleUrls: ['./meeting-title-info-dialog.component.scss'],
})
export class MeetingTitleInfoDialogComponent implements OnInit, AfterViewInit {
  tooltips = ActivitiesTooltips.dialogs.newMeeting;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data: any;
  showAddNoteBtn: boolean = false;
  onShow: boolean = false;
  formData: FormGroup;
  participantes: any = [];
  thirdPartyParticipants: any = [];

  constructor(
    private dialogRef: MatDialogRef<MeetingTitleInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public meetingList: Meeting_getDTO,
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private _service: MeetingServiceService
  ) {
    this.data = meetingList;
    this.formData = this._fb.group({
      title: new FormControl(undefined),
      description: new FormControl(undefined),
      date: new FormControl(undefined),
      duration: new FormControl(undefined),
      // removedParticipantIds: [0],
      // newAddedParticipantUserIds: [0],
    });

    this.formData.get('title')?.setValue(this.data.title);
    this.formData.get('description')?.setValue(this.data.description);
    this.formData.get('date')?.setValue(this.data.date);
    this.formData.get('duration')?.setValue(this.data.duration);
    if (!this.onShow) this.formData.get('duration')?.disable();
    this.participantes = this.data.participants || [];
    // this.formData
    //   .get('newAddedThirdPartyParticipants')
    //   ?.patchValue(this.data.participantes);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.data) {
      // list of marketers
      let meetingDate = new Date(this.data.date).getTime();

      //
      let today = new Date().getTime();

      if (meetingDate < today) {
        this.showAddNoteBtn = true;
      }
    }
  }
  openAddNoteDialog() {
    this._dialog.open(AddNoteComponent);
  }
  close() {
    this.dialogRef.close();
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

  editFeilds() {
    this.onShow = !this.onShow;
    this.onShow
      ? this.formData.get('duration')?.enable()
      : this.formData.get('duration')?.disable();
  }
  getRequestBody() {
    let value = this.formData.value;
    return {
      id: this.data.id,
      title: value.title,
      description: value.description,
      date: value.date,
      duration: value.duration,
      removedParticipantIds: this.data.participants
        ?.filter(
          (i: any) =>
            this.participantes.findIndex((p: any) => p.id === i.id) === -1
        )
        .map((i: any) => i.id),
      newAddedParticipantUserIds: this.participantes
        ?.filter(
          (i: any) =>
            this.data.participants.findIndex((p: any) => p.id === i.id) === -1
        )
        .map((i: any) => i.id),
      newAddedThirdPartyParticipants: this.thirdPartyParticipants,
      result: '',
    };
  }
  onSubmit() {
    if (this.formData.invalid) return;
    this.isLoading$.next(true);
    const body = this.getRequestBody();
    this._service
      .put(body)
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((result) => {
        this.dialogRef.close(body);
      });
  }
}
