import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
// import * as MotionUI from 'motion-ui';

declare var $: any;

@Component({
  selector: 'app-navbar',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0.0,
      })),
      transition('open => closed', [
        animate('500ms ease-out')
      ]),
      transition('closed => open', [
        animate('500ms ease-in')
      ]),
    ]),
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  isLoggedIn = false;
  isOpen = false;
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
  toggleAnimation() {
    this.isOpen = !this.isOpen;
    console.log('isOpen is now: ' + this.isOpen);
  }
}
