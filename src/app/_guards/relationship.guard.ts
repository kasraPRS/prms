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
import { UserRelationshipsMarketer } from '../modules/auth/models/user-access.model';

// Check User Relationship with Marketer
// Remember Run Guard after User Resolver Child Routes
// Get NotAllowedRelationships & AllowedRelationships
@Injectable({ providedIn: 'root' })
export class RelationshipGuard implements CanActivate {
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
      } else if (this.authService.currentUserValue?.role === 'admin') {
        observer.next(true);
      } else if (routeId) {
        let user = this.authService.currentUserValue;
        if (
          route.data.AllowedRelationships?.findIndex(
            (i: UserRelationshipsMarketer) => i === user?.relationship
          ) !== -1 &&
          (route.data.NotAllowedRelationships || [])?.findIndex(
            (i: UserRelationshipsMarketer) => i === user?.relationship
          ) === -1
        ) {
          observer.next(true);
        } else {
          this.router.navigate(['/error/403']);
          observer.next(false);
        }
      }
    }).pipe(take(1));
  }
}
