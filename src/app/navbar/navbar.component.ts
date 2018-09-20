import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
// import * as MotionUI from 'motion-ui';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  isLoggedIn = false;

  ngOnInit() {
    $(document).foundation();

    this.authenticationService.isLoggedIn.subscribe(status => this.isLoggedIn = status);

  }

  onLogout() {
    // reset login status
    this.authenticationService.logout();
  }
}
