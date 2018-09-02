import { Component, OnInit} from '@angular/core';
import {Portfolio, BlackLittermanInput, PortfolioInput, BlackLittermanPortfolio} from '../models/portfolio.model';
import {PortfolioService} from '../services/portfolio.service';
import {FormControl} from '@angular/forms';
import {InfoService} from '../services/info.service';
import {EtfInfo, CartState} from '../models/etfinfo.model';
import {Subscription} from '../../../node_modules/rxjs/Subscription';
import {Chart} from 'chart.js';

declare var moment: any;

const dateFormat = 'YYYY-MM-DD';

@Component({
  selector: 'app-blacklitterman',
  templateUrl: './blacklitterman.component.html',
  styleUrls: ['./blacklitterman.component.css'],
  providers: [ PortfolioService ]
})

// TODO: World bank market cap den Regionen ETFs zuordnen und Vorschlagsliste pro Region erstellen:
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

  etflist: EtfInfo[];
  views: any[];
  portfolios: BlackLittermanPortfolio[];
  rf: number;
  tau: number;

  constructor(private portfolioService: PortfolioService, private infoService: InfoService) {
  }

  ngOnInit() {
    this.onChanges();
    this.etflist = this.infoService.ETFShoppingList as EtfInfo[];
  }

  getBLPortfolios(etfinfos: EtfInfo[], views: any[], date_from: any, date_to: any, rf: number, tau: number): void {
    const symbols = [];
    if (!date_from || !date_to) {
      this.warning = true;
      this.warnMessage = 'Fehler bei der Datumseingabe. Portfolios werden nicht konstruiert.';
      return;
    }
    if (etfinfos && etfinfos.length > 0) {
      for (const etf of etfinfos) {
        symbols.push(etf.isin);
      }
      const newInput: BlackLittermanInput = {symbols, views, date_from, date_to, rf, tau} as BlackLittermanInput;
      console.log('BlackLitterman Input:');
      console.log(JSON.stringify(newInput));
      this.warning = false;
      this.portfolioService.getBLPortfolios(newInput).subscribe(portfolio =>
        this.handlePortfolioResponse(portfolio)
      );
    } else {
      this.warning = true;
      this.warnMessage = 'Keine ETFs gewählt. Portfolios werden nicht konstruiert.';
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

    for (let i = 0; i < this.portfolios[2].front_ret.length; i++) {
      adj_equilibrium_frontier.push(
        {
          x: this.portfolios[2].front_stdev[i],
          y: this.portfolios[2].front_ret[i]
        }
      );
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
    this.views = [{
      'isin1': 'dsdsfdj',
      'operator': 'sjdj',
      'isin2': 'djndsjnd',
      'adjustment': 0.02
    }];
    this.getBLPortfolios(this.etflist, this.views, this.from_date, this.to_date, this.rf, this.tau);
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

