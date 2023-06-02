import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'prms-in-active-marketers',
  templateUrl: './in-active-marketers.component.html',
})
export class InActiveMarketersComponent implements OnInit {

  @Input() notWithDetails: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
