import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Vault } from '../vault-list/vault-list.component';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.scss']
})
export class VaultComponent implements OnInit {

  public vault: Vault;
  public chartCollapsed: boolean = true;

  public wbtc: number = 0;
  public usdt: number = 0;

  constructor() {
    this.vault = new Vault("WBTC", "USDT", "Optimism", "13.38%", "75", "213,341 USD", "wbtc");
    this.vault.img2 = "usdt";
  }


  ngOnInit(): void {

  }

  tokenUpdated($event: any) {
    console.log($event);
    console.log($event.target.value);
    this.usdt = $event.target.value * 16213;
  }

  expandChart() {
    this.chartCollapsed = false;
    this.initChart();
  }

  collapseChart() {
    this.chartCollapsed = true;
    this.removeChart();
  }

  public chart: any;

  initChart() {
    const options: any = ({
      chart: {
        zoomType: 'x'
      },
      title: {
          text: 'WBTC-USDT Yield'
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
        name: 'Vault APY',
        color: 'red',
        data: [
            [
                1651536000000,
                12.1
            ],
            [
                1651622400000,
                13.2
            ],
            [
                1651708800000,
                13.1
            ],
            [
                1651795200000,
                12.2
            ],
            [
                1651881600000,
                12.3
            ],
            [
                1651968000000,
                12.9
            ],
            [
                1652054400000,
                15.4
            ],
            [
                1652140800000,
                15.0
            ],
            [
                1652227200000,
                15.8
            ],
        ],
        dataGrouping: {
          enabled: false,
          forced: false,
          units: [
            ["day", [1]]
          ]
        }
      },
      {
        type: 'line',
        name: 'Uniswap V3 APY',
        color: 'black',
        data: [
          [
              1651536000000,
              9.8
          ],
          [
              1651622400000,
              10.2
          ],
          [
              1651708800000,
              13.1
          ],
          [
              1651795200000,
              12.0
          ],
          [
              1651881600000,
              12.0
          ],
          [
              1651968000000,
              12.9
          ],
          [
              1652054400000,
              15.4
          ],
          [
              1652140800000,
              11.2
          ],
          [
              1652227200000,
              12.1
          ],
      ],
        dataGrouping: {
            enabled: false,
            forced: false,
            units: [
              ["day", [1]]
            ]
        },
      }]
    });
  
    this.chart = Highcharts.chart('chart', options);
  }

  removeChart() {
    this.chart.destroy();
  }

}
