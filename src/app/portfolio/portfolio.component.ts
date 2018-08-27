import { Component, OnInit, OnDestroy } from '@angular/core';
import { Portfolio, PortfolioInput } from '../models/portfolio.model';
import {PortfolioService} from '../services/portfolio.service';
import {MatDatepickerInputEvent} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl} from '@angular/forms';
import {InfoService} from '../services/info.service';
import {EtfInfo, CartState} from '../models/etfinfo.model';
import {Subscription} from '../../../node_modules/rxjs/Subscription';
import {Chart} from 'chart.js';

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


export class PortfolioComponent implements OnInit, OnDestroy {

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  from_date: string;
  to_date: string;
  num_portfolios: number;
  chart = [];

  fromDateControl = new FormControl();
  toDateControl = new FormControl();

  private subscription: Subscription;
  etflist: EtfInfo[];

  portfolios: Portfolio[];
  maxSharpePortfolio: Portfolio;
  minVolPortfolio: Portfolio;
  selectedPortfolio: Portfolio;

  // etfs = ['IE00BJ0KDQ92', 'IE0031442068', 'LU0290355717'];

  constructor(private portfolioService: PortfolioService, private infoService: InfoService) {
  }

  ngOnInit() {
    this.onChanges();
    // this.handleSubscription();
    this.etflist = this.infoService.ETFShoppingList as EtfInfo[];

    // this.infoService.AllInfoState.subscribe(info => this.etfinfos = info);
    // this.doSubscription();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }


  getPortfolios(num_portfolios: number, date_from: any, date_to: any, etfinfos: EtfInfo[], price: string): void {
    const etfs = [];
    if (etfinfos && etfinfos.length > 0) {
      for (const etf of etfinfos) {
        etfs.push(etf.isin);
      }
      const newInput: PortfolioInput = {num_portfolios, price, date_from, date_to, etfs} as PortfolioInput;
      console.log(JSON.stringify(newInput));
      this.portfolioService.getETFPortfolios(newInput).subscribe(portfolio => this.handlePortfolioResponse(portfolio)
      );
    } else {
      console.log('No ETFs selected!');
    }
  }
  handlePortfolioResponse(portfolios) {
    this.portfolios = portfolios;
    // const returns = [];
    // const stdevs = [];
    const plotdata = []
    for (const p of portfolios) {
      plotdata.push(
        {
          x: p.stdev,
          y: p.ret
        }
      );
      // stdevs.push(p.stdev);
      // returns.push(p.ret);
    }
    this.plotPortfolios(plotdata);
    this.findMaxSharpePortfolio();
    this.findMinVolPortfolio();
  }

  plotPortfolios(plotdata) {
    this.chart = new Chart('canvas', {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Portfolios',
          data: plotdata
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
    });
  }
  findMaxSharpePortfolio() {
    // console.log(this.portfolios);
    for (const p of this.portfolios) {
      if (p.is_max_sharpe) {
        this.maxSharpePortfolio = p;
        console.log('MaxSharpePort: ' + this.maxSharpePortfolio);
      }
    }
  }
  findMinVolPortfolio() {
    for (const p of this.portfolios) {
      if (p.is_min_vol) {
        this.minVolPortfolio = p;
        console.log('MinVolPort: ' + this.minVolPortfolio);
      }
    }
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
  handleSubscription() {
    this.subscription = this
      .infoService
      .CartState
      .subscribe((state: CartState) => {
        this.etflist = state.products;
        console.log(this.etflist);
      });
    console.log('Portfolio subscribed to shopping cart');
  }

  onButtonPressed() {
    this.getPortfolios(this.num_portfolios, this.from_date, this.to_date, this.etflist, 'last');
  }

  onChanges(): void {
    this.fromDateControl.valueChanges.subscribe(val => {
      this.from_date = this.parseDate(this.fromDateControl.value);
      // console.log('new from fromDate: ' + this.from_date);
    });

    this.toDateControl.valueChanges.subscribe(val => {
      this.to_date = this.parseDate(this.toDateControl.value);
      // console.log('new from toDate: ' + this.to_date);
    });
  }

}
