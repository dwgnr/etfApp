import { Component, OnInit, Input } from '@angular/core';
import APP_CONFIG from '../app.config';
import { Node, Link } from '../d3';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  nodes: Node[] = [];
  links: Link[] = [];
  graphData: any;

  @Input()
  public graphInitialized = false;

  constructor(private apiService: ApiService) {
  }
  ngOnInit() {

    this.apiService.getJSON().subscribe(d => this.graphData = d,
      error => console.log('Datei konnte nicht geladen werden!'),
      () => this.initGraph()
    );

    // const N = APP_CONFIG.N,
    //   getIndex = number => number - 1;
    //
    // /** constructing the nodes array */
    // for (let i = 1; i <= N; i++) {
    //   this.nodes.push(new Node(i, 0, 1, 'test'));
    // }
    //
    // for (let i = 1; i <= N; i++) {
    //   for (let m = 2; i * m <= N; m++) {
    //     /** increasing connections toll on connecting nodes */
    //     this.nodes[getIndex(i)].linkCount++;
    //     this.nodes[getIndex(i * m)].linkCount++;
    //
    //     /** connecting the nodes before starting the simulation */
    //     this.links.push(new Link(i, i * m, 'testSource', 'testTarget', 1));
    //   }
    // }
    // this.graphInitialized = true;
    // console.log('Pushed: ' + JSON.stringify(this.nodes));
    // console.log('');
    // console.log('Pushed Links: ' + JSON.stringify(this.links));
  }

  initGraph() {
    // TODO: JSON file anders aufbauen. Fuer jede Bank eine numerische ID und Linkcount vorab
    // https://medium.com/netscape/visualizing-data-with-angular-and-d3-209dde784aeb
    console.log('Init Graph with ' + this.graphData.nodes.length + ' nodes and '
      + this.graphData.links.length + ' links');
    for (const n of this.graphData.nodes) {
      this.nodes.push(new Node(n.id, n.linkCount, n.group, n.name));
    }

    for (const link of this.graphData.links) {
      this.links.push(new Link(link.source, link.target, link.sourceName, link.targetName, link.value));
    }
    // console.log('INITGRAPH with nodes:');
  // console.log('Nodes: ' + JSON.stringify(this.nodes));
  this.graphInitialized = true;
  }

}
