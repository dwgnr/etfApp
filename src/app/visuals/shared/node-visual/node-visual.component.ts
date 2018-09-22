import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../../../d3';
import {ApiService} from '../../../services/api.service';
@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
          class="node"
          id="{{node.id}}"
          [attr.fill]="node.color"
          cx="0"
          cy="0"
          [attr.r]="node.r"
          (mouseover)="onNodeHoverIn($event)"
          (mouseleave)="onNodeHoverOut($event)"
          [ngStyle]="{ stroke: hover==true  ? '#ffd740' : 'white' }"
      >
      </svg:circle>
      <svg:text
          class="node-name"
          [attr.font-size]="node.fontSize">
        {{node.name}}
      </svg:text>
    </svg:g>
  `,
  // templateUrl: './node-visual.component.html',
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent implements OnInit {
  @Input('nodeVisual') node: Node;
  message: any;
  hover = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Subscription to message sent by this component when we hover over nodes
    this.apiService.currentMessage.subscribe(message => this.message = message);
  }

  onNodeHoverIn() {
    this.hover = true;
    let isETFProvider = false;
    if (this.node.group.includes(4)) {
      isETFProvider = true;
    }
    const newMessage = {
      'id': this.node.id,
      'name': this.node.name,
      'linkCount': this.node.linkCount,
      'swapCount': this.node.swapCount,
      'secManagerCount': this.node.secManagerCount,
      'lendingCount': this.node.lendingCount,
      'isETFProvider': isETFProvider,
      'hover': this.hover
    };
    this.apiService.changeMessage(newMessage);
  }

  onNodeHoverOut() {
    this.hover = false;
    let isETFProvider = false;
    if (this.node.group.includes(4)) {
      isETFProvider = true;
    }
    const newMessage = {
      'id': this.node.id,
      'name': this.node.name,
      'linkCount': this.node.linkCount,
      'swapCount': this.node.swapCount,
      'secManagerCount': this.node.secManagerCount,
      'lendingCount': this.node.lendingCount,
      'isETFProvider': isETFProvider,
      'hover': this.hover
    };
    this.apiService.changeMessage(newMessage);
  }

}
