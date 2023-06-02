import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px'; // w-md-40px h-md-40px
  toolbarUserAvatarHeightClass = 'symbol-30px'; // symbol-md-40px
  toolbarButtonIconSizeClass = 'svg-icon-1';
  toolbarWalletClass = '';
  headerLeft: string = 'menu';
  user: UserModel;
  us: Subscription[] = [];

  constructor(
    private layout: LayoutService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.us.push(this.authService.currentUser$.subscribe((user) => this.user = user!))
    this.headerLeft = this.layout.getProp('header.left') as string;
  }
  ngOnDestroy(): void {
    this.us.forEach(u => u.unsubscribe());
  }
}
