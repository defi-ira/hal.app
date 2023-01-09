import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AssetManagerComponent } from './components/asset-manager/asset-manager.component';
import { UserWalletComponent } from './components/user-wallet/user-wallet.component';

const routes: Routes = [
  { path: 'assets', component: AssetManagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
