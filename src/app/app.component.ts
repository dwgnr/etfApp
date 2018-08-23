import {Component, OnInit} from '@angular/core';
import { CartService} from './services/cart.service';
import {EtfInfo} from './models/etfinfo.model';
import {InfoService} from './services/info.service';

declare var $: any;
declare var moment: any;
// https://stackoverflow.com/questions/45106174/how-do-i-get-zurb-foundation-6-4-1-to-work-with-angular-4
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private infoService: InfoService) {}

  etfinfos:  EtfInfo[];

  public ngOnInit() {
    moment.locale('de');
    $(document).foundation();
    this.infoService.initAllETFInfos();
    //console.log(this.infoService.Data);
    // this.getAllETFInfos();
  }

  // getAllETFInfos() {
  //   this.infoService.getETFInfos().subscribe(
  //     data => this.ETFs = data, // Bind to view
  //     err => {
  //       // Log errors if any
  //       console.log(err);
  //     });
  //
  // }
}
