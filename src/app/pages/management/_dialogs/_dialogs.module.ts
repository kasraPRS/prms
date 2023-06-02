import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardsModule } from 'src/app/_metronic/partials';
import { LinkInformationModule } from '../../activities/_dialogs/link-information/link-information.module';
import { RewardDetailsComponent } from './reward-details/reward-details.component';
import { EditRewardComponent } from './edit-reward/edit-reward.component';
import { ShowMarketersComponent } from './show-marketers/show-marketers.component';
import { ChooseNameForNewTeamComponent } from './choose-name-for-new-team/choose-name-for-new-team.component';



@NgModule({
  declarations: [
    RewardDetailsComponent,
    EditRewardComponent,
    ShowMarketersComponent,
    ChooseNameForNewTeamComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    CardsModule,
    LinkInformationModule
  ]
})
export class DialogsModule { }
