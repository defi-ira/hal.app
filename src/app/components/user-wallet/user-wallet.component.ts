import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Alchemy, Network, OwnedNft, OwnedNftsResponse, TokenBalance, TokenBalancesResponse, TokenBalanceSuccess } from "alchemy-sdk";
import { Observable } from 'rxjs';
import { BigNumber, ethers } from 'ethers';
import { ContractService } from 'src/app/service/ContractService';
import { Store } from '@ngrx/store';
import { Web3State } from 'src/app/models/Web3State';

@Component({
  selector: 'user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.scss']
})
export class UserWalletComponent implements OnInit {

  private config = {
    apiKey: "test",
    network: Network.ETH_MAINNET,
  };
  private alchemy = new Alchemy(this.config);

  private satsMod = 1000000;
  public marketData = [];
  public nfts: OwnedNft[] = [];
  public tokens: TokenBalance[] = [];
  public userTokenBalance: UserTokenBalance[] = [];
  private usdcContract = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

  private wallet$: Observable<Web3State>;

  constructor(private http: HttpClient, private store: Store<{ wallet: Web3State }>) {
    this.wallet$ = store.select('wallet');
  }

  ngOnInit(): void {
    this.store.select(state => {console.log(state.wallet)});

    this.wallet$.subscribe((wallet) => {
        if (wallet.wallet.length == 0) {return;}
        this.loadTokenBalances(wallet.wallet).then((response) => {
            response.tokenBalances.forEach(balance => {
              if (balance.tokenBalance) { 
                balance.tokenBalance = (this.parseFloat(balance.tokenBalance, 16)/this.satsMod)
                  .toLocaleString("en-us", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 8}); 
                
                this.userTokenBalance.push(new UserTokenBalance("USDC", balance.contractAddress, balance.tokenBalance, "usdc"));
              };
            });
            this.tokens = response.tokenBalances;
          });
      
          this.loadBalance(wallet.wallet).then((response) => {
            if (response) {
              this.userTokenBalance.push(new UserTokenBalance("ETH", "0x0", ethers.utils.formatEther(response), "eth"));
            }
          });
    });
  }

  private async loadNFTs(wallet: string): Promise<OwnedNftsResponse> {
    const nfts = await this.alchemy.nft.getNftsForOwner(wallet);
    return nfts;
  }

  private async loadTokenBalances(wallet: string): Promise<TokenBalancesResponse> {
    const tokens = await this.alchemy.core.getTokenBalances(wallet, [this.usdcContract]);
    return tokens;
  }

  private async loadBalance(wallet: string): Promise<BigNumber> {
    return this.alchemy.core.getBalance(wallet, "latest");
  }

  private parseFloat(str: string, radix: number) {
    var parts = str.split(".");
    if ( parts.length > 1 ) {
      return parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length);
    }
    return parseInt(parts[0], radix);
  }

}

class UserTokenBalance implements TokenBalanceSuccess {
  public token: string;
  contractAddress: string;
  tokenBalance: string;
  image: string;
  error: null;

  constructor(token: string, addr: string, bal: string, image: string) {
    this.contractAddress = addr;
    this.tokenBalance = bal;
    this.token = token;
    this.image = image
    this.error = null;
  }
}