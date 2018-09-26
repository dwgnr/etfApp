import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, ETFStore } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/user/`);
  }

  getById(public_id: string) {
    return this.http.get(`${environment.apiUrl}/user/` + public_id);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/user/create/`, user);
  }

  update(user: User) {
    return this.http.put(`${environment.apiUrl}/user/` + user.public_id, user);
  }

  delete(public_id: string) {
    return this.http.delete(`${environment.apiUrl}/user/` + public_id);
  }

  // Endpoints for User specific ETF Store
  getAllStoredETF(public_id: string) {
    return this.http.get<ETFStore[]>(`${environment.apiUrl}/userstore/` + public_id);
  }

  deleteETF(public_id: string, isin: string) {
    return this.http.delete(`${environment.apiUrl}/userstore/` + public_id + '/' + isin);
  }

  storeETF(data: ETFStore) {
    return this.http.post(`${environment.apiUrl}/userstore/`, data);
  }

}
