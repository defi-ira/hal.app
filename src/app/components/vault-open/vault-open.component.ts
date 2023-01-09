import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import * as Highcharts from 'highcharts';
import { Token } from 'src/app/models/Token';
import { Vault } from 'src/app/models/Vault';
import { YieldPool } from 'src/app/models/YieldPool';
import { ActivatedRoute } from '@angular/router';
import { VaultService } from 'src/app/service/VaultService';

@Component({
  selector: 'app-vault',
  templateUrl: './vault-open.component.html',
  styleUrls: ['./vault-open.component.scss']
})
export class VaultOpenComponent implements OnInit {

  public vault: Vault;
  public chartCollapsed: boolean = true;
  public isFormExpanded: boolean = false;

  public archetype = '1';
  public poolType = '';
  public minTvl: number = 100000;
  public liquidateRewards = 'true';
  public concentration = 'diversified';
  public risk = 0;

  public color: ThemePalette = 'primary';
  public mode: ProgressBarMode = 'determinate';
  public bufferValue = 75;

  configureFormGroup = new FormGroup({
    archetype: new FormControl(this.archetype),
    poolType : new FormControl(this.poolType),
    minTvl: new FormControl(this.minTvl),
    liquidateRewards: new FormControl(this.liquidateRewards),
    concentration: new FormControl(this.concentration)
  });

  public wbtc: number = 0;
  public usdt: number = 0;

  constructor(private route: ActivatedRoute, private vaultService: VaultService) {
    const id: string = this.route.snapshot.paramMap.get("token") as string;
    this.vault = this.vaultService.getVaultData(id);
  }


  ngOnInit(): void {
    this.configureFormGroup.patchValue({
      archetype: '1'
    });
    this.risk = 20;

    this.configureFormGroup.get('archetype')?.valueChanges.subscribe(item => {
      this.vaultConfigureSelect();
    });

    // recalculate risk on form group item change and ensure custom is selected

  }

  private vaultConfigureSelect() {
    const archetype = this.configureFormGroup.get('archetype')?.getRawValue();
    if (archetype == '1') {
      this.configureFormGroup.patchValue({
        poolType: 'lenders',
        minTvl: 200000,
        liquidateRewards: 'true',
        concentration: 'diversified'
      });
      this.risk = 10;
    }
    if (archetype == '2') {
      this.configureFormGroup.patchValue({
        poolType: 'lenders and bridges',
        minTvl: 150000,
        liquidateRewards: 'false',
        concentration: 'single pool'
      });
      this.risk = 60;
    }
    if (archetype == '3') {
      this.isFormExpanded = true;
      this.configureFormGroup.patchValue({
        poolType: 'lenders and bridges',
        minTvl: 200000,
        liquidateRewards: '',
        concentration: ''
      });
      this.risk = 80;
    }
  }

  expandConfigureForm = () => { this.isFormExpanded = true; }
  collapseConfigureForm = () => { this.isFormExpanded = false; }

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
          text: this.vault.token1 + ' Yield'
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
        name: this.vault.token1 + ' - ' + this.vault.network + ' Vault',
        color: 'red',
        data: [
          [
              1651536000000,
              3.4
          ],
          [
              1651622400000,
              3.6
          ],
          [
              1651708800000,
              4.1
          ],
          [
              1651795200000,
              3.6
          ],
          [
              1651881600000,
              3.7
          ],
          [
              1651968000000,
              3.6
          ],
          [
              1652054400000,
              4.2
          ],
          [
              1652140800000,
              4.4
          ],
          [
              1652227200000,
              4.7
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

  initCompareChart() {
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
