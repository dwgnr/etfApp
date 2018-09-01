import {Component, ViewChild, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, NgModule} from '@angular/core';
// import {InfoService} from '../services/info.service';
import {CartState, EtfInfo, InfoState} from '../models/etfinfo.model';
import {InfoService} from '../services/info.service';
import {Subscription} from '../../../node_modules/rxjs/Subscription';
import {EtfinfoRoutingModule} from './etfinfo.routing';
import {ValuesPipe} from './values.pipe';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {PriceService} from '../services/price.service';
import {MAResponse, PerformanceResponse, PriceResponse} from '../models/price.model';
import {Chart} from 'chart.js';

declare var $: any;
declare var moment: any;

const dateFormat = 'MMM YYYY';

@Component({
  selector: 'app-etfinfo',
  templateUrl: './etfinfo.component.html',
  styleUrls: ['./etfinfo.component.css'],
  providers: [],
})

export class EtfinfoComponent implements OnInit {

  searchResults: EtfInfo[];
  queryField: FormControl = new FormControl();

  etfinfos: EtfInfo[] = [];
  selectedETF: EtfInfo;
  // prices: PriceResponse[];
  prices: MAResponse[];
  performance6m: PerformanceResponse;
  performance1y: PerformanceResponse;
  performance3y: PerformanceResponse;
  performance5y: PerformanceResponse;

  ready = false;
  chartCreated = false;
  chart = Chart;

  constructor(private infoService: InfoService, private priceService: PriceService) { }
  private subscription: Subscription;

  ngOnInit() {
    // setTimeout(500);
    console.log('Init ETFInfo Component');
    // this.getETFInfoList();
    $(document).foundation();
    // this.infoService.AllInfoState.subscribe(info => this.etfinfos = info.products);
    // this.etfinfos = this.infoService.ETFInfos;
    // this.handleAllETFInfoSubscription();
    this.etfinfos = this.infoService.ETFInfos as EtfInfo[];
    // if (this.etfinfos.length > 0) {
    //   setTimeout(() => this.ready = true, 0);
    // }
    // console.log(this.etfinfos);



    // this.subscription = this
    //   .infoService
    //   .AllInfoState
    //   .subscribe((state: InfoState) => {
    //     this.etfinfos = state.products;
    //   });


    this.queryField.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap((query) =>  this.infoService.search(query))
      .subscribe( result => this.searchResults = result);
  }

  plotPortfolios() {
    if (this.chartCreated) {
      this.chart.destroy();
    }

    const pricedata = [];
    const ma_30 = [];
    const ma_90 = [];
    const lbls = [];
    for (const p of this.prices) {
      pricedata.push(p.price);
      ma_30.push(p.ma_30);
      ma_90.push(p.ma_90);
      lbls.push(this.parseDate(p.date));
    }
    // console.log('plot data: ' + JSON.stringify(pricedata));
     this.chart = new Chart('canvas', {
      type: 'line',
       data: {
        labels: lbls,
        datasets: [{
          label: 'Preis',
          data: pricedata,
        },
          {
            label: '30-Tage MA',
            data: ma_30,
            fill: false,
            pointRadius: 0,
            borderWidth: 1,
            borderColor: '#F26968',
            backgroundColor: '#F26968',
          },
          {
            label: '90-Tage MA',
            data: ma_90,
            fill: false,
            pointRadius: 0,
            borderWidth: 1,
            borderColor: '#1779ba',
            backgroundColor: '#1779ba',
          }]
      },

      // Configuration options go here
      options: {}
    });
    this.chartCreated = true;
  }

  handleAllETFInfoSubscription() {
    setTimeout(500);
    console.log('ETF Info handles subscription');
    this.subscription = this
      .infoService
      .AllInfoState
      .subscribe((state: InfoState) => {
        this.etfinfos = state.products;
        console.log(this.etfinfos);
      });
    // console.log(this.etfinfos);
  }

  onClick(info: EtfInfo) {
    // console.log('clicked on ' + info.isin);
    this.selectedETF = info;
    // this.priceService.getAllPricesByISIN(info.isin).subscribe(price => this.prices = price,
    //     error => console.log('Error: ', error),
    //   () => this.plotPortfolios()
    //   );

    this.priceService.getMovingAverageByISIN(info.isin).subscribe(price => this.prices = price,
      error => console.log('Error: ', error),
      () => this.plotPortfolios()
    );

    this.priceService.getPerformanceByISIN(info.isin, '2018-02-01', '2018-08-01').subscribe(performance => this.performance6m = performance,
      error => console.log('Error: ', error)
    );

    this.priceService.getPerformanceByISIN(info.isin, '2017-08-01', '2018-07-31').subscribe(performance => this.performance1y = performance,
      error => console.log('Error: ', error)
    );

    this.priceService.getPerformanceByISIN(info.isin, '2015-08-01', '2018-07-31').subscribe(performance => this.performance3y = performance,
      error => console.log('Error: ', error)
    );

    this.priceService.getPerformanceByISIN(info.isin, '2013-08-01', '2018-07-31').subscribe(performance => this.performance5y = performance,
      error => console.log('Error: ', error)
    );
  }

  parseDate(mom) {
    if (mom) {
      return moment(mom).format(dateFormat);
    } else {
      return mom;
    }
  }

}


