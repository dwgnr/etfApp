import { Component, OnInit, OnDestroy} from '@angular/core';
import { Portfolio, PortfolioInput } from '../models/portfolio.model';
import {PortfolioService} from '../services/portfolio.service';
import {FormControl} from '@angular/forms';
import {InfoService} from '../services/info.service';
import {EtfInfo, CartState} from '../models/etfinfo.model';
import {Subscription} from '../../../node_modules/rxjs/Subscription';
import {Chart} from 'chart.js';

declare var moment: any;

const dateFormat = 'YYYY-MM-DD';

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
  chart = Chart;
  chartCreated = false;
  warning = false;
  warnMessage = '';

  fromDateControl = new FormControl();
  toDateControl = new FormControl();

  private subscription: Subscription;
  etflist: EtfInfo[];

  portfolios: Portfolio[];
  maxSharpePortfolio: Portfolio;
  minVolPortfolio: Portfolio;
  selectedPortfolio: Portfolio;
  loading = false;

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
    if (!num_portfolios || num_portfolios < 1) {
      this.warning = true;
      this.warnMessage = 'Keine Portfoliozahl gewählt. Setze mit 1.000 fort.';
      num_portfolios = 1000;
    }
    if (!date_from || !date_to) {
      this.warning = true;
      this.warnMessage = 'Fehler bei der Datumseingabe. Portfolios werden nicht konstruiert.';
      return;
    }
    if (etfinfos && etfinfos.length > 0) {
      for (const etf of etfinfos) {
        etfs.push(etf.isin);
      }
      const newInput: PortfolioInput = {num_portfolios, price, date_from, date_to, etfs} as PortfolioInput;
      console.log(JSON.stringify(newInput));
      this.warning = false;
      this.portfolioService.getETFPortfolios(newInput).subscribe(portfolio => this.handlePortfolioResponse(portfolio)
      );
    } else {
      this.warning = true;
      this.warnMessage = 'Keine ETFs gewählt. Portfolios werden nicht konstruiert.';
    }
  }
  handlePortfolioResponse(portfolios) {
    this.portfolios = portfolios;
    // const returns = [];
    // const stdevs = [];
    const plotdata = [];
    for (const p of portfolios) {
      plotdata.push(
        {
          x: p.stdev,
          y: p.ret
        }
      );
    }
    this.plotPortfolios(plotdata);
    this.findMaxSharpePortfolio();
    this.findMinVolPortfolio();
    this.loading = false;
  }

  plotPortfolios(plotdata) {
    if (this.chartCreated) {
      this.chart.destroy();
    }
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
    this.chartCreated = true;
  }
  findMaxSharpePortfolio() {
    // console.log(this.portfolios);
    for (const p of this.portfolios) {
      if (p.is_max_sharpe) {
        this.maxSharpePortfolio = p;
        // console.log('MaxSharpePort: ' + JSON.stringify(this.maxSharpePortfolio));
      }
    }
  }
  findMinVolPortfolio() {
    for (const p of this.portfolios) {
      if (p.is_min_vol) {
        this.minVolPortfolio = p;
        // console.log('MinVolPort: ' + JSON.stringify(this.minVolPortfolio));
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
    this.loading = true;
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
