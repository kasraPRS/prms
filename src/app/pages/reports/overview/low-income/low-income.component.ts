import { Component, OnInit } from '@angular/core';
import { ReportsTooltips } from 'src/app/_tooltip/reports/reports.tooltip';

@Component({
  selector: 'prms-low-income',
  templateUrl: './low-income.component.html',
})
export class LowIncomeComponent implements OnInit {

  tooltips = ReportsTooltips.overview.lowIncome;
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
