import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/';
import { HttpHeaders } from '@angular/common/http';


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
  getHeroes (): Observable<EtfInfo[]> {
    return this.http.get<EtfInfo[]>(API_URL + '/info');
  }

  getJSON (): Observable<any> {
    return this.http.get('/src/app/services/data/data5.json');
  }


}

