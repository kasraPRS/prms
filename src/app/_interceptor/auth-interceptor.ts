import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { TokenService } from '../modules/auth/services/token.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}
  // add auth to req
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.tokenService.authModel?.authToken;

    // add accessToken to request
    if (authToken)
      // req = req.clone({ headers: req.headers.append('Authorization', 'Bearer ' + authToken) });
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + `${authToken}`,
        },
      });
    // send new req
    return next.handle(req);
  }
}
