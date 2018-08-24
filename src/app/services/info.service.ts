import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';
import { Observable} from 'rxjs/';
import { HttpHeaders } from '@angular/common/http';


import {EtfInfo, CartState, InfoState} from '../models/etfinfo.model';
// import {CartItem, CartState} from '../models/cart.model';
import {Subject} from '../../../node_modules/rxjs/Subject';

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class InfoService {

  constructor(private http: HttpClient) {  }
  private cartSubject = new Subject<CartState>();
  private allInfoSubject = new Subject<InfoState>();
  ETFShoppingList: EtfInfo[] = [];
  ETFInfos: EtfInfo[] = [];
  CartState = this.cartSubject.asObservable();
  AllInfoState = this.allInfoSubject.asObservable();
  isLoaded = false;

  getETFInfos(): Observable<EtfInfo[]> {
    return this.http.get<EtfInfo[]>(API_URL + '/info/');
  }
  initAllETFInfos() {
    console.log('Initializing all ETF Infos');
    this.getETFInfos().subscribe(
      data => this.addETFInfos(data), // Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
    console.log('Done initializing all ETF Infos');
    // console.log(this.ETFInfos);
  }

  addProduct(_product: any) {
    console.log('added to cart');
    this.ETFShoppingList.push(_product);
    this.cartSubject.next(<CartState>{loaded: true, products:  this.ETFShoppingList});
  }

  addETFInfos(_product: any) {
    console.log('added ETFINFO to info service');
    this.ETFInfos.push(_product);
    this.allInfoSubject.next(<InfoState>{loaded: true, products:  this.ETFInfos});
    console.log(this.ETFInfos);
    this.isLoaded = true;
  }

  removeProduct(isin: string) {
    console.log('removed from cart');
    this.ETFShoppingList = this.ETFShoppingList.filter((_item) =>  _item.isin !== isin );
    this.cartSubject.next(<CartState>{loaded: false , products:  this.ETFShoppingList});
  }

  // getAllProducts(): Observable <any> {
  //   return this.http.get(API_URL + '/info/');
  // }
}




