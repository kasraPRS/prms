import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserAccess } from './models/user-access.model';

@Component({
  selector: '<auth[root]>',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  today: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    document.querySelector('body')?.classList.add('bg-white');
  }

  ngOnDestroy() {
    document.querySelector('body')?.classList.remove('bg-white');
  }
}
