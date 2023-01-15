import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Web3State } from './models/Web3State';
import { ParticlesConfig } from './particles-config';
import { ContractService } from './service/ContractService';
import { addWallet } from './state/wallet.actions';

declare let particlesJS: any; // Required to be properly interpreted by TypeScript.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zurik';

  public wallet$: Observable<Web3State>;
  public address: string;

  constructor(private contractService: ContractService, private store: Store<{ wallet: Web3State }>) {
    this.wallet$ = store.select('wallet');
    this.address = "";
  }

  ngOnInit() {
    this.invokeParticles();
    this.wallet$.subscribe((wallet) => {
        this.address = wallet.wallet;
    });
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }

  public walletConnected(): boolean {
    return this.address.length > 0;
  }

  public shortAddress(): string {
    return this.address.slice(0,4) + "..." + this.address.slice(39,42)
  }

  openMetamask(){
    this.contractService.openMetamask().then(resp =>{
        this.store.dispatch(addWallet({wallet: resp}));
    })
}
}
