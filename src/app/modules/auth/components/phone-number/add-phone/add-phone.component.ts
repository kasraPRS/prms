import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { delayWhen, first } from 'rxjs/operators';

import { AuthService } from '../../../services/auth.service';
import {
  PhoneNumberHandelService,
  PhoneNumberStateItemDTO,
} from '../phone-number-handel.service';
import Inputmask from 'inputmask';
import {
  CountryISO,
  NgxIntlTelInputComponent,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';

@Component({
  selector: 'prms-add-phone-number',
  templateUrl: './add-phone.component.html',
  providers: [PhoneNumberHandelService],
})
export class AddPhoneComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  CountryISO = CountryISO;
  isLoading$: Observable<boolean>;
  PhoneNumberFormat = PhoneNumberFormat;
  SearchCountryField = SearchCountryField;
  OnlyCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.Canada,
  ];
  @ViewChild(NgxIntlTelInputComponent, { static: true })
  telInputRef: NgxIntlTelInputComponent;


  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(
    private phoneNumberHandel: PhoneNumberHandelService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$.pipe(
      delayWhen((value) => (value ? timer(0) : timer(100)))
    );
  }
  // convenience getter for easy access to form fields
  get fControls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }
  ngAfterViewInit(): void {
    this.countryChange();
  }
  initForm() {
    this.form = new FormGroup({
      mobile: new FormControl(null, [Validators.required]),
    });
  }
  countryChange() {
    // let regex = this.telInputRef.selectedCountry.placeHolder.toString().replace(/\d/g, '9');
    // Inputmask(regex).mask(
    //   document.getElementById(this.telInputRef.inputId)!
    // );
    // console.log(this.telInputRef);
  }

  submit() {
    if (this.phoneNumberHandel.timer$.getValue() > 0) {
      this.router.navigate(['../verify-code'], { relativeTo: this.route });
      return;
    }
    const mobile =
      '+' + this.telInputRef.selectedCountry.dialCode + this.telInputRef.value;
    const subscr = this.authService
      .addOrUpdateMobile(mobile)
      .pipe(first())
      .subscribe((response: any) => {
        this.sendCodeToPhoneNumber(mobile);
      });
    this.unsubscribe.push(subscr);
  }
  sendCodeToPhoneNumber(mobile: string) {
    const subscr = this.authService
      .sendCodeToPhoneNumber()
      .pipe(first())
      .subscribe((response: any) => {
        let stateInfo = {} as PhoneNumberStateItemDTO;
        stateInfo.phone = mobile;
        stateInfo.time = 120;
        this.phoneNumberHandel.setStateItem(mobile, stateInfo);
        this.router.navigate(['../verify-code'], { relativeTo: this.route });
      });
    this.unsubscribe.push(subscr);
  }

  back() {
    window.history.back();
  }
}
