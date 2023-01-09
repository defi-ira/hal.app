import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vault-list',
  templateUrl: './vault-list.component.html',
  styleUrls: ['./vault-list.component.scss']
})
export class VaultListComponent implements OnInit {

  public vaults: Vault[];

  constructor() {
    this.vaults = [];
  }

  ngOnInit(): void {
    const vault1: Vault = new Vault("USDC", "", "Arbitrum", "4.56%", "35", "1,608,221 USD", "usdc");
    const vault2: Vault = new Vault("USDT", "", "Arbitrum", "5.21%", "45", "1,231,092 USD", "usdt");
    const vault3: Vault = new Vault("DAI", "", "Arbitrum", "2.97%", "45", "428,378 USD", "dai");
    const vault4: Vault = new Vault("WBTC", "USDT", "Optimism", "13.38%", "75", "213,341 USD", "wbtc");
    const vault5: Vault = new Vault("ETH", "USDC", "Ethereum", "9.02%", "75", "105,625 USD", "eth");
    vault4.img2 = "usdt";
    vault4.id = 4;
    vault5.img2 = "usdc";
    vault5.id = 5;
    this.vaults.push(vault1);
    this.vaults.push(vault2);
    this.vaults.push(vault3);
    this.vaults.push(vault4);
    this.vaults.push(vault5);
  }

}

export class Vault {
  public id: number = 2;
  public token1: string;
  public token2: string;
  public network: string;
  public apy: string;
  public fee: string;
  public tvum: string;
  public img: string;
  public img2: string = ""; 

  constructor(_token1: string, _token2: string, _network: string, _apy: string, _fee: string, _tvum: string, _img: string) {
    this.token1 = _token1;
    this.token2 = _token2;
    this.network = _network;
    this.apy = _apy;
    this.fee = _fee;
    this.tvum = _tvum;
    this.img = _img;
  }
}
