import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ApexStroke
} from "ng-apexcharts";
import { ReportsTooltips } from 'src/app/_tooltip/reports/reports.tooltip';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};
@Component({
  selector: 'prms-reports-inactive-marketers-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {

  tooltips = ReportsTooltips.inactiveMarketers.chart;
  public chartOptions: Partial<ChartOptions>;
  @Input() notWithDetails: boolean;

  private root: am5.Root;
  id: number = Math.random();

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.configChart1();
    this.configChart2();
  }
  ngOnDestroy() {
    // Clean up chart when the component is removed
    if (this.root) {
      this.root.dispose();
    }
  }

  configChart1() {

    // Chart code goes in here
    let root = am5.Root.new("chart" + this.id);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        // panY: false,
        // layout: root.verticalLayout,
      })
    );

    // Define data
    let data = [
      {
        month: "Sep",
        value: 400,
      },
      {
        month: "Oct",
        value: 1300,
      },
      {
        month: "Nov",
        value: 2900,
      },
      {
        month: "Dec",
        value: 2700,
      },
      {
        month: "Jan",
        value: 2800,
      },
      {
        month: "Feb",
        value: 500,
      },
      {
        month: "Mar",
        value: 2000,
      },
      {
        month: "Apr",
        value: 2800,
      },
      {
        month: "May",
        value: 2700,
      },
      {
        month: "Jun",
        value: 1300,
      },
      {
        month: "Jul",
        value: 2000,
      },
      {
        month: "Aug",
        value: 2700,
      },
    ];

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "month",
      })
    );
    xAxis.data.setAll(data);

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "month",
        fill: am5.color('#0095E8'),
      })
    );

    series1.columns.template.setAll({
      cornerRadiusTL: 3,
      cornerRadiusTR: 3,
      width: 20,
    });
    series1.data.setAll(data);

    // Add cursor
    // chart.set("cursor", am5xy.XYCursor.new(root, {}));

    this.root = root;

    this.cdr.detectChanges();
  }
  configChart2() {
    this.chartOptions = {
      series: [53],
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "65%",
            background: "#fff",
            image: undefined,
            position: "front",
          },
          track: {
            background: "#E6F4FF",
            strokeWidth: "100%",
            margin: 0, // margin is in pixels

          },

          dataLabels: {
            show: true,
            name: {
              // offsetY: -10,
              show: true,
              color: "#000",
              fontSize: "17px",
              fontWeight: '500'
            },
            value: {
              formatter: function (val) {
                return parseInt(val.toString(), 10).toString() + '/ 94 (57%)';
              },
              color: "#888",
              fontSize: "12px",
              show: true
            }
          }
        }
      },
      fill: {
        colors: ['#E25454'],
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Inactive Users"],
    };
  }

}
