import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ApiService} from '../services/api.service';
import * as topojson from 'topojson';
import * as d3 from 'd3';
import {Mercator} from 'd3-geo/dist/d3-geo';
import {PriceService} from '../services/price.service';
import {BMPerformanceInput, BMPerformanceResponse} from '../models/price.model';
import APP_CONFIG from '../app.config';

@Component({
  selector: 'app-worldmap',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.css']
})
export class WorldmapComponent implements OnInit {

  constructor(private apiService: ApiService, private priceService: PriceService) { }

  width = 800;
  mapRatio = 0.7;
  height = 600;
  isLoading = false;
  w: any;
  performance: BMPerformanceResponse[];
  // colors: [];
  reds = [];
  blues = [];

  sets = [
    {
      name: 'Europa',
      index: 81556228,
      indexName: 'FTSE DEVELOPED EUROPE',
      set: d3.set(['BEL', 'CHE', 'DEU', 'AUT', 'ESP', 'FRA',
        'ATF', 'GBR', 'GGY', 'JEY', 'FLK', 'SGS', 'GRC', 'MLT', 'IRL',
        'ITA', 'LUX', 'NLD', 'AND', 'POL', 'PRT', 'TUR', 'CYP', 'CYN',
        'MON', 'ALD', 'IMN', 'LTU', 'LVA', 'EST', 'BLR', 'UKR', 'MDA',
        'ROU', 'HUN', 'SVK', 'SVN', 'HRV', 'BIH', 'CZE', 'BGR', 'KOS', 'MKD', 'ALB', 'MNE', 'SRB',
        'DNK', 'FRO', 'FIN', 'GRL', 'ISL', 'NOR', 'SWE']),
    },
    {
      name: 'Nordamerika',
      index: 100090693,
      indexName: 'FTSE NORTH AMERICA ALL CAP',
      set: d3.set(['CAN', 'USA'])
    },
    {
      name: 'Lateinamerika',
      index: 153419019,
      indexName: 'MSCI BRAZIL FACTOR MIX A-SERIES (USD) (NETR, UHD)',
      set: d3.set(['ARG', 'BOL', 'BRA', 'CHL', 'COL', 'ECU', 'FLK', 'GUY', 'PRY', 'PER',
        'SUR', 'URY', 'VEN', 'TTO', 'MEX', 'BLZ', 'CRI', 'CUB', 'GTM', 'HND', 'NIC', 'PAN', 'SLV', 'HTI', 'JAM', 'DOM',
        'PRI', 'BHS', 'TCA', 'ATG', 'DMA', 'BRB', 'GRD'])
    },
    {
      name: 'Afrika/Mittlerer Osten',
      index: 33034925,
      indexName: 'MSCI SOUTH AFRICA',
      set: d3.set(['AGO', 'BDI', 'BEN', 'BFA', 'BWA', 'CAF', 'CIV', 'CMR', 'COD', 'COD',
        'COG', 'COM', 'CPV', 'DJI', 'DZA', 'EGY', 'ERI', 'ETH', 'GAB', 'GHA', 'GIN', 'GMB', 'GNB',
        'GNQ', 'KEN', 'LBR', 'LBY', 'LSO', 'MAR', 'MDG', 'MLI', 'MOZ', 'MRT', 'MUS', 'MWI', 'MYT',
        'NAM', 'NER', 'NGA', 'REU', 'RWA', 'ESH', 'SDN', 'SDS', 'SEN', 'SHN', 'SHN', 'SLE', 'SOM',
        'SOL', 'SSD', 'STP', 'STP', 'SWZ', 'SYC', 'TCD', 'TGO', 'TUN', 'TZA', 'TZA', 'UGA', 'ZAF', 'ZMB', 'ZWE',
        'AZE', 'ARE', 'QAT', 'IRN', 'AFG', 'PAK', 'BHR', 'SAU', 'YEM',
        'OMN', 'SYR', 'JOR', 'IRQ', 'KWT', 'ISR', 'LBN', 'PSX', 'PSR', 'GEO', 'ARM', 'BGD', 'LKA'])
    },
    {
      name: 'Australasien',
      index: 153391044,
      indexName: 'MSCI AUSTRALIA FACTOR MIX A-SERIES (USD) (NETR, UHD)',
      set: d3.set(['AUS', 'NZL'])
    },
    {
      name: 'Russland',
      index: 45477165,
      indexName: 'DAXGLOBAL RUSSIA INDEX (NET RETURN) (EUR)',
      set: d3.set(['RUS', 'KAZ', 'UZB', 'TKM', 'KGZ', 'TJK'])
    },
    {
      name: 'Asien',
      index: 16634815,
      indexName: 'DAXGLOBAL ASIA INDEX (NET RETURN) (EUR)',
      set: d3.set(['BTN', 'CHN', 'JPN', 'IDN', 'MNG', 'NPL', 'MMR', 'THA', 'KHM',
        'LAO', 'VNM', 'PRK', 'KOR', 'TWN', 'MYS', 'PNG', 'SLB', 'VUT', 'NCL', 'BRN', 'PHL',
        'TLS', 'HKG', 'FJI', 'GUM', 'PLW', 'FSM', 'MNP', 'KAS', 'IND'])
    }
  ];

