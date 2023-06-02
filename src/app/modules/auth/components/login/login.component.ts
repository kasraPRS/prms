import { LoginHandelService } from './login-handel.service';
import { TokenService } from '../../services/token.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    LoginHandelService,
  ]
})
export class LoginComponent implements OnInit {
  constructor(
    private loginHandel: LoginHandelService,
    tokenService: TokenService,
  ) {
    // redirect to home if already logged in
    if (tokenService.authModel?.authToken)
      this.loginHandel.navigate(tokenService.decodedToken?.role!);
  }
  ngOnInit(): void { }
}
