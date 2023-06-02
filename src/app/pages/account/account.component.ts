import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { SplashScreenService } from 'src/app/_metronic/partials';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit, OnDestroy {
  user: UserModel;
  constructor(
    private splashScreenService: SplashScreenService,
    public marketerUser: MarketerUser,
    private authService: AuthService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.user = this.authService.currentUserValue!;
  }
  navigateToParentPage() {
    this.splashScreenService.show();
    this.router.navigate(['/activities/overview'], {
      queryParams: { i: this.marketerUser.marketer?.parentId },
      queryParamsHandling: 'merge',
    }).finally(() => this.splashScreenService.hide());
  }
  ngOnDestroy(): void { }
}
