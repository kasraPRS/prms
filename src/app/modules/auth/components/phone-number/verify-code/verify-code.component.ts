import {
  Component,
  OnInit,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, take } from 'rxjs';

import { UserModel } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import {
  PhoneNumberHandelService,
  PhoneNumberStateItemDTO,
} from '../phone-number-handel.service';

@Component({
  selector: 'prms-verify-code',
  templateUrl: './verify-code.component.html',
})
export class VerifyCodeComponent implements OnInit, AfterViewInit {
  @ViewChildren('codeRef') codeRef: QueryList<ElementRef>;
  isLoading$: Observable<boolean>;
  form: FormGroup;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public phoneNumberHandel: PhoneNumberHandelService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // Redirect If State Info dont Exist
    if (!this.phoneNumberHandel.state) {
      let phoneNumber = this.authService.currentUserValue?.phoneNumber;
      if (phoneNumber) {
        let stateInfo = {} as PhoneNumberStateItemDTO;
        stateInfo.phone = phoneNumber;
        stateInfo.time = 120;
        this.phoneNumberHandel.setStateItem(phoneNumber, stateInfo);
      } else {
        this.router.navigate(['../add'], {
          replaceUrl: true,
          relativeTo: this.route,
        });
      }
    }
    else {
      this.unsubscribe.push(
        this.phoneNumberHandel.endTimer$.subscribe((state) =>
          this.router.navigate(['../add'], {
            replaceUrl: true,
            relativeTo: this.route,
          })
        )
      );
    }
  }
  ngOnInit(): void {
    this.initForm();
  }
  ngAfterViewInit(): void {
    this.initMasks();
  }

  initForm() {
    let codeList = [];
    let codeLength = 4;
    for (let i = 0; i < codeLength; i++) {
      codeList.push(
        new FormControl(null, [Validators.required, Validators.maxLength(1)])
      );
    }
    this.form = new FormGroup({
      code: new FormArray(codeList),
    });
  }
  initMasks() {
    Inputmask('9{0,1}').mask(
      this.codeRef?.toArray().map((i) => i.nativeElement)
    );
  }

  fouseNextInput(index: number) {
    let code = this.form.get('code') as FormArray;
    if (code.length - 1 > index) {
      this.codeRef.toArray()[index + 1].nativeElement.focus();
    }
    // else {
    //   this.codeRef.toArray()[index].nativeElement.blur();
    // }
  }

  submit() {
    const subscr = this.authService
      .validatePhoneNumber(this.form.value.code.join(''))
      .pipe(take(1))
      .subscribe((response: any) => {
        this.router.navigate(['./message'], {
          relativeTo: this.route,
        });
      });
    this.unsubscribe.push(subscr);
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
