import { Component, Input, OnInit } from '@angular/core';
// import { CartItem, CartState } from '../models/cart.model';
// import { CartService} from '../services/cart.service';
import { InfoService} from '../services/info.service';
import { EtfInfo, CartState} from '../models/etfinfo.model';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css']
})
export class CartitemComponent {

  @Input()
  public product: EtfInfo;

  constructor(private _infoService: InfoService) {}
  AddProduct(_product: EtfInfo) {
    _product.added = true;
    this._infoService.addProduct(_product);
  }
  RemoveProduct(_product: EtfInfo) {
    _product.added = false;
    this._infoService.removeProduct(_product.isin);
  }

}
