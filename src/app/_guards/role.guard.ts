import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MarketerUser } from '../_services/marketer-user.service';
import { AuthService, RoleType } from '../modules/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    marketerUser?: MarketerUser,
  ): Observable<boolean>
}

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    marketerUser?: MarketerUser,
  ): Observable<boolean> {
    return new Observable<boolean>(observer => {
      // Check Data Roles
      if (
        !marketerUser && 
        !route.data.allowedRoles?.length &&
        !route.data.notAllowedRoles?.length
      ) throw 'Use RoleGuard but dont send any roles from data route';

      // Variables
      let checkInAllowedRoles: boolean = false;
      let checkInNotAllowedRoles: boolean = false;
      let userRole: RoleType =
        marketerUser?.marketer.role ||
        this.authService.currentUserValue!.role;

      // Check Role Inside Allowed Roles
      if (!route.data.allowedRoles?.length) {
        checkInAllowedRoles = true;
      }
      else {
        checkInAllowedRoles =
          route.data.allowedRoles.findIndex(
            (role: RoleType) => role === userRole
          ) !== -1;
      }

      // Check Role Inside Not Allowed Roles
      if (!route.data.notAllowedRoles?.length) {
        checkInNotAllowedRoles = true;
      }
      else {
        checkInNotAllowedRoles =
          route.data.notAllowedRoles.findIndex(
            (role: RoleType) => role === userRole
          ) === -1;
      }

      // Check Access User
      if (checkInAllowedRoles && checkInNotAllowedRoles) {
        observer.next(true);
      }
      else {
        this.router.navigate(
          (marketerUser ?
            (marketerUser?.routeId ?
              [route.data.redirect?.marketer?.[userRole]?.commands || '/'] :
              [route.data.redirect?.user?.[userRole]?.commands || '/']) :
            ([route.data.redirect?.[userRole]?.commands || '/'])),
          (marketerUser ?
            (marketerUser?.routeId ?
              route.data.redirect?.marketer?.[userRole]?.extras || {} :
              route.data.redirect?.user?.[userRole]?.extras || {}) :
            (route.data.redirect?.[userRole]?.extras || {})),
        );
        observer.next(false);
      }
    });
  }
}
