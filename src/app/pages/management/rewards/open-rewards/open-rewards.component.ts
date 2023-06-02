import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManagementTooltips } from 'src/app/_tooltip/management/management.tooltip';
import { RewardDTO } from '../../ManagementDTO/RewardsDTO.model';
import { EditRewardComponent } from '../../_dialogs/edit-reward/edit-reward.component';
import { ShowMarketersComponent } from '../../_dialogs/show-marketers/show-marketers.component';

@Component({
  selector: 'prms-open-rewards',
  templateUrl: './open-rewards.component.html',
  styleUrls: ['./open-rewards.component.scss'],
})
export class OpenRewardsComponent implements OnInit {
  tooltips = ManagementTooltips.rewards.openRewards;
  // rewards: RewardDTO;
  rewards: {
    title: string;
    action: string;
    rewardedMarketers: number;
    reward: number;
    total: number;
    date: string;
    marketers: any[];
  }[] = [
    {
      title: 'Reward Title',
      action: 'Reward Action',
      rewardedMarketers: 1 / 5,
      reward: 3000,
      total: 200000,
      date: '20/2/2022',
      marketers: [
        {
          name: 'john doe',
          image: './assets/media/avatars/300-1.jpg',
        },
        {
          name: 'janet doe',
          image: './assets/media/avatars/300-2.jpg',
        },
        {
          name: 'janet doe',
          image: './assets/media/avatars/300-5.jpg',
        },
      ],
    },
    {
      title: 'Reward Title',
      action: 'Reward Action',
      rewardedMarketers: 1 / 5,
      reward: 3000,
      total: 200000,
      date: '20/2/2022',
      marketers: [
        {
          name: 'john doe',
          image: './assets/media/avatars/300-1.jpg',
        },
        {
          name: 'janet doe',
          image: './assets/media/avatars/300-2.jpg',
        },
      ],
    },
    {
      title: 'Reward Title',
      action: 'Reward Action',
      rewardedMarketers: 1 / 5,
      reward: 3000,
      total: 200000,
      date: '20/2/2022',
      marketers: [
        {
          name: 'john doe',
          image: './assets/media/avatars/300-7.jpg',
        },
        {
          name: 'janet doe',
          image: './assets/media/avatars/300-6.jpg',
        },
      ],
    },
    {
      title: 'Reward Title',
      action: 'Reward Action',
      rewardedMarketers: 1 / 5,
      reward: 3000,
      total: 200000,
      date: '20/2/2022',
      marketers: [
        {
          name: 'john doe',
          image: './assets/media/avatars/300-1.jpg',
        },
      ],
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.rewards);
  }

  editReward(reward: any) {
    this.dialog
      .open(EditRewardComponent, {
        data: reward,
      })
      .afterClosed()
      .subscribe((result) => {});
  }
  showMarketersDialog(marketers: any) {
    this.dialog
      .open(ShowMarketersComponent, {
        data: marketers,
      })
      .afterClosed()
      .subscribe((result) => {});
  }
  deletRewards(index: number) {
    this.rewards.splice(index, 1);
  }
  createRewatd() {
    this.dialog.open(EditRewardComponent);
  }
}
