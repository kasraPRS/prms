import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'prms-active-marketers',
  templateUrl: './active-marketers.component.html',
})
export class ActiveMarketersComponent implements OnInit {

  @Input() notWithDetails: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
