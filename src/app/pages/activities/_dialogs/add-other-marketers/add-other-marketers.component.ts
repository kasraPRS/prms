import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Subscription,
} from 'rxjs';
import { UserHttpService } from 'src/app/_requests/user/user.service';
import { User_getAllUsersDTO } from 'src/app/_requests/user/userModel';
import { DialogData } from '../new-meeting/new-meeting.component';

@Component({
  selector: 'prms-add-other-marketers',
  templateUrl: './add-other-marketers.component.html',
  styleUrls: ['./add-other-marketers.component.scss'],
})
export class AddOtherMarketersComponent
  implements OnInit, AfterViewInit, OnDestroy {
  formData: FormGroup;
  subscription: Subscription[] = [];
  keyUpSubscription: Subscription;

  users: User_getAllUsersDTO;
  @ViewChild('searchFiel') searchFiel: ElementRef;
  @ViewChild('checkedMarketer') checkedMarketer: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<AddOtherMarketersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _fb: FormBuilder,
    private _service: UserHttpService
  ) {
    this.formData = this._fb.group({
      participantesIds: this._fb.array([]),
    });
  }

  ngOnInit(): void {
    this.subscription.push(
      this._service.getAllUsers1().subscribe((result) => {
        this.users = result;
      })
    );
  }
  ngAfterViewInit(): void {
    this.searchFielFromEvent();
  }

  searchFielFromEvent() {
    this.subscription.push(
      (this.keyUpSubscription = fromEvent(
        this.searchFiel.nativeElement,
        'keyup'
      )
        .pipe(
          debounceTime(1000),
          map((event: any) => (<HTMLInputElement>event.target).value)
        )
        .subscribe((result) => {
          this.searchMarketers(result);
        }))
    );
  }

  close() {
    this.dialogRef.close();
  }

  searchMarketers(value: string) {
    distinctUntilChanged(),
      this.subscription.push(
        this._service.searchInUsers({ Name: value }).subscribe((result) => {
          this.users = result;
        })
      );
  }
  onCheckChange(item: any, isChecked: boolean) {
    const participantes = this.formData.controls.participantesIds as FormArray;

    if (isChecked) {
      participantes.push(new FormControl(item));
    } else {
      const index = participantes.controls.findIndex((x) => x.value === item);
      participantes.removeAt(index);
    }
  }

  onSubmit() {
    this.dialogRef.close(this.formData.value);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((el) => el.unsubscribe);
  }
}
