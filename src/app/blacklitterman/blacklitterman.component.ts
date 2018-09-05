import { Component, OnInit} from '@angular/core';
import {Portfolio, BlackLittermanInput, PortfolioInput, BlackLittermanPortfolio, ViewInput} from '../models/portfolio.model';
import {PortfolioService} from '../services/portfolio.service';
import {FormControl} from '@angular/forms';
import {InfoService} from '../services/info.service';
import {EtfInfo, CartState} from '../models/etfinfo.model';
import {Subscription} from '../../../node_modules/rxjs/Subscription';
import {Chart} from 'chart.js';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

declare var moment: any;

const dateFormat = 'YYYY-MM-DD';

@Component({
  selector: 'app-blacklitterman',
  templateUrl: './blacklitterman.component.html',
  styleUrls: ['./blacklitterman.component.css'],
  providers: [ PortfolioService ]
})

// TODO: Vorschlagsliste pro Region erstellen:
// SELECT region, COUNT(isin) AS Anzahl FROM etf_investment_info
// WHERE (country is null or country = '')
// GROUP BY region
export class BlacklittermanComponent implements OnInit {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  maxRf = 100;
  from_date: string;
  to_date: string;
  chart = Chart;
  chartCreated = false;
  warning = false;
  warnMessage = '';

  fromDateControl = new FormControl();
  toDateControl = new FormControl();
  rfControl = new FormControl();
  tauControl = new FormControl();

  viewControlETF1 = new FormControl();
  viewControlETF2  = new FormControl();
  viewControlOperator = new FormControl();
  viewControlStrength = new FormControl();

  shrinkageChecked = false;
  recommendationsChecked = false;
  viewsChecked = false;
  recommendations = ['IE00BJ0KDQ92', 'IE0031442068', 'LU0290355717', 'FR0010315770', 'FR0010429068',
    'LU0446734104', 'IE00B1YZSC51', 'LU0846194776', 'DE000A1C22M3'];

  etflist: EtfInfo[];
  views: ViewInput[] = [];
  noViews = 1;
  portfolios: BlackLittermanPortfolio[];
  rf: number;
  tau: number;

  constructor(private portfolioService: PortfolioService, private infoService: InfoService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.onChanges();
    this.etflist = this.infoService.ETFShoppingList as EtfInfo[];
  }

  getBLPortfolios(etfinfos: EtfInfo[], views: any[], date_from: any, date_to: any, rf: number, tau: number, shrinkage: boolean): void {
    let symbols = [];
    if (!date_from || !date_to) {
      this.warning = true;
      this.warnMessage = 'Fehler bei der Datumseingabe. Verwende Standarddatum von 1.1.2014 bis 1.1.2018.';
      date_from = '2014-01-01';
      date_to = '2018-01-01';
    }
    if (this.recommendationsChecked) {
      console.log('Using recommendations as BlackLitterman Input.');
      symbols = this.recommendations;
      const newInput: BlackLittermanInput = {symbols, views, date_from, date_to, rf, tau, shrinkage} as BlackLittermanInput;
      console.log('BlackLitterman Input:');
      console.log(JSON.stringify(newInput));
      this.warning = false;
      this.portfolioService.getBLPortfolios(newInput).subscribe(portfolio =>
        this.handlePortfolioResponse(portfolio)
      );
    } else {
      if (etfinfos && etfinfos.length > 0) {
        for (const etf of etfinfos) {
          symbols.push(etf.isin);
        }
        const newInput: BlackLittermanInput = {symbols, views, date_from, date_to, rf, tau, shrinkage} as BlackLittermanInput;
        console.log('BlackLitterman Input:');
        console.log(JSON.stringify(newInput));
        this.warning = false;
        this.portfolioService.getBLPortfolios(newInput).subscribe(portfolio =>
          this.handlePortfolioResponse(portfolio)
        );
      } else {
        this.warning = true;
        this.warnMessage = 'Keine ETFs oder Vorschlagsliste gewählt. Portfolios werden nicht konstruiert.';
      }
    }
  }
  handlePortfolioResponse(portfolios) {
    this.portfolios = portfolios;
    const hist_ret_frontier = [];
    const equilibrium_ret_frontier = [];
    const adj_equilibrium_frontier = [];
    for (let i = 0; i < this.portfolios[0].front_ret.length; i++) {
      hist_ret_frontier.push(
        {
          x: this.portfolios[0].front_stdev[i],
          y: this.portfolios[0].front_ret[i]
        }
      );
    }

    for (let i = 0; i < this.portfolios[1].front_ret.length; i++) {
      equilibrium_ret_frontier.push(
        {
          x: this.portfolios[1].front_stdev[i],
          y: this.portfolios[1].front_ret[i]
        }
      );
    }

    if (this.portfolios.length > 2) {
      for (let i = 0; i < this.portfolios[2].front_ret.length; i++) {
        adj_equilibrium_frontier.push(
          {
            x: this.portfolios[2].front_stdev[i],
            y: this.portfolios[2].front_ret[i]
          }
        );
      }
    }
    console.log('equilibrium_ret_frontier:');
    console.log(equilibrium_ret_frontier);
    this.plotPortfolios(hist_ret_frontier, equilibrium_ret_frontier, adj_equilibrium_frontier);
  }

  plotPortfolios(hist_ret_frontier, equilibrium_ret_frontier, adj_equilibrium_frontier) {
    if (this.chartCreated) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'MVO historische Renditen',
          fill: false,
          showLine: true,
          pointRadius: 1,
          borderWidth: 3,
          data: hist_ret_frontier,
        },
          {
            label: 'MVO Gleichgewichtsrenditen',
            data: equilibrium_ret_frontier,
            fill: false,
            showLine: true,
            pointRadius: 1,
            borderWidth: 3,
            borderColor: '#F26968',
            backgroundColor: '#F26968',
          },
          {
            label: 'MVO Gleichgewichtsrenditen mit angepassten Views',
            data: adj_equilibrium_frontier,
            fill: false,
            showLine: true,
            pointRadius: 1,
            borderWidth: 3,
            borderColor: '#1779ba',
            backgroundColor: '#1779ba',
          }]
      },
      // Configuration options go here
      options: {}
    });
    this.chartCreated = true;
  }
  parseDate(mom) {
    if (mom) {
      return moment(mom).format(dateFormat);
    } else {
      return mom;
    }
  }


  onButtonPressed() {
    // this.views = [{
    //   'isin1': 'dsdsfdj',
    //   'operator': 'sjdj',
    //   'isin2': 'djndsjnd',
    //   'adjustment': 0.02
    // }];
    this.getBLPortfolios(this.etflist, this.views, this.from_date, this.to_date, this.rf, this.tau, this.shrinkageChecked);
  }

  addView() {
    const newView = {
      isin1: String(this.viewControlETF1.value).valueOf(),
      operator: String(this.viewControlOperator.value).valueOf(),
      isin2: String(this.viewControlETF2.value).valueOf(),
      adjustment: Number(this.viewControlStrength.value).valueOf(),
    } as ViewInput;

    this.views.push(newView);
    console.log(String(this.viewControlETF1.value));
    console.log('Added View' + JSON.stringify(newView));
  }

  removeView(view) {
    this.views = this.views.filter(obj => obj !== view);
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

    this.rfControl.valueChanges.subscribe(val => {
      this.rf = this.rfControl.value / 100;
      // console.log('new from toDate: ' + this.to_date);
    });

    this.tauControl.valueChanges.subscribe(val => {
      this.tau = this.tauControl.value;
      // console.log('new from toDate: ' + this.to_date);
    });
  }

}

