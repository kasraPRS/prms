import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/modules/auth';
import { FullCalendarComponents } from './full-calendar/full-calendar.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['././overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @ViewChild('calenderRef') calenderRef: FullCalendarComponents;
  access: any;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.access = this.authService.currentUserValue!.access.activities.overview;
  }
  meetingChanged() {
    this.calenderRef?.getCalendarEvents();
  }
}
