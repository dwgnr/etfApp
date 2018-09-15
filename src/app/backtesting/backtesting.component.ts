import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {BacktestingInput, BacktestingResults, BlackLittermanPortfolio} from '../models/portfolio.model';
import {BacktestingService} from '../services/backtesting.service';
import {Chart} from 'chart.js';

declare var moment: any;
const dateFormat = 'MMM YYYY';

@Component({
  selector: 'app-backtesting',
  templateUrl: './backtesting.component.html',
  styleUrls: ['./backtesting.component.css']
})
export class BacktestingComponent implements OnInit, OnChanges {

  @Input()
  public backtestingInput: BacktestingInput;
  backtestingResults: BacktestingResults;
  chartCreated = false;
  chart = Chart;
  scaledHistVaRs  = [];
  scaledHistCVaRs = [];

  constructor(private backtestingService: BacktestingService) { }

  ngOnInit() {
  //   this.backtestingService.getBacktestingResults(this.backtestingInput).subscribe(result => this.backtestingResults = result,
  //     error => console.log('Error: ', error),
  //     () => this.plotHistPerformance()
  // );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.backtestingService.getBacktestingResults(this.backtestingInput).subscribe(result => this.backtestingResults = result,
      error => console.log('Error: ', error),
      () => this.plotHistPerformance()
    );
  }


  plotHistPerformance() {
    this.scaleVaRToAnnual();
    if (this.chartCreated) {
      this.chart.destroy();
    }

    const adj_equilibrium_data = [];
    const lbls = [];
    for (const d of this.backtestingResults.dates) {
      lbls.push(this.parseDate(d));
    }

    if (this.backtestingResults.historical_performances.length > 2) {
      for (const p of this.backtestingResults.historical_performances[2]) {
        adj_equilibrium_data.push(p);
      }
    }


    // console.log('plot data: ' + JSON.stringify(pricedata));
    this.chart = new Chart('backtestingCanvas', {
      type: 'line',
      data: {
        labels: lbls,
        datasets: [{
          label: 'MVO historische Renditen',
          data: this.backtestingResults.historical_performances[0],
          fill: false,
          pointRadius: 1,
          borderWidth: 3,
        },
          {
            label: 'MVO Gleichgewichtsrenditen',
            data: this.backtestingResults.historical_performances[1],
            fill: false,
            pointRadius: 1,
            borderWidth: 3,
            borderColor: '#F26968',
            backgroundColor: '#F26968',
          },
          {
            label: 'MVO Gleichgewichtsrenditen mit angepassten Views',
            data: adj_equilibrium_data,
            fill: false,
            pointRadius: 1,
            borderWidth: 3,
            borderColor: '#1779ba',
            backgroundColor: '#1779ba',
          }]
      },

      // Configuration options go here
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Portfoliowert in Euro (ohne Rebalancing)'
            }
          }]
        }
      }
    });
    this.chartCreated = true;
  }

  scaleVaRToAnnual() {
    for (const hist_var of this.backtestingResults.hist_value_at_risk) {
      this.scaledHistVaRs.push(hist_var * Math.sqrt(252));
    }
    for (const hist_cvar of this.backtestingResults.hist_cvar) {
      this.scaledHistCVaRs.push(hist_cvar * Math.sqrt(252));
    }
  }

  parseDate(mom) {
    if (mom) {
      return moment(mom).format(dateFormat);
    } else {
      return mom;
    }
  }
}
