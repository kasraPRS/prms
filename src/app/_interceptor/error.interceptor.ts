import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) { }
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // Handle Errors
      catchError((err: any) => {
        if (err) {
          switch (err.status) {

            // Bad Request
            case 400:
              if (err.error?.errors) {
                let modalState = '';
                const errors = err.error.errors;
                for (const key in errors)
                  for (const error of errors[key])
                    modalState += error + '\n';

                this.toastr.error(modalState, err.status);
              }
              else {
                this.toastr.error(err.error, err.status);
              }
              break;

            // Network Error
            case 0:
              this.toastr.error('Check your Internet Connection...');
              break;

            // UnAuthorized
            case 401:
              this.toastr.error('You are not Allowed!. Please Login.', err.status);
              break;

            // Access Denied
            // case 403:
            //   this.toastr.error('دسترسی برای شما وجود ندارد', err.status);
            //   break;

            // Api Not Found
            case 404:
              this.toastr.error('Not Found', err.status);
              break;

            // Error in Backend
            case 500:
              this.toastr.error('Server Side Error', err.status);
              break;

            // Has a Problem
            default:
              this.toastr.error('There is a Problem !!!');
              break;

          }
        }
        return throwError(() => err);
      })
    );
  }
}
