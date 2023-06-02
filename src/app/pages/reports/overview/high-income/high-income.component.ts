import { Component, OnInit } from '@angular/core';
import { ReportsTooltips } from 'src/app/_tooltip/reports/reports.tooltip';

@Component({
  selector: 'prms-high-income',
  templateUrl: './high-income.component.html',
})
export class HighIncomeComponent implements OnInit {

  tooltips = ReportsTooltips.overview.highIncome;

  constructor() { }

  ngOnInit(): void {
  }
  generateRandom(min = 0, max = 100) {

    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;

  } //this method will be removed

}
