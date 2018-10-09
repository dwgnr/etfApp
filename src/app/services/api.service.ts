import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/';


import { EtfInfo } from '../models/etfinfo.model';

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  getJSON (): Observable<any> {
    return this.http.get('/src/app/services/data/data11.json');
  }

  getCountriesJSON (): Observable<any> {
    return this.http.get('/src/app/services/data/countries.json');
  }

  changeMessage(message: any) {
    this.messageSource.next(message);
  }


}

