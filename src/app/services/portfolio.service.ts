import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';
import { Observable} from 'rxjs/';
import { Portfolio, PortfolioInput } from '../models/portfolio.model';
import {HttpHeaders} from '../../../node_modules/@angular/common/http';

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class PortfolioService {

  constructor(
    private http: HttpClient
  ) {
  }

  // getETFPortfolios(num_portfolios, date_from, date_to, etfs, price): Observable<Portfolio[]> {
  //   return this.http.get<Portfolio[]>(API_URL + '/info');
  // }


  public getETFPortfolios(input: PortfolioInput): Observable<Portfolio[]> {
    console.log('Portfolio Service called');
    return this.http
      .post<Portfolio[]>(API_URL + '/portfolio/', input);
  }

}
