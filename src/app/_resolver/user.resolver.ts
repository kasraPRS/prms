import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { MarketerUser } from '../_services/marketer-user.service';
import { HierarchyResolver } from './hierarchy.resolver';
import { Observable, switchMap, take } from 'rxjs';
import { RoleGuard } from '../_guards/role.guard';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MarketerResolver implements Resolve<boolean> {
  constructor(
    private roleGuard: RoleGuard,
    private marketerUser: MarketerUser,
    private hierarchyResolver: HierarchyResolver
  ) {}

  getMarketer(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    // Variables
    let marketerId = route.queryParams[this.marketerUser.param];
    // After Get Marketer User Check Allowed Roles
    return this.marketerUser.getMarketer(marketerId).pipe(
      take(1),
      switchMap(() =>
        this.roleGuard
          .canActivate(route, state, this.marketerUser)
          .pipe(take(1))
      )
    );
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Check Marketer Hierarchy
    return this.hierarchyResolver.resolve(route, state).pipe(
      take(1),
      switchMap(() => this.getMarketer(route, state))
    );
  }
}
