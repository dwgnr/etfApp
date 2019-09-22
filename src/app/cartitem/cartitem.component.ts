import { Component, Input, OnInit } from '@angular/core';
// import { CartItem, CartState } from '../models/cart.model';
// import { CartService} from '../services/cart.service';
import { InfoService} from '../services/info.service';
import { EtfInfo, CartState } from '../models/etfinfo.model';
import { UserService } from '../services/user.service';
import { User, ETFStore } from '../models/user.model';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css']
})
export class CartitemComponent implements OnInit {

  @Input()
  public product: EtfInfo;
  isLoggedIn = false;
  currentUser: User;
  currentETFstore: ETFStore[];
  btnDisabled = true;

  constructor(private _infoService: InfoService,
              private userService: UserService,
              private authenticationService: AuthenticationService) {}
  ngOnInit() {
    this.authenticationService.isLoggedIn.subscribe(status => this.onLoggedInStatusChange(status));
  }
  AddProduct(_product: EtfInfo) {
    _product.added = true;
    this._infoService.addProduct(_product);
  }
  RemoveProduct(_product: EtfInfo) {
    _product.added = false;
    this._infoService.removeProduct(_product.isin);
  }
  storeProduct(product: EtfInfo) {

    // this.loadAllStoredETF(product.isin);

    const data = {public_id: this.currentUser.public_id, isin: product.isin, name: product.name} as ETFStore;
    this.userService.storeETF(data).pipe(first()).subscribe(() => {
      this.btnDisabled = true;
    });
  }

  private onLoggedInStatusChange(status: boolean) {
    this.isLoggedIn = status;
    if (status) {
      if (!this.currentUser) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.loadAllStoredETF();
      }
    }
  }

  private loadAllStoredETF() {
    this.userService.getAllStoredETF(this.currentUser.public_id).subscribe(etf => this.currentETFstore = etf,
      error => console.log('Error: ', error),
      () => this.compareProductToList()
    );
  }

  private compareProductToList() {
    let found = false;
    for (const etf of this.currentETFstore) {
      if (this.product.isin === etf.isin) {
        // this.btnDisabled = true;
        found = true;
      }
    }
    if (!found) {
      this.btnDisabled = false;
    }
  }
}
