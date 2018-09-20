import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { LinkVisualComponent } from './visuals/shared/link-visual/link-visual.component';
import { NodeVisualComponent } from './visuals/shared/node-visual/node-visual.component';

import { D3Service, D3_DIRECTIVES } from './d3';
import { SHARED_VISUALS } from './visuals/shared';
import { GraphComponent } from './visuals/graph/graph.component';
import { NetworkComponent } from './network/network.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './guards';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert';



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
    GraphComponent,
    LinkVisualComponent,
    NodeVisualComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    NetworkComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AlertComponent,
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
  providers: [ApiService,
    PriceService,
    PortfolioService,
    D3Service,
    InfoService,
    AuthGuard,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'de' }]
})
export class AppModule { }
