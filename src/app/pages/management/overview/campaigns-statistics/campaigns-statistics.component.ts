import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { ApexOptions } from 'ng-apexcharts';
import { SplitNumberPipe } from 'src/app/_pipes/_split-number.pipe';

@Component({
  selector: 'prms-campaigns-statistics',
  templateUrl: './campaigns-statistics.component.html',
})
export class CampaignsStatisticsComponent implements OnInit {
  chartOptions: any = {};

  constructor(private split: SplitNumberPipe,) { }
  ngOnInit(): void {
    this.chartOptions = this.getChartOptions(400);
  }
  getChartOptions(width: number): ApexOptions {
    const valueColor = getCSSVariableValue('--bs-primary');
    const labelColor = getCSSVariableValue('--bs-gray-400');
    const successfulColor = getCSSVariableValue('--bs-primary');
    const unsuccessfulColor = '#FFDCDC';

    let chartOptions: ApexOptions = {
      series: [75, 25],
      labels: ['Successful', 'Unsuccessful'],
      colors: [successfulColor, unsuccessfulColor],
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
        height: 80,
        offsetY: 50,
        fontSize: '14px',
        position: 'right',
        horizontalAlign: 'center',
        itemMargin: {
          vertical: 5
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            labels: {
              show: true,
              value: {
                show: true,
                offsetY: -25,
                fontSize: '18px',
                color: valueColor,
                formatter: value => `${value}%`,
              },
              name: {
                offsetY: 25,
                show: true,
                color: labelColor,
                fontSize: '10px',
              },
              total: {
                show: true,
                formatter: (w: any) => {
                  let total = w.globals?.series?.reduce((total: number, value: number) => total + value);
                  return `${total}%`
                }
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
}
