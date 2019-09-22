import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';
import { Observable} from 'rxjs/';
import { HttpHeaders } from '@angular/common/http';


import {EtfInfo, EtfInfoResponse, CartState, InfoState, Region, InfoFilter} from '../models/etfinfo.model';
// import {CartItem, CartState} from '../models/cart.model';
import {Subject} from '../../../node_modules/rxjs/Subject';
import {Portfolio, PortfolioInput} from '../models/portfolio.model';

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
  SearchResult: EtfInfo[] = [];

  CartState = this.cartSubject.asObservable();
  AllInfoState = this.allInfoSubject.asObservable();
  isLoaded = false;

  getETFInfos(page: number): Observable<EtfInfoResponse> {
    return this.http.get<EtfInfoResponse>(API_URL + '/info/' + page);
  }

  getETFInfoByISIN(isin: string): Observable<EtfInfo> {
    return this.http.get<EtfInfo>(API_URL + '/info/' + isin);
  }

  getAllRegions(): Observable<Region> {
    return this.http.get<Region>(API_URL + '/info/regions/');
  }

  initAllETFInfos() {
    this.getETFInfos(1).subscribe(
      data => this.addETFInfos(data), // Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
  }

  addProduct(_product: any) {
    this.ETFShoppingList.push(_product);
    this.cartSubject.next(<CartState>{loaded: true, products:  this.ETFShoppingList});
  }

  addETFInfos(_product: any) {
    this.ETFInfos.push(_product);
    this.allInfoSubject.next(<InfoState>{loaded: true, products:  this.ETFInfos});
    // console.log(this.ETFInfos);
    this.isLoaded = true;
  }

  removeProduct(isin: string) {
    this.ETFShoppingList = this.ETFShoppingList.filter((_item) =>  _item.isin !== isin );
    this.cartSubject.next(<CartState>{loaded: false , products:  this.ETFShoppingList});
  }

  search(query: string) {
    if (query.length > 0) {
      return this.http.get<EtfInfo[]>(API_URL + '/info/search/' + query);
    } else {
      return [];
    }
  }

  public filter(input: InfoFilter, page: number): Observable<EtfInfoResponse> {
    return this.http.post<EtfInfoResponse>(API_URL + '/info/filter/' + page, input);
  }

  // getAllProducts(): Observable <any> {
  //   return this.http.get(API_URL + '/info/');
  // }
}




