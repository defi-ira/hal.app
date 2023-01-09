import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Alchemy, Network, OwnedNft, OwnedNftsResponse, TokenBalance, TokenBalancesResponse, TokenBalanceSuccess } from "alchemy-sdk";
import { OpenSeaSDK, Network as OpenSeaNetwork } from 'opensea-js';
import Web3 from 'web3';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.scss']
})
export class UserWalletComponent implements OnInit {

  private config = {
    apiKey: "PJkOEl4iMuFWVpY3QMr4hq8a2qfIS5Ht",
    network: Network.ETH_MAINNET,
  };
  private alchemy = new Alchemy(this.config);

  /*
  Commented out until an OpenSea API can be obtained

  private provider = new Web3.providers.HttpProvider('https://mainnet.infura.io');
  private openseaSDK = new OpenSeaSDK(this.provider, {
    networkName: OpenSeaNetwork.Main,
    apiKey: YOUR_API_KEY
  })
  */

  public address = 'sigman.eth';
  private satsMod = 1000000;
  public marketData = [];
  public nfts: OwnedNft[] = [];
  public tokens: TokenBalance[] = [];
  public userTokenBalance: UserTokenBalance[] = [];
  private usdcContract = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    /*
    this.loadNFTs().then((response) => {
      this.nfts = response.ownedNfts;
    });

    this.getMarketData().subscribe((response) => {
      console.log(response);
      this.marketData = response;
    });
    */

    this.loadTokenBalances().then((response) => {
      response.tokenBalances.forEach(balance => {
        if (balance.tokenBalance) { 
          balance.tokenBalance = (this.parseFloat(balance.tokenBalance, 16)/this.satsMod)
            .toLocaleString("en-us", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 8}); 
          
          this.userTokenBalance.push(new UserTokenBalance("USDC", balance.contractAddress, balance.tokenBalance));
        };

      });
      this.tokens = response.tokenBalances;
    });
  }

  private async loadNFTs(): Promise<OwnedNftsResponse> {
    const nfts = await this.alchemy.nft.getNftsForOwner(this.address);
    return nfts;
  }

  private async loadTokenBalances(): Promise<TokenBalancesResponse> {
    const tokens = await this.alchemy.core.getTokenBalances(this.address, [this.usdcContract]);
    return tokens;
  }

  private parseFloat(str: string, radix: number) {
    var parts = str.split(".");
    if ( parts.length > 1 ) {
      return parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length);
    }
    return parseInt(parts[0], radix);
  }

  private getMarketData(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    // https://rest.coinapi.io/v1/quotes/ETH/current?apikey="1B22C5F2-B142-4C19-8712-D733654CFAD0"
    // https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?CMC_PRO_API_KEY="ee0fee5a-c681-45e8-a188-cdbeff257f35"
    return this.http.get<any>("https://rest.coinapi.io/v1/quotes/BITSTAMP_SPOT_BTC_USD/current", {
      headers: headers,
      params: {
        'apikey': "1B22C5F2-B142-4C19-8712-D733654CFAD0"
      }
      })
  }

}

class UserTokenBalance implements TokenBalanceSuccess {
  public token: string;
  contractAddress: string;
  tokenBalance: string;
  error: null;

  constructor(token: string, addr: string, bal: string) {
    this.contractAddress = addr;
    this.tokenBalance = bal;
    this.token = token;
    this.error = null;
  }
}