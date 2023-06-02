import { Component, OnInit } from '@angular/core';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';

@Component({
  selector: 'prms-monthly-net-earnings',
  templateUrl: './monthly-net-earnings.component.html',
})
export class MonthlyNetEarningsComponent implements OnInit {

  chartOptions: any = {};

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = getChartOptions(350);
  }

}

function getChartOptions(height: number) {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const baseColor = getCSSVariableValue('--bs-primary');
  const lightColor = getCSSVariableValue('--bs-light-primary');

  return {
    series: [
      {
        name: 'Net Profit',
        data: [7000, 7000, 9000, 9000, 4000, 4000, 3000],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: 300,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: number) {
          return '$' + val + ' thousands';
        },
      },
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  };
}
