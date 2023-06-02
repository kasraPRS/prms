import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, switchMap, finalize, tap, take } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { Router } from '@angular/router';

import { AuthInformation } from '../models/auth-information';

import { TokenService } from './token.service';
import { UserHttpService } from 'src/app/_requests/user/user.service';
import {
  User_generateUserByLink_body,
  User_isUserInParents,
  User_isUserParentOrChild,
  User_loginDTO,
  User_updateProfile_body,
} from 'src/app/_requests/user/userModel';

export type UserType = UserModel | undefined;
export type AuthInformationType = AuthInformation | undefined;

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }
  private set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private userHttpService: UserHttpService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.tokenService.getAuthFromLocalStorage();
  }

  // public methods
  login(email: string, password: string): Observable<UserType | User_loginDTO> {
    this.isLoadingSubject.next(true);
    return this.userHttpService.login(email, password).pipe(
      switchMap((response: User_loginDTO) => {
        if (response.twoStepVerification && response.loginStep === 1) {
          return new Observable<User_loginDTO>((o) => o.next(response));
        } else {
          this.setToken(response.jwt);
          return this.getUserById();
        }
      }),
      finalize(() => {
        this.isLoadingSubject.next(false);
      })
    );
  }
  loginVerifiacationCode(userId: number, code: number) {
    this.isLoadingSubject.next(true);
    return this.userHttpService.loginVerifiacationCode(userId, code).pipe(
      tap((responce: User_loginDTO) => {
        this.setToken(responce.jwt);
      }),
      switchMap(() => this.getUserById()),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getUserById(): Observable<UserType> {
    if (!this.tokenService?.authModel?.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.userHttpService
      .getUserById(<string>this.tokenService.decodedToken?.nameid)
      .pipe(
        map((user: UserType) => {
          let userModel = new UserModel(
            <AuthInformation>this.tokenService.decodedToken
          );
          if (user) {
            userModel.setUser(user);
            this.currentUserSubject.next(userModel);
          } else {
            this.logout();
          }
          return userModel;
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  validatePhoneNumber(code: number) {
    this.isLoadingSubject.next(true);
    return this.userHttpService
      .validatePhoneNumber({ code })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  addOrUpdateMobile(mobile: string) {
    this.isLoadingSubject.next(true);
    return this.userHttpService
      .addOrUpdateMobile({ mobile })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  sendCodeToPhoneNumber() {
    this.isLoadingSubject.next(true);
    return this.userHttpService
      .sendCodeToPhoneNumber()
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  disableTwoStepVerification() {
    this.isLoadingSubject.next(true);
    return this.userHttpService
      .disableTwoStepVerification()
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  changePassword(currentPassword: string, newPassword: string) {
    this.isLoadingSubject.next(true);
    return this.userHttpService
      .changePassword({ currentPassword, newPassword })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  resetPassword(resetPasswordInfo: string, newPassword: string) {
    this.isLoadingSubject.next(true);
    return this.userHttpService
      .resetPassword({ resetPasswordInfo, newPassword })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  resetPasswordByAdmin(userId: number) {
    this.isLoadingSubject.next(true);
    return this.userHttpService
      .resetPasswordByAdmin({ userId })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  sendResetPasswordInfoToEmail(
    email: string | null = null,
    userId: number | null = 0
  ) {
    this.isLoadingSubject.next(true);
    return this.userHttpService
      .sendResetPasswordInfoToEmail({ email, userId })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  isUserInParents(
    CheckingUserId: number,
    UserId: number = 0
  ): Observable<User_isUserInParents> {
    this.isLoadingSubject.next(true);
    return this.userHttpService
      .isUserInParents({ UserId, CheckingUserId })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  isUserParentOrChild(
    CheckingUserId: number,
    UserId: number = 0
  ): Observable<User_isUserParentOrChild> {
    this.isLoadingSubject.next(true);
    return this.userHttpService
      .isUserParentOrChild({ UserId, CheckingUserId })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  registration(body: User_generateUserByLink_body): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.userHttpService.generateUserByLink(body).pipe(
      tap((token: string) => {
        this.setToken(token);
      }),
      switchMap(() => this.getUserById()),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  updateProfile(body: User_updateProfile_body): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.userHttpService.updateProfile(body).pipe(
      switchMap(() => this.getUserById()),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    this.tokenService.removeAuthFromLocalStorage();
    this.router.navigate(['/auth/login'], {});
  }

  // Private Methods
  private setToken(token: string) {
    let auth = new AuthModel();
    auth.authToken = token;
    this.tokenService.setAuthFromLocalStorage(auth);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
