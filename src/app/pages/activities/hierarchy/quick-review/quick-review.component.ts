import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { TeamHttpService } from 'src/app/_requests/team/team.service';
import { Team_QuickReviewDTO } from 'src/app/_requests/team/teamModel';
import { UserHttpService } from 'src/app/_requests/user/user.service';
import { User_GetParentUsersDTO } from 'src/app/_requests/user/userModel';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
@Component({
  selector: 'prms-quick-review',
  templateUrl: './quick-review.component.html',
})
export class QuickReviewComponent implements OnInit {

  parentUsers: User_GetParentUsersDTO[] = [];
  userId: number;

  constructor(
    private teamHttpService: TeamHttpService,
    private userHttpService: UserHttpService,
    private marketerUser: MarketerUser,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.userId = this.authService.currentUserSubject.value!.id;
  }

  ngOnInit(): void {
    this.getParentsList();
  }

  getParentsList() {
    this.userHttpService.GetParentUsers({ userId: this.marketerUser.marketer.id }).subscribe(res => {
      this.parentUsers = res.items;
      this.cdr.detectChanges();
    });
  }

}
