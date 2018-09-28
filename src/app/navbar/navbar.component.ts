import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
// import * as MotionUI from 'motion-ui';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  isLoggedIn = false;
  returnUrl: string;

  ngOnInit() {
    $(document).foundation();

    this.authenticationService.isLoggedIn.subscribe(status => this.isLoggedIn = status);

  }

  onLogout() {

    this.returnUrl = this.router.url || '/';
    if (this.returnUrl === '/home') {
      this.returnUrl = '/';
    }

    // reset login status
    this.authenticationService.logout();
    this.router.navigate([this.returnUrl]);

  }
}
