import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AssetManagerComponent } from './components/asset-manager/asset-manager.component';
import { HomeComponent } from './components/home/home.component';
import { UserWalletComponent } from './components/user-wallet/user-wallet.component';
import { VaultListComponent } from './components/vault-list/vault-list.component';
import { VaultComponent } from './components/vault/vault.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'assets', component: AssetManagerComponent },
  { path: 'vaults', component: VaultListComponent },
  { path: 'vault/:id', component: VaultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
