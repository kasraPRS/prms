import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
} from '@angular/router';
import { AuthService } from '../modules/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarketerUser } from '../_services/marketer-user.service';
import { User_isUserParentOrChild } from '../_requests/user/userModel';

@Injectable({ providedIn: 'root' })
export class HierarchyGuard implements CanActivate {
  constructor(
    private router: Router,
    private marketerUser: MarketerUser,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      let routeId = route.queryParams[this.marketerUser.param];
      // User Page
      if (!routeId) {
        observer.next(true);
      }
      // Admin Access to any Page & Admin is Parent
      else if (this.authService.currentUserValue?.role === 'admin') {
        observer.next(true);
      }
      // Check User Relative with Marketer
      else {
        this.authService
          .isUserParentOrChild(routeId, this.authService.currentUserValue!.id)
          .subscribe({
            next: (response: User_isUserParentOrChild) => {
              if (response.type !== 'None') {
                this.router.navigate(['/error/403']);
                observer.next(false);
              } else observer.next(true);
            },
            error: () => {
              this.router.navigate(['/error/500']);
              observer.next(false);
            },
          });
      }
    });
  }
}
