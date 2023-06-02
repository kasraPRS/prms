import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Resolve,
} from '@angular/router';
import { AuthService } from '../modules/auth';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { MarketerUser } from '../_services/marketer-user.service';
import { User_isUserParentOrChild } from '../_requests/user/userModel';
import { UserRelationshipsMarketer } from '../modules/auth/models/user-access.model';

interface HierarchyResolverDTO {
  userRelationshipsMarketer: UserRelationshipsMarketer;
  haveAccess: boolean;
}

// Check Hierarchy & Send RelationShip and Access & Update User Access
@Injectable({ providedIn: 'root' })
export class HierarchyResolver implements Resolve<HierarchyResolverDTO> {
  constructor(
    private router: Router,
    private marketerUser: MarketerUser,
    private authService: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<HierarchyResolverDTO> {
    return new Observable<HierarchyResolverDTO>((observer) => {
      let routeId = route.queryParams[this.marketerUser.param];
      // User Page
      if (!routeId) {
        this.authService.currentUserValue!.relationship =
          UserRelationshipsMarketer.Marketer;
        observer.next({
          haveAccess: true,
          userRelationshipsMarketer: UserRelationshipsMarketer.Marketer,
        });
      }
      // Admin Access to any Page & Admin is Parent
      else if (this.authService.currentUserValue?.role === 'admin') {
        this.authService.currentUserValue!.relationship =
          UserRelationshipsMarketer.Marketer;
        observer.next({
          userRelationshipsMarketer: UserRelationshipsMarketer.Parent,
          haveAccess: true,
        });
      }
      // Check User Relative with Marketer
      else {
        this.authService
          .isUserParentOrChild(routeId, this.authService.currentUserValue!.id)
          .subscribe({
            next: (response: User_isUserParentOrChild) => {
              if (response.type === 'None') {
                this.router.navigate(['/error/403']);
                observer.next({
                  haveAccess: false,
                  userRelationshipsMarketer: UserRelationshipsMarketer.None,
                });
              } else {
                let result = {
                  haveAccess: false,
                  userRelationshipsMarketer:
                    response.type === 'Parent'
                      ? UserRelationshipsMarketer.Child
                      : UserRelationshipsMarketer.Parent,
                };
                this.authService.currentUserValue!.relationship =
                  result.userRelationshipsMarketer;
                observer.next(result);
              }
            },
            error: () => {
              this.router.navigate(['/error/500']);
              observer.next({
                haveAccess: false,
                userRelationshipsMarketer: UserRelationshipsMarketer.None,
              });
            },
          });
      }
    }).pipe(take(1));
  }
}
