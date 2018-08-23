import { Component, OnInit, OnDestroy, Input} from '@angular/core';
// import { CartItem, CartState } from '../models/cart.model';
import {Subscription} from 'rxjs/Subscription';
// import { CartService} from '../services/cart.service';
import { InfoService} from '../services/info.service';
import { EtfInfo, CartState} from '../models/etfinfo.model';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {

  loaded: boolean;
  products: EtfInfo[];
  private subscription: Subscription;
  constructor(private _infoService: InfoService) {}
  ngOnInit() {
    // this.loaderService.show();
    this.subscription = this
      ._infoService
      .CartState
      .subscribe((state: CartState) => {
        this.products = state.products;
        console.log(this.products);
      });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
