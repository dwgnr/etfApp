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
import {PriceResponse} from '../models/price.model';
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
  prices: PriceResponse[];
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
      .subscribe( result => {  if (!result) { return; } else { this.searchResults = result; }
      });

  }

  plotPortfolios() {
    if (this.chartCreated) {
      this.chart.destroy();
    }

    const plotdata = [];
    const lbls = [];
    for (const p of this.prices) {
      plotdata.push(p.last);
      lbls.push(this.parseDate(p.date));
    }
    // console.log('plot data: ' + JSON.stringify(plotdata));
     this.chart = new Chart('canvas', {
      type: 'line',
       data: {
        labels: lbls,
        datasets: [{
          label: 'Preis',
          data: plotdata,
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
    this.priceService.getAllPricesByISIN(info.isin).subscribe(price => this.prices = price,
        error => console.log('Error: ', error),
      () => this.plotPortfolios()
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


