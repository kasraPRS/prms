import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardsModule } from 'src/app/_metronic/partials';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogsModule } from '../_dialogs/_dialogs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { OverviewComponent } from './overview.component';
import { NotesComponent } from './notes/notes.component';
import { RewardsComponent } from './rewards/rewards.component';
import { UndoneTasksComponent } from './undone-tasks/undone-tasks.component';
import { RecentLinksComponent } from './recent-links/recent-links.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { MonthlyIncomeComponent } from './monthly-income/monthly-income.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { RecentCompaignsComponent } from './recent-compaigns/recent-compaigns.component';
import { PaymentsOperationComponent } from './payments-operation/payments-operation.component';
import { AllRewardsComponent } from './rewards/all-rewards/all-rewards.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { FullCalendarComponents } from './full-calendar/full-calendar.component';
import { NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RewardInfoDialogModule } from "../_dialogs/reward-info/reward-info.module";
import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
import { MeetingComponent } from './meeting/meeting.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  // listPlugin,
  interactionPlugin
])

const DialogsModuls = [
  RewardInfoDialogModule,
]

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
  },
];

@NgModule({
  declarations: [
    NotesComponent,
    RewardsComponent,
    AllRewardsComponent,
    OverviewComponent,
    RecentLinksComponent,
    UndoneTasksComponent,
    MonthlyIncomeComponent,
    ActivityListComponent,
    ProfileDetailsComponent,
    RecentCompaignsComponent,
    PaymentsOperationComponent,
    FullCalendarComponents,
    MeetingComponent,
  ],
  imports: [
    CardsModule, //
    MatDialogModule,
    SharedModule,
    FormsModule,
    NgApexchartsModule,
    DialogsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbPopoverModule,
    InfiniteScrollModule,
    // Dialogs  
    ...DialogsModuls,
    FullCalendarModule // import the FullCalendar module! will make the FullCalendar component available
  ],
  exports: [RewardsComponent],
})
export class OverviewModule { }
