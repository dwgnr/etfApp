import { Component, Input, ChangeDetectorRef, HostListener,
  ChangeDetectionStrategy, OnInit, OnChanges, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {D3Service, ForceDirectedGraph, Link, Node} from '../../d3';
import {NetworkComponent} from '../../network/network.component';
import * as d3 from 'd3';

declare var $: any;

@Component({
  selector: 'app-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // template: `
  //   <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
  //     <g [zoomableOf]="svg">
  //       <g [linkVisual]="link" *ngFor="let link of links"></g>
  //       <g [nodeVisual]="node" *ngFor="let node of nodes"
  //           [draggableNode]="node" [draggableInGraph]="graph"></g>
  //     </g>
  //   </svg>
  // `,
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit, OnChanges {
  @Input('nodes') nodes;
  @Input('links') links;
  @Input() graphFilterSelection: number;
  graph: ForceDirectedGraph;
  allInitialNodes: Node[];
  allInitialLinks: Link[];

  message = 'Nothing';
  @Output() messageEvent = new EventEmitter<string>();

  public _options: { width, height } = { width: 800, height: 600 };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }


  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
      this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
      this.allInitialNodes = this.nodes;
      this.allInitialLinks = this.links;

    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngOnChanges() {
    if (this.allInitialNodes) {
      if (this.graphFilterSelection && Number(this.graphFilterSelection) >= 0) {
        this.filterNodes(Number(this.graphFilterSelection));
      }
    }
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  filterNodes(selectedGroup: number) {
    const filteredNodes: Node[] = [];

    // Handle Case when all nodes are chosen
    if (selectedGroup === 99) {
      this.nodes = this.allInitialNodes;
      this.updateLinks(this.allInitialNodes);
      return;

    } else {
      for (let i = 0; i < this.allInitialNodes.length; i++) {
        const nodeGroups = this.allInitialNodes[i].group;
        for (let j = 0; j < nodeGroups.length; j++) {
          if (nodeGroups[j] === selectedGroup || this.allInitialNodes[i].group[j] === 4) {
            filteredNodes.push(this.allInitialNodes[i]);
          }
        }
      }
    }
    this.updateLinks(filteredNodes);
    this.nodes = filteredNodes;
  }
  updateLinks(nodes: Node[]) {
    const updatedLinks: Link[] = [];
    const links = this.allInitialLinks;

    for (let i = 0; i < links.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        // console.log('Comparing: ' + nodes[j].id + ' with ' + JSON.stringify(links[i].source));
        if (nodes[j].id === links[i].source['id']) {
          const checkTarget = links[i].target['id'];
          for (let k = 0; k < nodes.length; k++) {
            if (checkTarget === nodes[k].id) {
              updatedLinks.push(links[i]);
            }
          }
        }
      }
    }
    this.links = updatedLinks;
  }

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}
