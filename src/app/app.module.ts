import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localede from '@angular/common/locales/de';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
// import { EtfinfoComponent } from './etfinfo/etfinfo.component';
import { ClusterComponent } from './cluster/cluster.component';
import { EtfdetailComponent } from './etfdetail/etfdetail.component';
import { ApiService } from './services/api.service';
import { PriceService } from './services/price.service';
import { PortfolioService } from './services/portfolio.service';
import { InfoService } from './services/info.service';
import { CartitemComponent } from './cartitem/cartitem.component';
import { CartItemModule } from './cartitem/cartitem.module';

import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { AppRoutingModule } from './app-routing.module';
import {EtfInfoModule} from './etfinfo/etfinfo.module';
import { AgGridModule } from 'ag-grid-angular';
import { BlacklittermanComponent } from './blacklitterman/blacklitterman.component';
import { BacktestingComponent } from './backtesting/backtesting.component';
import { PiechartComponent } from './blacklitterman/piechart/piechart.component';



registerLocaleData(localede);


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PortfolioComponent,
    // EtfinfoComponent,
    ClusterComponent,
    EtfdetailComponent,
    // CartitemComponent,
    ShoppinglistComponent,
    BlacklittermanComponent,
    BacktestingComponent,
    PiechartComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMomentDateModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CartItemModule,
  ],
  // exports: [
  //   CartitemComponent,
  // ],
  bootstrap: [AppComponent],
  providers: [ApiService, PriceService, PortfolioService, InfoService,
    { provide: LOCALE_ID, useValue: 'de' }]
})
export class AppModule { }
