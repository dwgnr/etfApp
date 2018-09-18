import { Node } from './';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node | string | number;
  target: Node | string | number;
  value: number;

  constructor(source, target, value) {
    this.source = source;
    this.target = target;
    this.value = value;
  }
}
