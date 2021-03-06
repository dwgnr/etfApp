import {Component, OnInit} from '@angular/core';
import {EtfInfo} from './models/etfinfo.model';
import {InfoService} from './services/info.service';
import { Title } from '@angular/platform-browser';


declare var $: any;
declare var moment: any;
// https://stackoverflow.com/questions/45106174/how-do-i-get-zurb-foundation-6-4-1-to-work-with-angular-4
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private infoService: InfoService, private title: Title) {}

  etfinfos:  EtfInfo[];

  public ngOnInit() {
    moment.locale('de');
    $(document).foundation();
    // this.title.setTitle('PortfolioApp');
    // this.infoService.initAllETFInfos();
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
