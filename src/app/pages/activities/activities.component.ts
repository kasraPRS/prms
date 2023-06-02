import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { SplashScreenService } from 'src/app/_metronic/partials';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
import { ActivitiesTooltips } from 'src/app/_tooltip/tooltips';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
})
export class ActivitiesComponent implements OnInit, AfterViewInit, OnDestroy {
  access: any;
  userId: number;
  user: UserModel;
  checkedAccess: boolean = false;
  tooltips = ActivitiesTooltips;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public marketerUser: MarketerUser,
    private authService: AuthService,
    private splashScreenService: SplashScreenService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    this.user = this.authService.currentUserValue!;
    this.access = this.authService.currentUserValue!.access.activities;
    console.log(this.access)
    this.getUserId();
  }
  ngAfterViewInit(): void {
    this.checkedAccess = true;
  }
  getUserId() {
    const marketerId = this.marketerUser.marketer.id;
    if (marketerId != this.authService.currentUserSubject.value!.id) {
      this.userId = marketerId;
    }
  }
  navigateToParentPage() {
    this.splashScreenService.show();
    this.router
      .navigate(['/activities/overview'], {
        queryParams: { i: this.marketerUser.marketer?.parentId },
        queryParamsHandling: 'merge',
      })
      .finally(() => setTimeout(() => this.splashScreenService.hide(), 200));
  }

  ngOnDestroy(): void {}
}
