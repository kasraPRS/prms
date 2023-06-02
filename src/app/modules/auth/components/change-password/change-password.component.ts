import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { NgmValidators } from 'src/app/_ngmValidations/validations/ngm-validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  showPass: { old?: boolean; new?: boolean; confirm?: boolean } = {};
  isLoading$: Observable<boolean>;
  confirmPassword: FormControl;
  returnUrl: string;
  form: FormGroup;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get fControls() {
    return this.form.controls;
  }

  initForm() {
    this.form = new FormGroup({
      currentPassword: new FormControl(null, [
        Validators.required,
        NgmValidators.password(6),
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        NgmValidators.password(6),
      ]),
    });
    this.confirmPassword = new FormControl(null, [
      Validators.required,
      NgmValidators.confirmPassword(this.fControls.newPassword),
    ]);
  }

  // Login User Without Two Verification
  submit() {
    const subscr = this.authService
      .changePassword(
        this.fControls.currentPassword.value,
        this.fControls.newPassword.value
      )
      .subscribe((response: any) => {
        this.router.navigate(['./message'], {
          relativeTo: this.route,
        });
      });
    this.unsubscribe.push(subscr);
  }
  back() {
    window.history.back();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
