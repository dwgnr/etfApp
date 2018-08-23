import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CartState, EtfInfo} from '../models/etfinfo.model';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpclient: HttpClient) {}
  private cartSubject = new Subject<CartState>();
  ETFs: EtfInfo[] = [];
  CartState = this.cartSubject.asObservable();

  addProduct(_product: any) {
    console.log('added to cart service');
    this.ETFs.push(_product);
    this.cartSubject.next(<CartState>{loaded: true, products:  this.ETFs});
  }

  removeProduct(id: string) {
    console.log('removed from cart service');
    this.ETFs = this.ETFs.filter((_item) =>  _item.isin !== id );
    this.cartSubject.next(<CartState>{loaded: false , products:  this.ETFs});
  }

  getAllProducts(): Observable <any> {
    return this.httpclient.get(API_URL + '/info/');
    // return this.httpclient.get(API_URL + '/info/').map((res: Response) => res.json())
    //   .catch((error: any) => Observable.throwError('Server error'));
  }


  // getETFInfos(): Observable<EtfInfo[]> {
  //   return this.httpclient.get<EtfInfo[]>(API_URL + '/info/');
  // }
}
