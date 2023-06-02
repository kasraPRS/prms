import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { NgmValidators } from 'src/app/_ngmValidations/validations/ngm-validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  showPass: { new?: boolean; confirm?: boolean } = {};
  isLoading$: Observable<boolean>;
  confirmPassword: FormControl;
  returnUrl: string;
  form: FormGroup;
  info: string;

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
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.info = this.route.snapshot.queryParams['info'];
    if (!this.info) this.router.navigate(['/error/404']);
  }

  // convenience getter for easy access to form fields
  get fControls() {
    return this.form.controls;
  }

  initForm() {
    this.form = new FormGroup({
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
      .resetPassword(
        this.info,
        this.fControls.newPassword.value
      )
      .subscribe((response: any) => {
        this.router.navigate(['./message'], {
          relativeTo: this.route,
        });
      });
    this.unsubscribe.push(subscr);
  }

  // Handle
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
