import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as d3 from 'd3';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit, AfterContentInit {

  constructor(private apiService: ApiService) { }
  svg: any;
  width: any;
  height: any;
  radius: any;
  color: any;
  simulation = d3.forceSimulation();
  graph: any;
  link: any;
  node: any;
  text: any;

  ngOnInit() {

    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.radius = 5;
    this.color = d3.scaleOrdinal(d3.schemeCategory10);


    this.apiService.getJSON().subscribe(d => this.graph = d,
      error => console.log('Datei konnte nicht geladen werden!'),
      () => this.handleJSONResponse()
    );
  }
  handleJSONResponse() {

    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(function(d: { id: string , group: number}) { return d.id; }))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.width / 2, this.height / 1.55))
      .force('x', d3.forceX(20))
      .force('y', d3.forceY(20));


       this.link = this.svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(this.graph.links)
        .enter().append('line')
        .attr('stroke-width', function(d) { return Math.sqrt(d.value); });

       this.node = this.svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(this.graph.nodes)
        .enter().append('circle')
        .attr('r', this.radius)
        .attr('fill', 'red')
        // .attr('fill', function(d) { return this.color(d.group); })
        .call(d3.drag()
          .on('start', this.dragstarted)
          .on('drag', this.dragged)
          .on('end', this.dragended));

      this.text = this.svg.append('g')
        .attr('class', 'labels')
        .attr('id', 'labels')
        .selectAll('text')
        .data(this.graph.nodes)
        .enter().append('text')
        .text(function(d) { return d.id; });

      this.node.append('title')
        .text(function(d) { return d.id; });

    this.simulation
      .nodes(this.graph.nodes)
      .on('tick', this.ticked);

    // this.simulation.force('link').links(this.graph.links);
  }

  ngAfterContentInit() {
    // d3.select('p').style('color', 'red');
  }

  // clicked(event: any) {
  //   d3.select(event.target).append('circle')
  //     .attr('cx', event.x)
  //     .attr('cy', event.y)
  //     .attr('r', () => {
  //       return this.radius;
  //     })
  //     .attr('fill', 'red');
  // }

  ticked() {
    this.link
      .attr('x1', function(d) { return d.source.x; })
      .attr('y1', function(d) { return d.source.y; })
      .attr('x2', function(d) { return d.target.x; })
      .attr('y2', function(d) { return d.target.y; });

    this.node
      .attr('cx', function(d) { return d.x = Math.max(this.radius, Math.min(this.width - this.radius, d.x)); })
      .attr('cy', function(d) { return d.y = Math.max(this.radius, Math.min(this.height - this.radius, d.y)); });

    this.text.attr('dx', function(d) { return d.x = Math.max(this.radius, Math.min(this.width - this.radius, d.x + 5));  })
      .attr('dy', function(d) { return d.y = Math.max(this.radius, Math.min(this.height - this.radius, d.y + 5)); });
  }

  dragstarted(d) {
    if (!d3.event.active) { this.simulation.alphaTarget(0.3).restart(); }
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(d) {
    if (!d3.event.active) { this.simulation.alphaTarget(0); }
    d.fx = null;
    d.fy = null;
  }

}
