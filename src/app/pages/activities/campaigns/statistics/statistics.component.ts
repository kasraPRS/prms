import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { ApexOptions } from 'ng-apexcharts';
import { SplitNumberPipe } from 'src/app/_pipes/_split-number.pipe';
import { ActivitiesTooltips } from 'src/app/_tooltip/tooltips';

/* Chart */
// import * as am5 from "@amcharts/amcharts5";
// import * as am5percent from "@amcharts/amcharts5/percent";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: 'prms-statistics',
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit {

  chartOptions: any = {};
  tooltips = ActivitiesTooltips;

  constructor(
    private split: SplitNumberPipe,
  ) { }

  ngOnInit(): void {
    this.chartOptions = this.getChartOptions(400);
  }
  getChartOptions(width: number): ApexOptions {
    const valueColor = getCSSVariableValue('--bs-primary');
    const labelColor = getCSSVariableValue('--bs-gray-400');
    const successfulColor = getCSSVariableValue('--bs-primary');
    const unsuccessfulColor = '#FFDCDC';

    let chartOptions: ApexOptions = {
      series: [9000, 3000],
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
                formatter: value => `${this.split.transform(value)}$`,
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
                  return `${this.split.transform(total)}$`
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

// #region am5chart
// export class StatisticsComponent implements OnInit {
//   @ViewChild('chartRef', { static: true }) chartRef: ElementRef;

//   constructor() { }
//   ngOnInit(): void { this.createChart(); }

//   createChart() {
//     const valueColor = getCSSVariableValue('--bs-primary');
//     const labelColor = getCSSVariableValue('--bs-gray-400');
//     const successfulColor = getCSSVariableValue('--bs-primary');
//     const unsuccessfulColor = '#FFDCDC';

//     // Create Root Element
//     let root = am5.Root.new(this.chartRef.nativeElement);

//     // Set Themes
//     root.setThemes([am5themes_Animated.new(root)]);

//     // Create Chart
//     let chart = root.container.children.push(am5percent.PieChart.new(root, {
//       radius: am5.percent(90),
//       layout: root.horizontalLayout,
//       centerX: 0,
//       innerRadius: am5.percent(70),
//     }));

//     // Create Series
//     let series = chart.series.push(am5percent.PieSeries.new(root, {
//       valueField: "value",
//       categoryField: "type",
//       legendLabelText: "{category}",
//       legendValueText: undefined,
//     }));

//     // Space Between Slices
//     series.slices.template.setAll({
//       strokeWidth: 3,
//       disabled: true,
//       stroke: am5.color(0xffffff),
//     });

//     // Hide Ticks & Labels
//     series.labels.template.set("visible", false);
//     series.ticks.template.set("visible", false);

//     // Set Colors
//     series.get('colors')?.set('colors', [
//       am5.color(successfulColor),
//       am5.color(unsuccessfulColor),
//     ])

//     // Set Labels
//     let label = chart.seriesContainer.children.push(
//       am5.Label.new(root, {
//         textAlign: "center",
//         centerY: am5.p50,
//         centerX: am5.p50,
//         text: '[bold]{category}'
//       })
//     );

//     // Set Data
//     series.data.setAll([
//       { value: 3, type: "Successful" },
//       { value: 1, type: "Unsuccessful" },
//     ]);

//     // Create Legend
//     let legend = chart.children.push(am5.Legend.new(root, {
//       centerY: am5.percent(50),
//       y: am5.percent(50),
//       marginTop: 15,
//       marginBottom: 15,
//       layout: root.verticalLayout,
//     }));
//     // Change Legend Markers Sizes
//     legend.markers.template.setAll({
//       width: 14,
//       height: 14,
//     });
//     // Change Legend Markers Radius
//     legend.markerRectangles.template.setAll({
//       cornerRadiusTL: 10,
//       cornerRadiusTR: 10,
//       cornerRadiusBL: 10,
//       cornerRadiusBR: 10
//     });
//     legend.data.setAll(series.dataItems);

//     // Tooltip
//     console.log(chart, series, legend)
//     // Play Initial Series Animation
//     series.appear(1000, 100);
//   }
// }
// #endregion am5chart