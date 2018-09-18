import APP_CONFIG from '../../app.config';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: string;
  linkCount = 0;
  group: number;
  name: string;

  constructor(id, linkCount, group, name) {
    this.id = id;
    this.linkCount = linkCount;
    this.name = name;
    this.group = group;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  // Circle radius
  get r() {
    return 5 * this.normal() + 10;
  }

  get fontSize() {
    return (0.4 * this.normal() + 3) + 'px';
  }

  get color() {
    if (this.group === 4) {
      const index = Math.floor(APP_CONFIG.GRAYS.length * this.normal() / 10);
      // console.log(index);
      return APP_CONFIG.GRAYS[index];
    } else {
      const index = Math.floor(APP_CONFIG.BLUES.length * this.normal() / 10);
      // console.log(index);
      return APP_CONFIG.BLUES[index];
    }
  }
}
