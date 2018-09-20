import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/user.model';
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

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.currentUser = JSON.parse(localStorage['currentUser']);

    // console.log(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  deleteUser(public_id: string) {
    this.userService.delete(public_id).pipe(first()).subscribe(() => {
      this.loadAllUsers();
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
}
