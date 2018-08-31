import { Injectable } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';
import {environment} from '../../environments/environment';
import {PriceResponse} from '../models/price.model';
import {Observable} from 'rxjs/Observable';

const API_URL = environment.apiUrl;


@Injectable()
export class PriceService {

  constructor(private http: HttpClient) {}

  getAllPricesByISIN(isin: string, frequency = 'M'): Observable<PriceResponse[]> {
    console.log('getting prices for ISIN ' + isin);
    if (isin.length > 0) {
      return this.http.get<PriceResponse[]>(API_URL + '/price/' + frequency + '/' + isin);
    }
  }

}
