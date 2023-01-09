import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserWalletComponent } from './components/user-wallet/user-wallet.component';
import { AssetManagerComponent } from './components/asset-manager/asset-manager.component';
import { HttpClientModule } from '@angular/common/http';

import { ChartModule } from 'angular-highcharts';

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChartComponent } from './components/chart/chart.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { VaultListComponent } from './components/vault-list/vault-list.component';
import { VaultOpenComponent } from './components/vault-open/vault-open.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VaultService } from './service/VaultService';

@NgModule({
  declarations: [
    AppComponent,
    UserWalletComponent,
    AssetManagerComponent,
    ChartComponent,
    VaultListComponent,
    VaultOpenComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    ChartModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
    },
    VaultService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
