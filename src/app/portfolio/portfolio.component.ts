import { Component, OnInit, NgModule } from '@angular/core';
import { Portfolio, PortfolioInput } from '../models/portfolio.model';
import {PortfolioService} from '../services/portfolio.service';
import {MatDatepickerInputEvent} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl} from '@angular/forms';
import {InfoService} from '../services/info.service';
import {EtfInfo, CartState} from '../models/etfinfo.model';
import {Subscription} from '../../../node_modules/rxjs/Subscription';

declare var moment: any;

const dateFormat = 'YYYY-MM-DD';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  providers: [ PortfolioService ]
})

@NgModule({
  imports: [],
  providers: [
  ],
})


export class PortfolioComponent implements OnInit {

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  from_date: string;
  to_date: string;
  num_portfolios: number;

  fromDateControl = new FormControl();
  toDateControl = new FormControl();

  private subscription: Subscription;
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio;
  etfinfos: EtfInfo[];

  etfs = ['IE00BJ0KDQ92', 'IE0031442068', 'LU0290355717'];

  constructor(private portfolioService: PortfolioService, private infoService: InfoService) {
  }

  ngOnInit() {
    this.onChanges();

    //this.infoService.AllInfoState.subscribe(info => this.etfinfos = info);
    //this.doSubscription();
    console.log('Portfolio subscribed to etfinfos');
  }


  getPortfolios(num_portfolios: number, date_from: any, date_to: any, etfs: string[], price: string): void {
    const newInput: PortfolioInput = {num_portfolios, price, date_from, date_to, etfs} as PortfolioInput;
    console.log(JSON.stringify(newInput));
    this.portfolioService.getETFPortfolios(newInput).subscribe(portfolio => this.portfolios = portfolio);
  }

  addNumPortfolios(event: any) {
    this.num_portfolios = event.value;
  }
  parseDate(mom) {
    if (mom) {
      return moment(mom).format(dateFormat);
    } else {
      return mom;
    }
  }

  onButtonPressed() {
    this.getPortfolios(this.num_portfolios, this.from_date, this.to_date, this.etfs, 'last');
  }

  onChanges(): void {
    this.fromDateControl.valueChanges.subscribe(val => {
      this.from_date = this.parseDate(this.fromDateControl.value);
      console.log('new from fromDateC: ' + this.from_date);
    });

    this.toDateControl.valueChanges.subscribe(val => {
      this.to_date = this.parseDate(this.toDateControl.value);
      console.log('new from toDate: ' + this.to_date);
    });
  }

}
