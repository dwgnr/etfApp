import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, Router } from '@angular/router';
import { InfoService} from './info.service';
import {InfoState} from '../models/etfinfo.model';
import {Subscription} from '../../../node_modules/rxjs/Subscription';

@Injectable({
  providedIn: 'root'
})
export class LoadguardService implements CanLoad {

  constructor(private infoService: InfoService, private router: Router) { }
  private subscription: Subscription;
  loaded = false;
  canLoad(route: Route): boolean {
    console.log('Loadguard: Loaded is currently:' + this.loaded);

    // this.subscription = this
    //   .infoService
    //   .AllInfoState
    //   .subscribe((state: InfoState) => {
    //     this.loaded = state.loaded;
    //     console.log('Loadguard: Subscription is ' + state.loaded);
    //   });
    this.loaded = this.infoService.isLoaded;
    if (this.loaded) {
      console.log('Loadguard: Loaded is now true');
      return true;
    } else {
      return false;
    }

  }
}

