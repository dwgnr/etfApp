import {Component, OnDestroy, OnInit} from '@angular/core';
import { CartService} from '../services/cart.service';
import { InfoService} from '../services/info.service';
// import { CartItem, CartState } from '../models/cart.model';
import { Observable } from 'rxjs/Observable';
import {EtfInfo, CartState, InfoState} from '../models/etfinfo.model';
import {Subscription} from '../../../node_modules/rxjs/Subscription';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(private infoService: InfoService) { }
  private subscription: Subscription;

  ETFs:  EtfInfo[];
  ngOnInit() {
    // this.infoService.getETFInfos().subscribe(
    //   data => this.ETFs = data, // Bind to view
    //   err => {
    //     // Log errors if any
    //     console.log(err);
    //   });
    // this.infoService.AllInfoState.subscribe(info => this.ETFs = info);
    // console.log('Cart subscribed to ETFs');
    // console.log(this.ETFs);
    //this.handleAllETFInfoSubscription();
  }

  ngOnDestroy() {
   //this.subscription.unsubscribe();
  }

  handleAllETFInfoSubscription() {
    console.log('Cart handles subscription');
    this.subscription = this
      .infoService
      .AllInfoState
      .subscribe((state: InfoState) => {
        this.ETFs = state.products;
      });
    console.log(this.ETFs);
  }

}
