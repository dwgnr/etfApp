import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, ETFStore } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input()
  currentUser: User;
  users: User[] = [];
  currentETFstore: ETFStore[];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.currentUser = JSON.parse(localStorage['currentUser']);

    // console.log(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      this.loadAllUsers();
      this.loadAllStoredETF();
  }

  deleteUser(public_id: string) {
    this.userService.delete(public_id).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  deleteETF(public_id: string, isin: string) {
    this.userService.deleteETF(public_id, isin).pipe(first()).subscribe(() => {
      this.loadAllStoredETF();
    });
  }

  changeAdminStatus($event, user: User) {
    console.log('Switching admin status for user ' + user.name)
    if (user.admin) {
      user.admin = false;
    } else {
      user.admin = true;
    }

    this.userService.update(user).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  private loadAllUsers() {
    if (this.currentUser.admin) {
      console.log('loading all users');
      this.userService.getAll().pipe(first()).subscribe(users => {
        this.users = users;
      });
    }
  }
  private loadAllStoredETF() {
    this.userService.getAllStoredETF(this.currentUser.public_id).subscribe(etf => this.currentETFstore = etf,
      error => console.log('Error: ', error)
    );
  }
}
