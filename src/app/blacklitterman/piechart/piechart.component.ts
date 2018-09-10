import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {EtfInfo} from '../../models/etfinfo.model';
import {BlackLittermanPortfolio} from '../../models/portfolio.model';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit, OnChanges {

  pieChartsCreated = false;
  chartIds = ['piecanvas0', 'piecanvas1', 'piecanvas2'];
  colorPalette = ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)',
    'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)',
    '#EEEEEE', '#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850',
    '#001f3f', '#0074D9', '#7FDBFF', '#39CCCC', '#3D9970',
    '#2ECC40', '#01FF70', '#FFDC00', '#FF851B', '#FF4136',
    '#85144b', '#F012BE', '#B10DC9', '#111111', '#AAAAAA'];
  pieChart0 = Chart;
  pieChart1 = Chart;
  pieChart2 = Chart;


  @Input()
  public portfolios: BlackLittermanPortfolio[];

  // @Input()
  // public chartId: string;

  constructor() { }

  ngOnInit() {

    // this.pieChart0 = this.createPieCharts(this.portfolios[0],
    //   this.chartIds[0], 'Mean-Variance Optimization basierend auf historischen Renditen');
    // this.pieChart1 = this.createPieCharts(this.portfolios[1],
    //   this.chartIds[1], 'Mean-variance Optimization basierend auf Gleichgewichtsrenditen');
    // if (this.portfolios.length > 2) {
    //   this.pieChart2 = this.createPieCharts(this.portfolios[2],
    //     this.chartIds[2], 'Mean-variance Optimization basierend auf Gleichgewichtsrenditen mit angepassten Views');
    // }
    // this.pieChartsCreated = true;
    }

    ngOnChanges(changes: SimpleChanges) {

      if (this.pieChartsCreated) {
        this.pieChart0.destroy();
        this.pieChart1.destroy();
        if (this.portfolios.length > 2) {
        }
      }
      for (const propName in changes) {
        const change = changes[propName];
        if (this.pieChartsCreated && change.previousValue && change.previousValue.length > 2) {
          this.pieChart2.destroy();
        }
      }
      this.pieChart0 = this.createPieCharts(this.portfolios[0],
        this.chartIds[0], 'Mean-Variance Optimization basierend auf historischen Renditen');
      this.pieChart1 = this.createPieCharts(this.portfolios[1],
        this.chartIds[1], 'Mean-variance Optimization basierend auf Gleichgewichtsrenditen');
      if (this.portfolios.length > 2) {
        this.pieChart2 = this.createPieCharts(this.portfolios[2],
          this.chartIds[2], 'Mean-variance Optimization basierend auf Gleichgewichtsrenditen mit angepassten Views');
      }
      this.pieChartsCreated = true;
    }

  createPieCharts(portfolio: BlackLittermanPortfolio, ctx: string, txt: string) {

    const weights = [];
    const labels = [];
    const cols = [];
    // const ctx = 'piecanvas1';
    console.log('Creating: ' + ctx);
    console.log('Portfolio ret: ' + portfolio.tan_ret);
    let count = 0;
    for (const asset of portfolio.tan_weights) {
      weights.push(Math.round(asset.weight));
      labels.push(asset.isin);
      if (count < this.colorPalette.length) {
        cols.push(this.colorPalette[count]);
        count++;
      }
    }
    const chrt = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          // label: 'Population (millions)',
          backgroundColor: cols,
          data: weights
        }]
      },
      options: {
        title: {
          display: true,
          text: txt
        },
      }
    });
    return chrt;
  }


}
