import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get fControls() {
    return this.form.controls;
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(this.route.snapshot.queryParams['email'], [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320),
      ]),
    });
  }

  submit() {
    const forgotPasswordSubscr = this.authService
      .sendResetPasswordInfoToEmail(this.fControls.email.value)
      .pipe(first())
      .subscribe((response: any) => {
        this.router.navigate(['/auth/forgot-password/send-email'], {
          queryParams: {
            email: this.fControls.email.value,
          },
        });
      });
    this.unsubscribe.push(forgotPasswordSubscr);
  }
}
