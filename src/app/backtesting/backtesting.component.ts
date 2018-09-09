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
        },
          {
            label: 'MVO Gleichgewichtsrenditen',
            data: this.backtestingResults.historical_performances[1],
            fill: false,
            pointRadius: 0,
            borderWidth: 1,
            borderColor: '#F26968',
            backgroundColor: '#F26968',
          },
          {
            label: 'MVO Gleichgewichtsrenditen mit angepassten Views',
            data: adj_equilibrium_data,
            fill: false,
            pointRadius: 0,
            borderWidth: 1,
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
              labelString: 'Portfoliowert in Euro'
            }
          }]
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
}
