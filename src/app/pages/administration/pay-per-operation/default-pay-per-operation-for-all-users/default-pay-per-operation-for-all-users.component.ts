import { Component, OnInit } from '@angular/core';

interface IRow { operation: string, reachNumber: number, payment: number, enable: boolean }
@Component({
  selector: 'prms-default-pay-per-operation-for-all-users',
  templateUrl: './default-pay-per-operation-for-all-users.component.html',
})
export class DefaultPayPerOperationForAllUsersComponent implements OnInit {

  changeOptions: boolean;
  rows: IRow[] = [
    {
      operation: 'Number Of Attracted Visitors',
      reachNumber: 10000,
      payment: 100,
      enable: false
    },
    {
      operation: 'Number of Sign ups',
      reachNumber: 1000,
      payment: 20000,
      enable: true
    },
    {
      operation: 'Page Views by Users',
      reachNumber: 20000,
      payment: 100,
      enable: true
    },
    {
      operation: 'Number of Campaigns',
      reachNumber: 100,
      payment: 200,
      enable: true
    },
    {
      operation: 'Number of Links',
      reachNumber: 500,
      payment: 50,
      enable: true
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onBtnChangeClick() {
    this.changeOptions = true;
  }
  onBtnApplyClick() {
    this.changeOptions = false;
  }
  onBtnChangeEnableClick(row: IRow) {
    row.enable = !row.enable;
  }

}
