import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
// import {InfoService} from '../services/info.service';
import {EtfInfo, InfoState} from '../models/etfinfo.model';
import {InfoService} from '../services/info.service';
import {Subscription} from '../../../node_modules/rxjs/Subscription';

declare var $: any;


@Component({
  selector: 'app-etfinfo',
  templateUrl: './etfinfo.component.html',
  styleUrls: ['./etfinfo.component.css'],
  providers: []
})
export class EtfinfoComponent implements OnInit, AfterViewInit {

  // @Input()
  // product: EtfInfo;

  etfinfos: EtfInfo[];
  selectedETF: EtfInfo;

  constructor(private infoService: InfoService) { }
  private subscription: Subscription;

  ngOnInit() {
    console.log('Init ETFInfo Component');
    // this.getETFInfoList();
    $(document).foundation();
    this.etfinfos = this.infoService.ETFInfos;


    // this.infoService.getETFInfos().subscribe(
    //   data => this.etfinfos = data, // Bind to view
    //   err => {
    //     // Log errors if any
    //     console.log(err);
    //   });
  }

  ngAfterViewInit() {
    //this.handleAllETFInfoSubscription();
    console.log('AfterInit ETFInfo Component');

  }

  handleAllETFInfoSubscription() {
    setTimeout(500);
    console.log('ETF Info handles subscription');
    this.subscription = this
      .infoService
      .AllInfoState
      .subscribe((state: InfoState) => {
        this.etfinfos = state.products;
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


