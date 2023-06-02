import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamHttpService } from 'src/app/_requests/team/team.service';

@Component({
  selector: 'prms-choose-name-for-new-team',
  templateUrl: './choose-name-for-new-team.component.html',
})
export class ChooseNameForNewTeamComponent {

  name: string;
  headUserId: number;
  submitting: boolean;
  defaultPercentages = {
    "rmCommission": 0,
    "dmCommission": 0,
    "level3Commission": 0,
    "level4Commission": 0,
    "level5Commission": 0
  };

  constructor(
    public ref: MatDialogRef<ChooseNameForNewTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private teamHttpService: TeamHttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.defaultPercentages = {
      dmCommission: data.dmCommission,
      rmCommission: data.rmCommission,
      level3Commission: data.level3Commission,
      level4Commission: data.level4Commission,
      level5Commission: data.level5Commission,
    };
    this.headUserId = data.headUserId;
  }

  onBtnDoneClick() {
    this.submitting = true;
    this.cdr.detectChanges();

    /** create team */
    this.teamHttpService.post({
      headUserId: this.headUserId,
      name: this.name,
      rmCommission: this.defaultPercentages.rmCommission!,
      dmCommission: this.defaultPercentages.dmCommission!,
      level3Commission: this.defaultPercentages.level3Commission!,
      level4Commission: this.defaultPercentages.level4Commission!,
      level5Commission: this.defaultPercentages.level5Commission!
    }).subscribe(res => {      
      this.router.navigate(['/management/commissions/create-team/' + res.id], { relativeTo: this.activatedRoute });
      this.ref.close();
    });

  }

}
