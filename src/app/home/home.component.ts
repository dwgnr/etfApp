import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, ETFStore } from '../models/user.model';
import { PriceUpdate } from '../models/price.model';
import { UserService } from '../services/user.service';
import {PriceService} from '../services/price.service';
import {FormControl} from '@angular/forms';
declare var $: any;

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
  updateStatistic: PriceUpdate;
  updateFinished = false;
  updateRequestSent = false;
  isinControl: string;

  constructor(private userService: UserService, private priceService: PriceService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit() {
      $(document).foundation();
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

  updateAllETFPrices() {
    this.updateFinished = false;
    this.updateRequestSent = true;
    this.priceService.updateAll().subscribe(result => this.updateStatistic = result,
      error => console.log('Error: ', error),
      () => { this.updateFinished = true; this.updateRequestSent = false; }
    );
  }

  updateISIN() {
    this.updateFinished = false;
    this.updateRequestSent = true;
    const isin = this.isinControl;
    if (isin) {
      this.priceService.updateSingle(isin).subscribe(result => this.updateStatistic = result,
        error => console.log('Error: ', error),
        () => { this.updateFinished = true; this.updateRequestSent = false; }
      );
    }
  }
}
