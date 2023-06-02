import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthInformation } from '../models/auth-information';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthModel, AuthModelType } from '../models/auth.model';
import { RoleType, UserModel } from '../models/user.model';

export type RoleDTO = { title: string; value: RoleType };
export type UserType = UserModel | undefined;
export type UserModelType = UserModel | undefined;
export type AuthInformationType = AuthInformation | undefined;

@Injectable({ providedIn: 'root' })
export class TokenService {
  // private fields
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  private decodedToken$: BehaviorSubject<AuthInformationType>;
  private authModel$: BehaviorSubject<AuthModel | undefined>; // Just Save Token
  private helper = new JwtHelperService(); // For decode Token

  // public fields
  get authModel(): AuthModel | undefined {
    return this.authModel$.value;
  }
  get decodedToken(): AuthInformationType {
    return this.decodedToken$.value;
  }

  constructor(private router: Router) {
    this.decodedToken$ = new BehaviorSubject<AuthInformationType>(undefined);
    this.authModel$ = new BehaviorSubject<AuthModel | undefined>(undefined);
  }

  // Private Methods
  private setAuthInformation(auth: AuthModel) {
    const decodedToken: AuthInformation = this.helper.decodeToken(
      auth.authToken
    );
    this.decodedToken$.next(decodedToken);
  }
  private setAuthModel(auth: AuthModel) {
    this.setAuthInformation(auth);
    this.authModel$.next(auth);
  }

  // Public Methods
  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.authModel$.getValue()?.authToken);
  }
  isReadyToken(): Observable<boolean> {
    return new Observable<boolean>((o) => {
      this.getAuthFromLocalStorage();
      o.next(true);
    });
  }

  setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      this.setAuthModel(auth);
      return true;
    }
    return false;
  }
  getAuthFromLocalStorage(): AuthModelType {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      this.setAuthModel(authData);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  removeAuthFromLocalStorage() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.decodedToken$.next(undefined);
    this.authModel$.next(undefined);
  }
}
