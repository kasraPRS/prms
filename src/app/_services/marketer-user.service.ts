import { BehaviorSubject, Observable, Subscription, switchMap, tap } from "rxjs";
import { AuthService, UserModel, UserType } from "../modules/auth";
import { NavigationExtras, Router } from "@angular/router";
import { Injectable, OnDestroy } from "@angular/core";
import { NgmCode } from "./ngm-code.service";
import { UserHttpService } from "../_requests/user/user.service";

@Injectable({ providedIn: "root" })
export class MarketerUser implements OnDestroy {
  // Access Without Create Object any Where 
  private _us: Subscription[] = [];
  private _param: string = 'i'; //NgmCode.getCode('marketerId');
  private _routeId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _marketerId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _marketerCode: BehaviorSubject<string> = new BehaviorSubject<string>(''); // Not Complete
  private _marketer: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel());

  get param(): string { return this._param; }
  get routeId(): number { return this._routeId.value; }
  get marketer(): UserModel { return this._marketer.value; }
  get marketerId(): number { return this._marketerId.value; }
  get marketerCode(): string { return this._marketerCode.value; }

  constructor(
    private marketerHttpService: UserHttpService,
    private authService: AuthService,
    private router: Router,
  ) { }

  // #region User Methods 
  private getMarketerById(id: number): Observable<boolean> {
    this._routeId.next(id);
    this.setMarketerId(id);
    return this.marketerHttpService.getUserById(id).pipe(
      tap((marketer: UserType) => {
        let marketerModel = new UserModel();
        marketerModel.setUser(marketer);
        this.setMarketer(marketerModel);
      }),
      switchMap(() => new Observable<boolean>(o => o.next(true)))
    );
  }
  private getUserAsMarketer(): Observable<boolean> {
    let marketer = this.authService.currentUserValue!;
    this.setMarketerId(marketer.id);
    this.setMarketer(marketer);
    this._routeId.next(0);
    return new Observable<boolean>(o => o.next(true));
  }
  private setMarketer(marketer: UserModel) {
    this._marketer.next(marketer);
  }
  private setMarketerId(id: number) {
    this._marketerCode.next(NgmCode.getCode(id));
    this._marketerId.next(id);
  }
  public getMarketer(id?: number): Observable<boolean> {
    if (id) {
      if (this._routeId.value === id) {
        return new Observable<boolean>(o => o.next(true));
      }
      else return this.getMarketerById(id);
    }
    else return this.getUserAsMarketer();
  }
  public updateMarketer(): Observable<boolean> {
    if (this.routeId) return this.getMarketerById(this.routeId);
    else return this.authService.getUserById().pipe(
      switchMap(() => this.getUserAsMarketer())
    )
  }
  // #endregion User Methods 

  // #region Navigate 
  public navigate(commands: any[], extras?: NavigationExtras | undefined) {
    if (!this._routeId.value) {
      this.router.navigate(commands, extras);
    }
    else {
      extras = extras || {};
      extras.queryParams = extras.queryParams || {};
      extras.queryParams[this._param] = this._routeId.value;
      this.router.navigate(commands, extras);
    }
  }
  // #endregion Navigate

  // #region Reset
  public reset() {
    this._routeId.next(0);
    this._marketerId.next(0);
    this._marketerCode.next('');
    this._marketer.next(new UserModel());
  }
  // #endregion Reset

  ngOnDestroy(): void { this._us.forEach((u: Subscription) => u.unsubscribe()); }
}