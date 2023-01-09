import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs';

import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input("poolId") poolId: string = '';

  public yieldData = [];
  public dates = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.bindPoolChart();
  }

  private bindPoolChart() {
    this.getPoolData().subscribe((response) => {
      let outstring = "";
      this.dates = response.data.map((entry: any) => { 
        outstring += (new Date(entry["timestamp"]).getTime()) + "," + entry["apy"]+ "\n";
        return [new Date(entry["timestamp"]), entry["apy"]]; 
      });
      this.yieldData = response.data.map((entry: any) => { return [new Date(entry["timestamp"]).getTime(), entry["apy"]]; });

      const options: any = ({
        chart: {
          zoomType: 'x'
        },
        title: {
            text: 'Historical APY rate over time'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
    
        yAxis: {
            title: {
                text: 'Annual Percent Yield (APY)'
            }
        },
        legend: {
            enabled: true
        },
    
    
        xAxis: {
          type: 'datetime'
        },
        series: [{
            type: 'line',
            name: 'HistoricalAPY',
            data: response.data.map((entry: any) => { return [new Date(entry["timestamp"]).getTime(), entry["apy"]]; }),
            dataGrouping: {
              enabled: false,
              forced: false,
              units: [
                ["day", [1]]
              ]
            }
        }]
      });
    
      Highcharts.chart('chart', options);
    });
  }

  private getPoolData(): Observable<any> {
    if (this.poolId.length == 0) { return new Observable<any>(); }
    const headers = new HttpHeaders();
    headers.append("accept", "*/*");
    
    
    return this.http.get<any>("https://yields.llama.fi/chart/" + this.poolId, {
      headers: headers
    });
    
    
    // return new Observable<any>();
  }


}
