import { ChangeDetectorRef, Injectable, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, Subscription, switchMap, tap } from "rxjs";
import { AuthService, UserModel, UserType } from "../modules/auth";
import { UserHttpService } from "../_requests/user/user.service";

@Injectable({ providedIn: "root" })
export class CurrentUser implements OnDestroy {
  // Access Without Create Object any Where 
  private _us: Subscription[] = [];
  private static _param: string;
  private static _routeId: number | undefined;
  private static _isReady: boolean = false;
  private static _ready: Subject<boolean> = new Subject<boolean>();
  private static _userId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private static _user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel());
  private static _base_user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel());
  private static _isMine: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  static get param(): string { return CurrentUser._param; }
  static get user(): UserModel { return CurrentUser._user.value; }
  static get userId(): number { return CurrentUser._userId.value; }
  static get isMine(): boolean { return CurrentUser._isMine.value; }
  static get baseUser(): UserModel { return CurrentUser._base_user.value; }
  static get routeId(): number { return CurrentUser._routeId || 0; }
  static set routeId(id: number) {
    this._routeId = id;
  }


  // Events
  public static change$ = new Subject<UserType>();

  constructor(
    private userHttpService: UserHttpService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  // #region Init Check User
  init() {
    this.setParams();
    // this.subscribeRoute();
    this.subscribeBaseUser();
  }
  // #endregion Init Check User

  // #region Subscribe User
  // Subscribe Route For Change User Id
  private subscribeRoute() {
    let us = this.route.queryParams.subscribe(params => {
      // Check Same Id
      let id = params[CurrentUser._param];
      if (id == CurrentUser._routeId) return;
      // Change Id & Get New User
      CurrentUser._routeId = params[CurrentUser._param];
      this.getCurrentUser();
    });
    this._us.push(us);
  }
  // Subscribe Base Logined User
  private subscribeBaseUser() {
    let us = this.authService.currentUser$.subscribe((user: UserType) => {
      if (!user) { this.reset(); return; }
      CurrentUser._base_user.next(user!);
      this.getCurrentUser();
    });
    this._us.push(us);
  }
  // #endregion Subscribe User

  // #region Get User Methods 
  public getUserById(): Observable<boolean> {
    if (CurrentUser._routeId === CurrentUser._userId.value)
      return new Observable<boolean>(o => o.next(true));

    return this.userHttpService.getUserById(CurrentUser._routeId!.toString()).pipe(
      tap((user: UserType) => {
        let userModel = new UserModel();
        userModel.setUser(user);
        this.setUser(userModel, false);
      }),
      switchMap(() => new Observable<boolean>(o => o.next(true)))
    );
  }
  private getBaseUser() {
    let user = this.authService.currentUserValue!;
    this.setUser(user, true);
  }
  public getCurrentUser(): Subject<boolean> {
    let readyUser = new Subject<boolean>();
    this.unsetReady();
    if (CurrentUser._routeId) this.getUserById().subscribe(() => readyUser.next(true));
    else { this.getBaseUser(); setTimeout(() => { readyUser.next(true) }, 100); }
    return readyUser;
  }
  private setUser(user: UserModel, isMine: boolean) {
    CurrentUser._userId.next(user.id);
    CurrentUser._user.next(user);
    CurrentUser._isMine.next(isMine);
    CurrentUser.change$.next(user);
    this.setReady();
  }
  // #endregion Get User Methods 

  // #region Current User Methods 
  private unsetReady() {
    CurrentUser._isReady = false;
  }
  private setReady() {
    CurrentUser._isReady = true;
    CurrentUser._ready.next(true);
  }
  public static ready(): Subject<boolean> | Observable<boolean> {
    if (CurrentUser._isReady) return new Observable<boolean>(o => {
      setTimeout(() => o.next(true), 200)
    });
    return CurrentUser._ready;
  }
  public update() {
    if (CurrentUser._routeId) this.getUserById();
    else this.authService.getUserById().subscribe();
  }
  // #endregion Current User Methods 

  // #region Navigate 
  // private navigate(commands: any[], extras?: NavigationExtras | undefined) {
  //   this.router.navigate(commands, extras);
  // }
  // #endregion Navigate

  // #region Reset Variables When User Logout
  reset() {
    CurrentUser._routeId = undefined;
    CurrentUser._isReady = false;
    CurrentUser._userId.next(0);
    CurrentUser._user.next(new UserModel());
    CurrentUser._base_user.next(new UserModel());
    CurrentUser._isMine.next(false);
  }
  // #endregion Reset Variables When User Logout

  // #region Code 
  private static getParamCode() {
    return 'i'//crc.crc32('userId').toString(16);
  }
  private setParams() {
    CurrentUser._param = CurrentUser.getParamCode();
  }
  // #endregion Code

  ngOnDestroy(): void { this._us.forEach((u: Subscription) => u.unsubscribe()); }
}