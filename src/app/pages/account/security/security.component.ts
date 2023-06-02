import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, UserModel } from 'src/app/modules/auth';
import { ToastrService } from 'src/app/_services/toastr.service';
import { MarketerUser } from 'src/app/_services/marketer-user.service';

@Component({
  selector: 'prms-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  user: UserModel;
  isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthService,
    public marketerUser: MarketerUser
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }
  ngOnInit(): void {
    this.user = this.authService.currentUserValue!;
  }
  toggleTwoFactorAuth() {
    // 2-Factor is Enabled => Disabled
    if (this.user.twoFactorEnabled && this.user.phoneNumberConfirmed) {
      this.authService.disableTwoStepVerification().subscribe((response: any) => {
        this.user.twoFactorEnabled = false;
      });
    }
    // 2-Factor is Disabled => Enabled
    else if (this.user.phoneNumber) {
      this.authService.sendCodeToPhoneNumber().subscribe((response: any) => {
        this.router.navigate(['/auth/phone-number/verify-code']);
      });
    } else {
      this.router.navigate(['/auth/phone-number/add']);
    }
  }
  resetPasswordForUser() {
    this.authService
      .resetPasswordByAdmin(this.marketerUser.marketerId)
      .subscribe((response: any) => {
        this.toastr.success(`
          We sent an email to ${this.marketerUser.marketer.email}
          for the user to change their password
        `);
      });
  }
}
