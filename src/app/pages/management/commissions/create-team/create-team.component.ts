import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { customCommissionHttpService } from 'src/app/_requests/customCommission/customCommission.service';
import { CustomCommission_GetCustomCommissionOfUserDTO } from 'src/app/_requests/customCommission/customCommissionModel';
import { TeamHttpService } from 'src/app/_requests/team/team.service';
import { ChooseNameForNewTeamComponent } from '../../_dialogs/choose-name-for-new-team/choose-name-for-new-team.component';

@Component({
  selector: 'prms-create-team',
  templateUrl: './create-team.component.html',
})
export class CreateTeamComponent implements OnInit {

  teamId: number;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTeamId();
  }
  getTeamId() {
    this.activatedRoute.params.subscribe(params => {
      this.teamId = params.id;
    });
  }

}
