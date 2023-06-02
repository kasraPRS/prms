import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
} from '@angular/router';
import { AuthService } from '../modules/auth';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { MarketerUser } from '../_services/marketer-user.service';
import { User_isUserInParents } from '../_requests/user/userModel';

// Check User As Parent Marketer
@Injectable({ providedIn: 'root' })
export class UserAsParentMarketerGuard implements CanActivate {
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
      if (!routeId) {
        observer.next(true);
      }
      else if (this.authService.currentUserValue?.role === 'admin') {
        observer.next(true);
      } 
      else if (routeId) {
        this.authService
          .isUserInParents(this.authService.currentUserValue!.id, routeId)
          .subscribe({
            next: (response: User_isUserInParents) => {
              if (!response.haveAccess) this.router.navigate(['/error/403']);
              observer.next(response.haveAccess);
            },
            error: () => {
              this.router.navigate(['/error/403']);
              observer.next(false);
            },
          });
      }
    }).pipe(take(1));
  }
}
