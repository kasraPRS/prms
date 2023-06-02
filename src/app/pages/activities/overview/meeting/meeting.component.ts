import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { MeetingServiceService } from 'src/app/_requests/meeting/meeting.service';
import { Meeting_getDTO } from 'src/app/_requests/meeting/meetingModel';
import { AddNewMeetingComponent } from '../../_dialogs/add-new-meeting/add-new-meeting.component';
import { MeetingTitleInfoDialogComponent } from '../../_dialogs/meeting-title-info-dialog/meeting-title-info-dialog.component';

@Component({
  selector: 'prms-meeting',
  templateUrl: './meeting.component.html',
})
export class MeetingComponent implements OnInit {

  meetingListitems: PaginationModel<Meeting_getDTO[]>;
  pageNumber: number = 1;
  pageSize: number = 10;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private dialog: MatDialog,
    private cdf: ChangeDetectorRef,
    private _meetingService: MeetingServiceService,
  ) { }

  ngOnInit(): void {
    this.getMeetingList();
  }

  getMeetingList() {
    this._meetingService
      .get({
        PageNumber: this.pageNumber,
        PageSize: 10
      })
      .subscribe((result) => {
        this.meetingListitems = result;
        this.cdf.detectChanges();
      });
  }

  openAddMeetingDialog() {
    this.dialog
      .open(AddNewMeetingComponent)
      .afterClosed()
      .subscribe((r) => {
        if (r) {
          this.getMeetingList();
          this.cdf.detectChanges();
          this.change.emit();
        }
      });
  }
  openMeetingInfoDialog(index: any) {
    let ref = this.dialog
      .open(MeetingTitleInfoDialogComponent, {
        data: this.meetingListitems.items[index],
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.getMeetingList();
          this.change.emit();
        }
      });
  }
  getPrevMeetingList() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getMeetingList();
    }
  }
  getNextMeetingList() {
    this.pageNumber++;
    this.getMeetingList();
  }

}
