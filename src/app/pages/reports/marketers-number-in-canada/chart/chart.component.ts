import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/canadaLow";
import { ReportsTooltips } from 'src/app/_tooltip/reports/reports.tooltip';

@Component({
  selector: 'prms-reports-marketers-number-in-canada-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {

  tooltips = ReportsTooltips.marketerNumberInCanada.chart;
  private root: am5.Root;
  id: number = Math.random();

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {

    let root = am5.Root.new("map" + this.id);
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {})
    );
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        fill: am5.color('#ffffff'),
        stroke: am5.color('#5E6278 ')
      })
    );

    this.root = root;

  }
  ngOnDestroy() {
    // Clean up chart when the component is removed
    if (this.root) {
      this.root.dispose();
    }
  }

}
