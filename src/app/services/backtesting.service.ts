import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {BacktestingInput, BacktestingResults, BootstrapInput, BootstrapResults} from '../models/portfolio.model';
import { Observable} from 'rxjs/';

const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class BacktestingService {

  constructor(private http: HttpClient) { }

  public getBacktestingResults(input: BacktestingInput): Observable<BacktestingResults> {
    return this.http.post<BacktestingResults>(API_URL + '/backtesting/', input);
  }

  public getBootstrappedReturns(input: BootstrapInput): Observable<BootstrapResults> {
    return this.http.post<BootstrapResults>(API_URL + '/portfolio/bootstrap', input);
  }

}
