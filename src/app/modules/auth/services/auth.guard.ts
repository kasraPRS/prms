import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private helper = new JwtHelperService(); // For decode Token
  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // not logged in so redirect to login page with the return url
    if (this.tokenService.isTokenExpired()) {
      this.tokenService.removeAuthFromLocalStorage();
      this.router.navigate(['/auth/login'], {});
      return false;
    }
    // logged in so return true
    return true;
  }
}
