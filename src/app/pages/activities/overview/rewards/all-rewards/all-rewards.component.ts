import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'prms-all-rewards',
  templateUrl: './all-rewards.component.html',
})
export class AllRewardsComponent implements AfterViewInit {
  rewards: { title: string, entries: number, rate: number, revenue: number }[] = [
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
    { title: 'Google ads Users', entries: 985, rate: 45, revenue: 895 },
  ]

  constructor() { }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
  }

  // Methods
  createNewLink() {
  }
}