import { Component, OnInit, OnDestroy} from '@angular/core';
import {
  BacktestingInput,
  BlackLittermanInput,
  BlackLittermanPortfolio,
  ViewInput
} from '../models/portfolio.model';
import {PortfolioService} from '../services/portfolio.service';
import {FormControl} from '@angular/forms';
import {InfoService} from '../services/info.service';
import {EtfInfo, CartState} from '../models/etfinfo.model';
import {Subscription} from 'rxjs/Subscription';
import {Chart} from 'chart.js';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {BacktestingService} from '../services/backtesting.service';

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
export class BlacklittermanComponent implements OnInit, OnDestroy {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  maxRf = 100;
  from_date: string;
  to_date: string;
  chart = Chart;
  chartCreated = false;
  warnMessage: string[] = [];
  errorMessage = '';
  viewErrorMessage = '';

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
  recommendations = ['IE0031442068', 'LU0290355717', 'FR0010315770', 'FR0010429068',
    'LU0446734104', 'IE00B1YZSC51', 'LU0846194776', 'DE000A1C22M3'];

  etflist: EtfInfo[];
  views: ViewInput[] = [];
  noViews = 1;
  portfolios: BlackLittermanPortfolio[];
  rf: number;
  tau: number;
  private subscription: Subscription;
  backtestingInput: BacktestingInput;


  constructor(private portfolioService: PortfolioService, private infoService: InfoService,
              private formBuilder: FormBuilder, private backtestingService: BacktestingService) {
  }

