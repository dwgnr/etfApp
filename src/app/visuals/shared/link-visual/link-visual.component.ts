import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../../../d3';
import {ApiService} from '../../../services/api.service';

@Component({
  selector: '[linkVisual]',
  template: `
    <svg:line
        class="link"
        [attr.x1]="link.source['x']"
        [attr.y1]="link.source['y']"
        [attr.x2]="link.target['x']"
        [attr.y2]="link.target['y']"
        [ngStyle]="{ stroke: message.hover==true && (message.id==link.source['id'] || message.id==link.target['id'])
         ? '#ffd740' : 'rgb(222,237,250)' }"
    ></svg:line>
  `,
  // templateUrl: './link-visual.component.html',
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent implements OnInit {
  @Input('linkVisual') link: Link;
  message: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {

    this.apiService.currentMessage.subscribe(message => this.message = message);

  }

}
