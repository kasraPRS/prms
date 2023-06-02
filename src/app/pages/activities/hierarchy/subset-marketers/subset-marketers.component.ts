import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TeamHttpService } from 'src/app/_requests/team/team.service';
import { Team_GetSubMarketersDTO } from 'src/app/_requests/team/teamModel';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
@Component({
  selector: 'prms-subset-marketers',
  templateUrl: './subset-marketers.component.html',
})
export class SubsetMarketersComponent implements OnInit {

  subSetMarketersList: Team_GetSubMarketersDTO[] = [];
  constructor(
    private teamHttpService: TeamHttpService,
    private marketerUser: MarketerUser,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getSubMarketers();
  }
  getSubMarketers() {
    this.teamHttpService.GetSubMarketers({ userId: this.marketerUser.marketer.id }).subscribe(res => {
      this.subSetMarketersList = res;
      this.cdr.detectChanges();
    });
  }

}
