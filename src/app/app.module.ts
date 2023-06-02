import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './modules/auth/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ClipboardModule } from 'ngx-clipboard';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { backDomain, environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';

// #import jquery - start
import * as $ from 'jquery';
// #import jquery - end

// #import Full Calendar - start
import { FullCalendarModule } from '@fullcalendar/angular';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
// import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin,
//   interactionPlugin
// ]);
// #import Full Calendar - end

// #import Token Getter - start
export const TokenGeter = () => {
  let authResult = localStorage.getItem(
    `${environment.appVersion}-${environment.USERDATA_KEY}`
  );
  return JSON.parse(authResult || '{}')?.authToken;
};
// #import Token Getter - end

// #Initialize Functions#
const appInitializer = (authService: AuthService) => {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserById().subscribe(() => resolve(true));
    });
  };
};
// #Initialize Functions#

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    OverlayModule,
    FullCalendarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: TokenGeter,
        allowedDomains: [backDomain],
        disallowedRoutes: [`${backDomain}/api/User/login`]
      }
    }),
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
