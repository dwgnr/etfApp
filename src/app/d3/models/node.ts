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

  public id: number;
  linkCount = 0;
  public group: number[];
  name: string;
  swapCount: number;
  secManagerCount: number;
  lendingCount: number;

  constructor(id, linkCount, group, name, swapCount, secManagerCount, lendingCount) {
    this.id = id;
    this.linkCount = linkCount;
    this.name = name;
    this.group = group;
    this.swapCount = swapCount;
    this.secManagerCount = secManagerCount;
    this.lendingCount = lendingCount;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  // Circle radius
  get r() {
    return 8 * this.normal() + 12;
  }

  get fontSize() {
    return (0.9 * this.normal() + 3) + 'px';
  }

  get color() {
    if (this.group.includes(4)) {
      // Gray for ETF Providers, blue for the rest
      const index = Math.floor(APP_CONFIG.GRAYS.length * this.normal() / 10);
      return APP_CONFIG.GRAYS[index];
    } else {
      const index = Math.floor(APP_CONFIG.BLUES.length * this.normal() / 10);
      return APP_CONFIG.BLUES[index];
    }
  }
}