  ngOnInit() {
    // Load current state of shoppinglist once, then subscribe to changes
    this.etflist = this.infoService.ETFShoppingList as EtfInfo[];

    this.subscription = this
      .infoService
      .CartState
      .subscribe((state: CartState) => {
        this.etflist = state.products;
      });

    this.onChanges();


  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getBLPortfolios(etfinfos: EtfInfo[], views: any[], date_from: any, date_to: any, rf: number, tau: number, shrinkage: boolean): void {
    this.warnMessage = [];
    this.errorMessage = '';
    let symbols = [];
    if (!date_from || !date_to) {
      this.warnMessage.push('Fehler bei der Datumseingabe. Verwende Datum von 1.1.2015 bis 1.1.2018.');
      date_from = '2015-01-01';
      date_to = '2018-01-01';
    }
    if (!rf) {
      this.warnMessage.push('Kein risikoloser Zinssatz angegeben. Verwende 0,38%.');
      rf = 0.0038;
    }
    if (!tau) {
      this.warnMessage.push('Kein Skalierungsfaktor angegeben. Verwende 0,025.');
      tau = 0.025;
    }
    if (this.recommendationsChecked) {
      console.log('Using recommendations as BlackLitterman Input.');
      symbols = this.recommendations;
      const newInput: BlackLittermanInput = {symbols, views, date_from, date_to, rf, tau, shrinkage} as BlackLittermanInput;
      console.log('BlackLitterman Input:');
      console.log(JSON.stringify(newInput));
      this.portfolioService.getBLPortfolios(newInput).subscribe(portfolio =>
        this.handlePortfolioResponse(portfolio),
        error => this.errorMessage = 'Portfolios konnten nicht konstruiert werden!'
      );
    } else {
      if (etfinfos && etfinfos.length > 0) {
        for (const etf of etfinfos) {
          symbols.push(etf.isin);
        }
        const newInput: BlackLittermanInput = {symbols, views, date_from, date_to, rf, tau, shrinkage} as BlackLittermanInput;
        console.log('BlackLitterman Input:');
        console.log(JSON.stringify(newInput));
        this.portfolioService.getBLPortfolios(newInput).subscribe(portfolio =>
          this.handlePortfolioResponse(portfolio),
          error => this.errorMessage = 'Portfolios konnten nicht konstruiert werden!'
        );
      } else {
        this.warnMessage.push('Keine ETFs oder Vorschlagsliste gewählt.');
        this.errorMessage = 'Portfolios können nicht konstruiert werden!';
      }
    }
  }
  handlePortfolioResponse(portfolios) {
    this.portfolios = portfolios;
    const initial_investment = 10000;
    const brownian_motion = true;
    const num_simulations = 1000;
    const predicted_days = 252;
    const date_from = '2015-01-01';
    const date_to = '2018-01-01';

    this.backtestingInput = {initial_investment, brownian_motion,
      num_simulations, predicted_days, date_from, date_to, portfolios};

    console.log('>>>>>>>> Sending BacktestingInput:' + JSON.stringify(this.backtestingInput));
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

    const hist_ret_tan = [{
      x: this.portfolios[0].tan_stdev,
      y: this.portfolios[0].tan_ret
    }];

    const equilibrium_ret_tan = [{
      x: this.portfolios[1].tan_stdev,
      y: this.portfolios[1].tan_ret
    }];

    let adj_equilibrium_tan = [];
    if (this.portfolios.length > 2) {
      for (let i = 0; i < this.portfolios[2].front_ret.length; i++) {
        adj_equilibrium_frontier.push(
          {
            x: this.portfolios[2].front_stdev[i],
            y: this.portfolios[2].front_ret[i]
          }
        );
      }

      adj_equilibrium_tan = [{
        x: this.portfolios[2].tan_stdev,
        y: this.portfolios[2].tan_ret,
      }];

    }
    console.log('equilibrium_ret_frontier:');
    console.log(equilibrium_ret_frontier);
    this.plotPortfolios(hist_ret_frontier, equilibrium_ret_frontier,
      adj_equilibrium_frontier, hist_ret_tan, equilibrium_ret_tan, adj_equilibrium_tan);
  }

  plotPortfolios(hist_ret_frontier, equilibrium_ret_frontier,
                 adj_equilibrium_frontier, hist_ret_tan, equilibrium_ret_tan, adj_equilibrium_tan) {
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
          },
          {
            label: 'Tangentialportfolio (MVO historische Renditen)',
            data: hist_ret_tan,
            fill: false,
            showLine: true,
            pointRadius: 4,
            borderWidth: 4,
            borderColor: '#EFAA52',
            backgroundColor: '#EFAA52',
          },
          {
            label: 'Tangentialportfolio (MVO Gleichgewichtsrenditen)',
            data: equilibrium_ret_tan,
            fill: false,
            showLine: true,
            pointRadius: 4,
            borderWidth: 4,
            borderColor: '#EFAA52',
            backgroundColor: '#EFAA52',
          },
          {
            label: 'Tangentialportfolio (MVO Gleichgewichtsrenditen mit angepassten Views)',
            data: adj_equilibrium_tan,
            fill: false,
            showLine: true,
            pointRadius: 4,
            borderWidth: 4,
            borderColor: '#EFAA52',
            backgroundColor: '#EFAA52',
          }
          ]
      },
      // Configuration options go here
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Erwartete Rendite'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Risiko'
            }
          }]
        },
        legend: {
          labels: {
            filter: function (item, chart) {
              // Exclude Tangent Portfolio labels from legend
              return !item.text.includes('Tangentialportfolio');
            },
          }
        }
      }
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
    this.getBLPortfolios(this.etflist, this.views, this.from_date,
      this.to_date, this.rf, this.tau, this.shrinkageChecked);
  }

  addView() {
    this.viewErrorMessage = '';
    const newView = {
      isin1: String(this.viewControlETF1.value).valueOf(),
      operator: String(this.viewControlOperator.value).valueOf(),
      isin2: String(this.viewControlETF2.value).valueOf(),
      adjustment: Number(this.viewControlStrength.value).valueOf(),
    } as ViewInput;

    if (newView['isin1'].length > 0 && newView['isin2'].length > 0
      && newView['operator'].length > 0 && newView['adjustment']) {
      this.views.push(newView);
      console.log('Added View' + JSON.stringify(newView));
    } else {
      this.viewErrorMessage = 'Unvollständige Eingabe! View konnte nicht erzeugt werden.';
    }
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

