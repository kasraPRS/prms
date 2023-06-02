import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { LayoutTooltips } from 'src/app/_tooltip/tooltips';

interface LinkDTO {
  title: string;
  routerLink: string;
  condition?: string;
}

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  user: UserModel;
  tooltips = LayoutTooltips.header;

  // #region links
  ManagementLinks: LinkDTO[] = [
    { title: 'Overview', routerLink: '/management/overview' },
    { title: 'Marketers', routerLink: '/management/marketers' },
    { title: 'Links and Compaings', routerLink: '/management/links-campaigns' },
    {
      title: 'Rewards',
      routerLink: '/management/rewards',
      condition: 'this.user.access.management.rewards?.allowed',
    },
    {
      title: 'Commissions',
      routerLink: '/management/commissions',
      condition: 'this.user.access.management.commissions?.allowed',
    },
  ];
  ActivitiesLinks: LinkDTO[] = [
    { title: 'Overview', routerLink: '/activities/overview' },
    { title: 'Hierarchy', routerLink: '/activities/hierarchy' },
    { title: 'Activity', routerLink: '/activities/activity' },
    { title: 'Links', routerLink: '/activities/links' },
    { title: 'Campaings', routerLink: '/activities/campaigns' },
    { title: 'Contracts', routerLink: '/activities/contracts' },
    { title: 'Documents', routerLink: '/activities/documents' },
  ];
  AdministrationLinks: LinkDTO[] = [
    { title: 'Contracts', routerLink: '/administration/contracts' },
    {
      title: 'Graduated Scale Commission',
      routerLink: '/administration/graduated-scale-commission',
    },
    {
      title: 'Pay Per Operation',
      routerLink: '/administration/pay-per-operation',
    },
    { title: 'Access Levels', routerLink: '/administration/access-levels' },
    { title: 'Commissions', routerLink: '/administration/commissions' },
    { title: 'Marketers', routerLink: '/administration/marketers' },
    { title: 'Users', routerLink: '/administration/users' },
    {
      title: 'Links and Campaigns',
      routerLink: '/administration/links-and-campaigns',
    },
  ];
  ReportsLinks: LinkDTO[] = [
    { title: 'Overview', routerLink: '/reports/overview' },
    { title: 'Marketers Return to Platform', routerLink: '/reports/marketeres-return-to-platform' },
    { title: 'Marketers Income', routerLink: '/reports/marketeres-income' },
    { title: 'Active Marketers', routerLink: '/reports/active-marketers' },
    { title: 'Inactive Marketers', routerLink: '/reports/inactive-marketers' },
    { title: 'Marketers Link Count', routerLink: '/reports/marketers-link-count' },
    { title: 'Marketers Successful Links', routerLink: '/reports/marketers-successful-links' },
    { title: 'Marketers Success in The U.S.', routerLink: '/reports/marketers-success-in-us' },
    { title: 'Marketers Number in The U.S.', routerLink: '/reports/marketers-number-in-us' },
    { title: 'Marketers Success in Canada', routerLink: '/reports/marketers-success-in-canada' },
    { title: 'Marketers Number in Canada', routerLink: '/reports/marketers-number-in-canada' },
    { title: 'Recurring Report', routerLink: '/reports/recurring-report' },
  ];
  MyAccountLinks: LinkDTO[] = [
    { title: 'Account Setting', routerLink: '/account/settings' },
    { title: 'Earnings', routerLink: '/account/earnings' },
    { title: 'Security', routerLink: '/account/security' },
  ];
  // #endregion links

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this.user = this.authService.currentUserValue!;
  }

  checkCondition(str: string) {
    if (!str) return true;
    return eval(str);
  }
  calculateMenuItemCssClass(url: string): string {
    return checkIsActive(this.router.url, url) ? 'active' : '';
  }
}

const getCurrentUrl = (pathname: string): string => {
  return pathname.split(/[?#]/)[0];
};

const checkIsActive = (pathname: string, url: string) => {
  const current = getCurrentUrl(pathname);
  if (!current || !url) {
    return false;
  }

  if (current === url) {
    return true;
  }

  if (current.indexOf(url) > -1) {
    return true;
  }

  return false;
};
