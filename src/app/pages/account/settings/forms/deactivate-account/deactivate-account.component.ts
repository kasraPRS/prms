import { Component } from '@angular/core';

@Component({
  selector: 'app-deactivate-account',
  templateUrl: './deactivate-account.component.html',
})
export class DeactivateAccountComponent {
  constructor() {}

  deactivateAccount() {
    alert('Account has been successfully deleted!');
  }
}
