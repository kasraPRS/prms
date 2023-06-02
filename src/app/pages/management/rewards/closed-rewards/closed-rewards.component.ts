import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManagementTooltips } from 'src/app/_tooltip/management/management.tooltip';
import { EditRewardComponent } from '../../_dialogs/edit-reward/edit-reward.component';
@Component({
  selector: 'prms-closed-rewards',
  templateUrl: './closed-rewards.component.html',
})
export class ClosedRewardsComponent implements OnInit {
  tooltips = ManagementTooltips.rewards.closeRewards;
  rewards: {
    title: string;
    action: string;
    // rewardedMarketers: number;
    // reward: number;
    total: number;
    // date: string;
    marketers: any[];
  }[] = [
    {
      title: 'Reward Title',
      action: 'Reward Action',
      total: 200000,
      marketers: [
        './assets/media/avatars/300-1.jpg',
        './assets/media/avatars/300-2.jpg',
        './assets/media/avatars/300-5.jpg',
      ],
    },
    {
      title: 'Reward Title',
      action: 'Reward Action',
      total: 200000,
      marketers: [
        './assets/media/avatars/300-1.jpg',
        './assets/media/avatars/300-2.jpg',
      ],
    },
    {
      title: 'Reward Title',
      action: 'Reward Action',
      total: 200000,
      marketers: [
        './assets/media/avatars/300-7.jpg',
        './assets/media/avatars/300-6.jpg',
      ],
    },
    {
      title: 'Reward Title',
      action: 'Reward Action',
      total: 200000,
      marketers: ['./assets/media/avatars/300-7.jpg'],
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  editReward() {
    this.dialog
      .open(EditRewardComponent, {})
      .afterClosed()
      .subscribe((result) => {});
  }
}
