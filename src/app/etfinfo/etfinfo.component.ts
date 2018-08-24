import {Component, Input, OnInit, AfterViewInit, AfterViewChecked, NgModule} from '@angular/core';
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

export class EtfinfoComponent implements OnInit, AfterViewInit, AfterViewChecked {

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
    //this.infoService.AllInfoState.subscribe(info => this.etfinfos = info.products);
    // this.etfinfos = this.infoService.ETFInfos;
    // this.handleAllETFInfoSubscription();
    this.etfinfos = this.infoService.ETFInfos as EtfInfo[];
    // if (this.etfinfos.length > 0) {
    //   setTimeout(() => this.ready = true, 0);
    // }
    console.log(this.etfinfos);



    // this.subscription = this
    //   .infoService
    //   .AllInfoState
    //   .subscribe((state: InfoState) => {
    //     this.etfinfos = state.products;
    //   });
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.ready = true;
    //   // this.subscription = this
    //   //   .infoService
    //   //   .AllInfoState
    //   //   .subscribe((state: InfoState) => {
    //   //     this.etfinfos = state.products;
    //   //   });
    // });

    // setTimeout(5000);
    // this.handleAllETFInfoSubscription();
    // console.log('AfterInit ETFInfo Component');
    // this.ready = true;

  }

  ngAfterViewChecked() {
    // setTimeout(5000);
    console.log('AfterViewChecked ETFInfo Component');
    //console.log(this.etfinfos);
    // setTimeout(() => {
    //   this.ready = true;
    // });
    // this.ready = true;
    // console.log(this.etfinfos);
    // console.log(this.infoService.ETFInfos);
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
    console.log(this.etfinfos);
  }

  // getETFInfoList(): void {
  //   this.infoService.getETFInfos()
  //     .subscribe(infos => this.etfinfos = infos);
  // }
  onClick(info: EtfInfo) {
    console.log('clicked on ' + info.isin);
    this.selectedETF = info;
  }

  // AddProduct(_product: EtfInfo) {
  //   _product.added = true;
  //   this.infoService.addProduct(_product);
  // }
  // RemoveProduct(_product: EtfInfo) {
  //   _product.added = false;
  //   this.infoService.removeProduct(_product.isin);
  // }
}


