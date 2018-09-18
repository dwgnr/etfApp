import { Component, Input } from '@angular/core';
import { Link } from '../../../d3';

@Component({
  selector: '[linkVisual]',
  template: `
    <svg:line
        class="link"
        [attr.x1]="link.source.x"
        [attr.y1]="link.source.y"
        [attr.x2]="link.target.x"
        [attr.y2]="link.target.y"
    ></svg:line>
  `,
  // templateUrl: './link-visual.component.html',
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent {
  @Input('linkVisual') link: Link;

  //TODO:         [attr.stroke-width]="link.value" oben moeglich aber graph geht kaputt. Warum?

}
