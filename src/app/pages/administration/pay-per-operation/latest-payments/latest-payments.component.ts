import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prms-latest-payments',
  templateUrl: './latest-payments.component.html',
})
export class LatestPaymentsComponent implements OnInit {
  payments:number[]=[
    1,
    1,
    1,
    1,
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
