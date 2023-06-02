import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prms-commission-persentage',
  templateUrl: './commission-persentage.component.html',
  styleUrls: ['./commission-persentage.component.scss'],
})
export class CommissionPersentageComponent implements OnInit {
  percentage: any[] = ['2%', '5%', '3%', '1%', '6%'];
  constructor() {}

  ngOnInit(): void {}
}
