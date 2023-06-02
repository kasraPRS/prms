import { NgModule } from '@angular/core';

// components
import { NewLinkComponent } from './new-link/new-link.component';
import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardsModule } from 'src/app/_metronic/partials';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewMeetingComponent } from './new-meeting/new-meeting.component';
import { AddNewMeetingComponent } from './add-new-meeting/add-new-meeting.component';
import { RewardDetailsComponent } from './reward-details/reward-details.component';
import { LinkInformationModule } from './link-information/link-information.module';
import { UploadNewFileComponent } from './upload-new-file/upload-new-file.component';
import { AddOtherMarketersComponent } from './add-other-marketers/add-other-marketers.component';
import { AddThirdPartyParticipentsComponent } from './add-third-party-participents/add-third-party-participents.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { MeetingTitleInfoDialogComponent } from './meeting-title-info-dialog/meeting-title-info-dialog.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

const Dialogs = [
  NewLinkComponent,
  NewCampaignComponent,
  RewardDetailsComponent,
];

@NgModule({
  declarations: [
    ...Dialogs,
    NewMeetingComponent,
    AddNewMeetingComponent,
    UploadNewFileComponent,
    AddOtherMarketersComponent,
    AddThirdPartyParticipentsComponent,
    AddNoteComponent,
    MeetingTitleInfoDialogComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CardsModule,
    SharedModule,
    LinkInformationModule,
    NgbTooltipModule
  ],
  entryComponents: [...Dialogs],
})
export class DialogsModule {}
