import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApexOptions } from 'ng-apexcharts';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { SplitNumberPipe } from 'src/app/_pipes/_split-number.pipe';
import { RewardDetailsComponent } from '../../_dialogs/reward-details/reward-details.component';
import { RewardInfoComponent } from '../../_dialogs/reward-info/reward-info.component';

@Component({
  selector: 'prms-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent {
  chartOptions: any = {};

  constructor(
    private dialog: MatDialog,
    private split: SplitNumberPipe,
  ) { }
  ngOnInit(): void {
    this.chartOptions = this.getChartOptions(320);
  }
  getChartOptions(width: number): ApexOptions {
    const valueColor = getCSSVariableValue('--bs-primary');
    const toAchiveColor = getCSSVariableValue('--bs-primary');
    const achiveColor = getCSSVariableValue('--bs-success');
    const labelColor = getCSSVariableValue('--bs-gray-400');
    const lostColor = getCSSVariableValue('--bs-gray-400');

    let chartOptions: ApexOptions = {
      series: [6000, 3000, 3000],
      labels: ['To Achive', 'Achived', 'Lost'],
      colors: [toAchiveColor, achiveColor, lostColor],
      chart: {
        width: width,
        type: "donut",
      },
      tooltip: {
        enabled: false,
      },
      dataLabels: {
        enabled: false,
      },
      states: {
        hover: {
          filter: {
            type: 'none',
          }
        },
      },
      stroke: {
        width: 3,
      },
      legend: {
        offsetY: 15,
        fontSize: '16px',
        position: 'right',
        horizontalAlign: 'center',
        itemMargin: {
          vertical: 5
        },
      },
      plotOptions: {
        pie: {
          // expandOnClick: false,
          donut: {
            labels: {
              show: true,
              value: {
                show: true,
                offsetY: -20,
                fontSize: '18px',
                color: valueColor,
                formatter: value => `${this.split.transform(value)}$`,
              },
              name: {
                offsetY: 20,
                show: true,
                color: labelColor,
                fontSize: '10px',
              }
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    return chartOptions;
  }
  onRewardClick(reward: any) {
    this.dialog.open(RewardDetailsComponent, {}).afterClosed().subscribe(result => {
    });
  }
  showRewardInfo() {
    this.dialog.open(RewardInfoComponent, {}).afterClosed().subscribe(result => {
    });
  }
}