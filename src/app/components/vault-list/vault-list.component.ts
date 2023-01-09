import { Component, OnInit } from '@angular/core';
import { Vault } from 'src/app/models/Vault';
import { VaultService } from 'src/app/service/VaultService';

@Component({
  selector: 'app-vault-list',
  templateUrl: './vault-list.component.html',
  styleUrls: ['./vault-list.component.scss']
})
export class VaultListComponent implements OnInit {

  public vaults: Vault[];

  public multiVaults: Vault[];

  constructor(private vaultService: VaultService) {
    this.vaults = vaultService.getAllVaults();
    this.multiVaults = [];
  }

  ngOnInit(): void {
  }

}