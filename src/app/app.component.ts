import { Component, OnInit } from '@angular/core';
import { ParticlesConfig } from './particles-config';
import { ContractService } from './service/ContractService';

declare let particlesJS: any; // Required to be properly interpreted by TypeScript.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zurik';

  constructor(private contractService: ContractService) {}

  ngOnInit() {
    this.invokeParticles();
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }

  openMetamask(){
    this.contractService.openMetamask().then(resp =>{
        console.log(resp);
    })
}
}
