import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { UserModel } from '../../../models/user.model';
import { AuthService, UserType } from '../../../services/auth.service';
import { LoginHandelService, LoginStateItemDTO } from '../login-handel.service';
import { User_loginDTO } from 'src/app/_requests/user/userModel';

@Component({
  selector: 'prms-password-login',
  templateUrl: './password-login.component.html',
})
export class PasswordLoginComponent implements OnInit {
  // KeenThemes mock, change it to:
  isLoading$: Observable<boolean>;
  showPass: boolean = false;
  form: FormGroup;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public loginHandel: LoginHandelService,
  ) { this.isLoading$ = this.authService.isLoading$; }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get fControls() {
    return this.form.controls;
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null,
        [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ],
      ),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ),
    });
  }

  submit() {
    if (this.loginHandel.timer$.getValue() > 0) {
      this.router.navigate(['../code'], { relativeTo: this.route })
      return;
    }

    let email = this.fControls.email.value;
    const subscr = this.authService
      .login(this.fControls.email.value, this.fControls.password.value)
      .pipe(take(1))
      .subscribe((response: UserType | User_loginDTO) => {
        if (response instanceof UserModel) {
          this.loginHandel.navigate(response.role);
        } else {
          let stateInfo = response as LoginStateItemDTO;
          stateInfo.email = email;
          stateInfo.time = 120;
          this.loginHandel.setStateItem(email, stateInfo);
          this.router.navigate(['../code'], { relativeTo: this.route })
        }
      });
    this.unsubscribe.push(subscr);
  }
}
