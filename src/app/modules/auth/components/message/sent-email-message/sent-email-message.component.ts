import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'prms-sent-email-message',
  templateUrl: './sent-email-message.component.html',
})
export class SentEmailMessageComponent implements OnInit {
  email: string = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'];
  }
}
