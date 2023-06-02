import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { RewardHttpService } from 'src/app/_requests/reward/reward.service';
import { Reward_GetTeamRewardDTO } from 'src/app/_requests/reward/rewardModel';
import { ManagementTooltips } from 'src/app/_tooltip/management/management.tooltip';

@Component({
  selector: 'prms-rewards',
  templateUrl: './rewards.component.html',
})
export class RewardsComponent implements OnInit {

  tooltips = ManagementTooltips.commissions.createTeam.rewards;
  @Input() teamId: number;
  tableDataSource: PaginationModel<Reward_GetTeamRewardDTO[]> = new PaginationModel<Reward_GetTeamRewardDTO[]>();

  constructor(
    private rewardHttpService: RewardHttpService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }
  getData() {
    this.rewardHttpService.GetTeamReward({ teamId: this.teamId, PageNumber: this.tableDataSource.pageNumber, PageSize: 10 }).subscribe(res => {
      this.tableDataSource = res;
      this.cdr.detectChanges();
    });
  }
  generateRandom(min = 0, max = 100) {

    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;

  } //this method will be removed

}
