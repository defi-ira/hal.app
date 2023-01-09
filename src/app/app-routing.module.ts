import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AssetManagerComponent } from './components/asset-manager/asset-manager.component';
import { HomeComponent } from './home/home.component';
import { UserWalletComponent } from './components/user-wallet/user-wallet.component';
import { VaultListComponent } from './components/vault-list/vault-list.component';
import { VaultOpenComponent } from './components/vault-open/vault-open.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'assets', component: AssetManagerComponent },
  { path: 'vaults', component: VaultListComponent },
  { path: 'vaults/open/:token', component: VaultOpenComponent },
  { path: 'vaults/:id', component: VaultOpenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
