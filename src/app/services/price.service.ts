import { Injectable } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';
import {environment} from '../../environments/environment';
import {PriceResponse, MAResponse, PerformanceResponse, PriceUpdate, TrackingErrorResponse, TrackingErrorInput} from '../models/price.model';
import {Observable} from 'rxjs/Observable';
import {BacktestingInput, BacktestingResults} from '../models/portfolio.model';

const API_URL = environment.apiUrl;


@Injectable()
export class PriceService {

  constructor(private http: HttpClient) {}

  getAllPricesByISIN(isin: string, frequency = 'M'): Observable<PriceResponse[]> {
    // console.log('getting prices for ISIN ' + isin);
    if (isin.length > 0) {
      return this.http.get<PriceResponse[]>(API_URL + '/price/' + frequency + '/' + isin);
    }
  }

  getMovingAverageByISIN(isin: string, frequency = 'M'): Observable<MAResponse[]> {
    // console.log('getting MA/chart data for ISIN ' + isin);
    if (isin.length > 0) {
      return this.http.get<MAResponse[]>(API_URL + '/price/ma/' + frequency + '/' + isin);
    }
  }

  getPerformanceByISIN(isin: string, start_date = '2016-12-31', end_date = '2017-01-01'): Observable<PerformanceResponse> {
    // console.log('getting Performance measures for ISIN ' + isin);
    if (isin.length > 0) {
      return this.http.get<PerformanceResponse>(API_URL + '/price/performance/' +
        start_date + '/' + end_date + '/' + isin);
    }
  }

  updateAll() {
    return this.http.get<PriceUpdate>(API_URL + '/price/update/');
  }
  updateSingle(isin: string) {
    return this.http.get<any>(API_URL + '/price/update/' + isin);
  }

   getTrackingError(input: TrackingErrorInput): Observable<TrackingErrorResponse[]> {
    return this.http.post<TrackingErrorResponse[]>(API_URL + '/price/te/', input);
  }

}
