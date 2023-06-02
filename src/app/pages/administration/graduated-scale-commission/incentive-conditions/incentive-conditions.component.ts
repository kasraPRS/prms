import { Component, OnInit } from '@angular/core';
import { AdministrationTooltips } from 'src/app/_tooltip/tooltips';

@Component({
  selector: 'prms-incentive-conditions',
  templateUrl: './incentive-conditions.component.html',
})
export class IncentiveConditionsComponent implements OnInit {

  tooltips = AdministrationTooltips.graduatedScaleCommission;

  part1_checkStatus:boolean;
  part2_checkStatus:boolean;
  part3_checkStatus:boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
