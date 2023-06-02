import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'prms-commissions',
  templateUrl: './commissions.component.html',
})
export class CommissionsComponent implements OnInit {

  hasCustomCommissions$: BehaviorSubject<boolean| null> = new BehaviorSubject<boolean | null>(null);

  constructor() { }

  ngOnInit(): void {
  }

}
