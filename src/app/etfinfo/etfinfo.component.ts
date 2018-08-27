import {Component, Input, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, NgModule} from '@angular/core';
// import {InfoService} from '../services/info.service';
import {CartState, EtfInfo, InfoState} from '../models/etfinfo.model';
import {InfoService} from '../services/info.service';
import {Subscription} from '../../../node_modules/rxjs/Subscription';
import {EtfinfoRoutingModule} from './etfinfo.routing';
import {ValuesPipe} from './values.pipe';


declare var $: any;


@Component({
  selector: 'app-etfinfo',
  templateUrl: './etfinfo.component.html',
  styleUrls: ['./etfinfo.component.css'],
  providers: [],
})

export class EtfinfoComponent implements OnInit {

  // @Input()
  // product: EtfInfo;
  etfinfos: EtfInfo[] = [];
  selectedETF: EtfInfo;
  ready = false;

  constructor(private infoService: InfoService) { }
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
  }
}


