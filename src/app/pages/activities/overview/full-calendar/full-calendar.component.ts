import { MatDialogRef } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import { AddNewMeetingComponent } from '../../_dialogs/add-new-meeting/add-new-meeting.component';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { Meeting_getDTO } from 'src/app/_requests/meeting/meetingModel';
import { CalendarHttpService } from 'src/app/_requests/calendar/calendar.service';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
import { Calender_GetEventsDTO } from 'src/app/_requests/calendar/calendarModel';

@Component({
  selector: 'prms-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss'],
})
export class FullCalendarComponents implements OnInit {
  initialEvents: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  options: any;
  eventsModel: any;

  @ViewChild('calendarRef') calendarRef: FullCalendarComponent;
  @ViewChild('external') external: ElementRef;

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    // editable: false,
    // selectable: true,
    // selectMirror: true,
    // dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };


  meetingDialogDetailRef: MatDialogRef<AddNewMeetingComponent>;
  meetingListitems: PaginationModel<Meeting_getDTO[]>;

  testString: string;
  constructor(
    private cdr: ChangeDetectorRef,
    private calendarHttpService: CalendarHttpService,
    private marketerUser: MarketerUser
  ) { }

  ngOnInit(): void {
    this.getCalendarEvents();
  }

  getCalendarEvents() {
    const TODAY = new Date();
    this.calendarHttpService.GetEvents({
      userId: this.marketerUser.marketer.id,
      periodType: 2,
      date: `${TODAY.getFullYear()}-${TODAY.getMonth() + 1}-01`
    }).subscribe(res => {

      this.calendarRef.options!.events = res.map(i => this.generateEvent(i));
      this.cdr.detectChanges();

    });
  }
  generateEvent(event: Calender_GetEventsDTO): EventInput {
    return {
      title: event.title,
      start: event.date//new Date(Date.parse(event.date)).toISOString().replace(/T.*$/, '') + 'T12:00:00'
    }
  }

  handleDateSelect(selectInfo: DateSelectArg) { //add meeting
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }
  handleEventClick(clickInfo: EventClickArg) {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  }
  handleEvents(events: EventApi[]) {
    // this.currentEvents = events;
  }



}