  ngOnInit() {
    this.isLoading = true;
    const onvista_ids = [];
    for (let i = 0; i < this.sets.length; i++) {
      onvista_ids.push(this.sets[i].index);
    }
    const input = {date_from: '2017-09-30', date_to: '2018-10-01', benchmark_ids: onvista_ids} as BMPerformanceInput;
      this.priceService.getBenchmarkPerformances(input)
        .subscribe( result => this.performance = result,
        error => console.log('Performancedaten konnten nicht geladen werden!'),
          () => this.buildMap());
  }

  buildMap() {
    this.apiService.getCountriesJSON().subscribe(w => this.w = w,
      error => console.log('Datei konnte nicht geladen werden!'),
      () => this.initWorldMap()
    );
  }

  // resize() {
  //   // adjust things when the window size changes
  //   this.width = document.querySelector('#map').offsetWidth;
  //   // width = width - margin.left - margin.right;
  //   this.height = this.width * this.mapRatio;
  //
  //   // update projection
  //   projection.scale(this.width / 2 / Math.PI)
  //     .translate([(this.width) / 2, this.height * 1.35 / 2])
  //     .precision(.1);
  //   // resize the map container
  //   document.querySelector('svg').setAttribute('width', this.width);
  //   document.querySelector('svg').setAttribute('height', this.height);
  //
  //   // resize the map
  //   svg.selectAll('.regions, .border').attr('d', path);
  // }

  initWorldMap() {
    this.setColors();
    console.log(this.blues);
    console.log(this.reds);

    const projection = d3.geoMercator().scale(this.width / 2 / Math.PI)
      .rotate([-11, 0])
      .translate([(this.width) / 2, this.height * 1.35 / 2])
      .precision(.1);

    const path = d3.geoPath().projection(projection);

    const svg = d3.select('#map')
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');



    // d3.json('countries.json', function (error, w) {
    //   if (error) { throw error; }

      svg.append('path').datum(topojson.merge(this.w, this.w.objects.units.geometries.filter(function (d) {
        return d.id !== 'ATA'; // Sorry Antarctica
      })))
        .attr('class', 'border')
        .attr('d', path);

      for (let i = 0; i < this.sets.length; i++) {
        const perf = this.findPerformance(this.sets[i].index);
        svg.append('path').datum(topojson.merge(this.w, this.w.objects.units.geometries.filter((d) => {
          // console.log(this.sets[i]);
          return this.sets[i].set.has(d.id);
        })))
          .attr('class', 'regions selected')
          .attr('d', path)
          .attr('data-name', this.sets[i].name)
          .attr('index-name', this.sets[i].indexName)
          .attr('index-mean', perf.mean)
          .attr('index-std', perf.std)
          .style('fill', (perf.mean < 0) ? this.findColorById(perf.id, false) : this.findColorById(perf.id, true))
          .on('mouseover', function () {
            const region = d3.select(this);
            document.querySelector('.legend').innerHTML = region.attr('data-name');
            document.querySelector('.index').innerHTML = region.attr('index-name');
            document.querySelector('.mean').innerHTML = region.attr('index-mean');
            document.querySelector('.std').innerHTML = region.attr('index-std');
          }).on('mouseout', function () {
          document.querySelector('.legend').innerHTML = '';
          document.querySelector('.index').innerHTML = '';
          document.querySelector('.mean').innerHTML = '';
          document.querySelector('.std').innerHTML = '';
        });
      }

    // });
    this.isLoading = false;
  }

  findPerformance(id): BMPerformanceResponse {
    for (const index of this.performance) {
      if (index.id === id) {
        return index;
      }
    }
  }

  setColors() {
    for (const index of this.performance) {
      if (index.mean < 0) {
        this.reds.push({'id': index.id, 'mean': index.mean, 'color': ''});
      } else {
        this.blues.push({'id': index.id, 'mean': index.mean, 'color': ''});
      }
    }
    if (this.reds.length > 0) {
      this.reds.sort(this.sortByProperty('mean'));
      for (let i = 0; i < this.reds.length; i++) {
        this.reds[i]['color'] = APP_CONFIG.REDS[i];
        // this.colors.push(this.reds[i]);
      }
    }
    if (this.blues.length > 0) {
      this.blues.sort(this.sortByProperty('mean'));
      for (let i = 0; i < this.blues.length; i++) {
        this.blues[i]['color'] = APP_CONFIG.BLUES[i];
        // this.colors.push(this.blues[i]);
      }
    }
  }

  findColorById(id: number, blues = true): string {
    let filtered = [];
    if (blues) {
      filtered = this.blues.filter((item) => item.id === id );
    } else {
      filtered = this.reds.filter((item) => item.id === id );
    }
    return filtered[0].color;
  }

  sortByProperty = function (property) {
    return function (x, y) {
      return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
  };

}


