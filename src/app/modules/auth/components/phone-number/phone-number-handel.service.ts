import { ActivatedRoute, Router } from "@angular/router";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { RoleType } from "../../models/user.model";

export interface PhoneNumberStateItemDTO {
  phone: string;
  time: number;
}
export interface PhoneNumberStateDTO {
  [index: string]: PhoneNumberStateItemDTO;
}

@Injectable()
export class PhoneNumberHandelService implements OnDestroy {
  // Storage
  closeTimerStorage: string = 'close-phone-number-page-time';
  loginStateStorage: string = 'phone-number-state';
  phoneStorage: string = 'phone-number';

  endTimer$: Subject<PhoneNumberStateItemDTO> = new Subject<PhoneNumberStateItemDTO>();
  timer$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  phone: string; // Save PhoneNumber Phone
  loginState: PhoneNumberStateDTO = {};
  timerInterval: any;
  returnUrl: string;


  get state(): PhoneNumberStateItemDTO {
    return this.loginState[this.phone];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { this.init(); }
  init() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.getStateFromStorage();
    this.getPhoneFromStorage();
    this.checkCurrentTime();
    this.setState(this.phone);
  }

  setState(phone: string) {
    this.phone = phone;
    if (this.state) {
      this.setTimer(this.state.time);
      this.setPhoneToStorage(phone);
    }
    else this.setTimer(0);
  }

  // #region Timer
  setTimer(time: number = 0) {
    this.timer$.next(time);
  }
  startTimer() {
    if (this.timerInterval) return;
    this.timerInterval = setInterval(() => {
      if (!Object.keys(this.loginState).length) this.stopTimer();
      else this.reduceStateTime(1);
    }, 1000);
  }
  checkCurrentTime() {
    let oldTime = Number(sessionStorage.getItem(this.closeTimerStorage));
    let newTime = (new Date()).getTime();
    let diffTime = newTime - oldTime;

    this.reduceStateTime(Math.floor(diffTime / 1000));
    this.startTimer();
  }
  reduceStateTime(diffTime: number) {
    Object.keys(this.loginState).forEach(key => {
      this.loginState[key].time -= diffTime;

      if (this.loginState[key].phone === this.state?.phone) {
        this.setTimer(this.state?.time);
        if (this.state.time <= 0) this.endTimer$.next(this.state);
      }

      if (this.loginState[key].time <= 0)
        delete this.loginState[key];
    });

    this.setStateToStorage(this.loginState);
    this.setCloseTimerToStorage();
  }
  setCloseTimerToStorage() {
    sessionStorage.setItem(this.closeTimerStorage, (new Date()).getTime().toString());
  }
  stopTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.setCloseTimerToStorage();
  }
  // #endregion Timer

  // #region State Info
  setStateItem(forPhone: string, state: PhoneNumberStateItemDTO) {
    this.phone = forPhone;
    this.loginState[forPhone] = state;
    this.setTimer(state.time);
    this.setPhoneToStorage(forPhone);
    this.setStateToStorage(this.loginState);
    this.startTimer();
  }
  setStateToStorage(loginStateInfo: PhoneNumberStateDTO) {
    sessionStorage.setItem(this.loginStateStorage, JSON.stringify(loginStateInfo));
  }
  getStateFromStorage() {
    this.loginState = JSON.parse(sessionStorage.getItem(this.loginStateStorage) || '{}');
  }
  setPhoneToStorage(phone: string) {
    sessionStorage.setItem(this.phoneStorage, phone);
  }
  getPhoneFromStorage() {
    this.phone = sessionStorage.getItem(this.phoneStorage) || '';
  }
  // #endregion State Info

  ngOnDestroy(): void { this.stopTimer(); }
}