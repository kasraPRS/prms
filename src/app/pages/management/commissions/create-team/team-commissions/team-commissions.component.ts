import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TeamHttpService } from 'src/app/_requests/team/team.service';
import { Team_GetTeamDataDTO } from 'src/app/_requests/team/teamModel';
import { ToastrService } from 'src/app/_services/toastr.service';

@Component({
  selector: 'prms-team-commissions',
  templateUrl: './team-commissions.component.html',
})
export class TeamCommissionsComponent implements OnInit {

  @Input() teamId: number;
  changingCommissions: boolean;
  dataSource: Team_GetTeamDataDTO;
  commissions = {
    "rmCommission": 0,
    "dmCommission": 0,
    "level3Commission": 0,
    "level4Commission": 0,
    "level5Commission": 0,
  };

  constructor(
    private teamHttpService: TeamHttpService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.teamHttpService.GetTeamData({ TeamId: this.teamId }).subscribe(res => {
      this.dataSource = res;
      this.setDefaultCommissionsToFormCommissions();
      this.cdr.detectChanges();
    });
  }
  setDefaultCommissionsToFormCommissions() {
    this.commissions = {
      rmCommission: this.dataSource.commission.rmCommission,
      dmCommission: this.dataSource.commission.dmCommission,
      level3Commission: this.dataSource.commission.level3Commission,
      level4Commission: this.dataSource.commission.level4Commission,
      level5Commission: this.dataSource.commission.level5Commission
    };
  }
  setFormCommissionsToDefaultCommissions() {
    this.dataSource.commission.rmCommission = this.commissions.rmCommission;
    this.dataSource.commission.dmCommission = this.commissions.dmCommission;
    this.dataSource.commission.level3Commission = this.commissions.level3Commission;
    this.dataSource.commission.level4Commission = this.commissions.level4Commission;
    this.dataSource.commission.level5Commission = this.commissions.level5Commission;
  }
  onBtnEditClick() {
    this.changingCommissions = true;
    this.cdr.detectChanges();
  }
  onBtnApplyClick() {
    if (
      this.commissions.rmCommission +
      this.commissions.dmCommission +
      this.commissions.level3Commission +
      this.commissions.level4Commission +
      this.commissions.level5Commission > 50
    ) this.toastr.error('The Total Share can not be more than 50%');
    else { 
      this.changingCommissions = false;
      this.cdr.detectChanges();
      this.editCommissions();
    }
  }
  editCommissions() {

    if (
      this.dataSource.commission.rmCommission != this.commissions.rmCommission ||
      this.dataSource.commission.dmCommission != this.commissions.dmCommission ||
      this.dataSource.commission.level3Commission != this.commissions.level3Commission ||
      this.dataSource.commission.level4Commission != this.commissions.level4Commission ||
      this.dataSource.commission.level5Commission != this.commissions.level5Commission
    ) {

      this.teamHttpService.put({
        teamId: this.teamId,
        dmCommission: this.commissions.dmCommission,
        rmCommission: this.commissions.rmCommission,
        level3Commission: this.commissions.level3Commission,
        level4Commission: this.commissions.level4Commission,
        level5Commission: this.commissions.level5Commission,
        name: this.dataSource.name
      }).subscribe({
        next: () => {
          this.setFormCommissionsToDefaultCommissions();
          this.cdr.detectChanges();
        },
        error: () => {
          this.setDefaultCommissionsToFormCommissions();
          this.cdr.detectChanges();
        }
      });

    }

  }

}
