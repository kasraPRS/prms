import { ActivatedRoute, Router } from "@angular/router";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { RoleType } from "../../models/user.model";
import { User_loginDTO } from "src/app/_requests/user/userModel";

export interface LoginStateItemDTO extends User_loginDTO {
  email: string;
  time: number;
}
export interface LoginStateDTO {
  [index: string]: LoginStateItemDTO;
}

@Injectable()
export class LoginHandelService implements OnDestroy {
  // Storage
  closeTimerStorage: string = 'close-page-time';
  loginStateStorage: string = 'login-state';
  emailStorage: string = 'login-email';

  endTimer$: Subject<LoginStateItemDTO> = new Subject<LoginStateItemDTO>();
  timer$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  email: string; // Save Login Email
  loginState: LoginStateDTO = {};
  timerInterval: any;
  returnUrl: string;


  get state(): LoginStateItemDTO {
    return this.loginState[this.email];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { this.init(); }
  init() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.getStateFromStorage();
    this.getEmailFromStorage();
    this.checkCurrentTime();
    this.setState(this.email);
  }

  setState(email: string) {
    this.email = email;
    if (this.state) {
      this.setTimer(this.state.time);
      this.setEmailToStorage(email);
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

      if (this.loginState[key].email === this.state?.email) {
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
  setStateItem(forEmail: string, state: LoginStateItemDTO) {
    this.email = forEmail;
    this.loginState[forEmail] = state;
    this.setTimer(state.time);
    this.setEmailToStorage(forEmail);
    this.setStateToStorage(this.loginState);
    this.startTimer();
  }
  setStateToStorage(loginStateInfo: LoginStateDTO) {
    sessionStorage.setItem(this.loginStateStorage, JSON.stringify(loginStateInfo));
  }
  getStateFromStorage() {
    this.loginState = JSON.parse(sessionStorage.getItem(this.loginStateStorage) || '{}');
  }
  setEmailToStorage(email: string) {
    sessionStorage.setItem(this.emailStorage, email);
  }
  getEmailFromStorage() {
    this.email = sessionStorage.getItem(this.emailStorage) || '';
  }
  // #endregion State Info

  // #region Navigate
  navigate(role: RoleType) {
    if (this.returnUrl)
      this.router.navigate([this.returnUrl]);
    else if (role === 'admin')
      this.router.navigate(['/administration/contracts']);
    else this.router.navigate(['/activities/overview']);
    this.stopTimer();
    sessionStorage.clear();
  }
  // #region navigate

  ngOnDestroy(): void { this.stopTimer(); }
}