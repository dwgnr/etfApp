import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }
  private loginSubject = new BehaviorSubject(false);
  private userSubject = new BehaviorSubject('User');
  isLoggedIn = this.loginSubject.asObservable();
  userName = this.userSubject.asObservable();

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/user/login/`, { name: username, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loginSubject.next(true);
          this.userSubject.next(user.name);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loginSubject.next(false);
  }
}
