import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'prms-change-password-message',
  templateUrl: './change-password-message.component.html',
})
export class ChangePasswordMessageComponent implements OnInit {
  email: string = '';
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'];
  }
}
