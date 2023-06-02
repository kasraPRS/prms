import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { ReportsTooltips } from 'src/app/_tooltip/reports/reports.tooltip';
@Component({
  selector: 'prms-medium-income',
  templateUrl: './medium-income.component.html',
})
export class MediumIncomeComponent {

  tooltips = ReportsTooltips.overview.mediumIncome;

  generateRandom(min = 0, max = 100) {

    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;

  } //this method will be removed

}
