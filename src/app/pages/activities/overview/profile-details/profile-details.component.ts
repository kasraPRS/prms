import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService, RoleType, UserModel } from 'src/app/modules/auth';
import { TokenService } from 'src/app/modules/auth/services/token.service';
import { MarketerUser } from 'src/app/_services/marketer-user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit, AfterViewInit {
  user: UserModel;
  checkedAccess: boolean = false;
  constructor(
    private authService: AuthService,
    public marketerUser: MarketerUser,
  ) { }
  ngOnInit(): void {
    this.user = this.authService.currentUserValue!;
  }
  ngAfterViewInit(): void {
    this.checkedAccess = true;
  }
}
