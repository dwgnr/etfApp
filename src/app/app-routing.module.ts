import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {ClusterComponent} from './cluster/cluster.component';
import {EtfinfoComponent} from './etfinfo/etfinfo.component';
import {EtfdetailComponent} from './etfdetail/etfdetail.component';
import {LoadguardService} from './services/loadguard.service';
import {BlacklittermanComponent} from './blacklitterman/blacklitterman.component';
import {GraphComponent} from './visuals/graph/graph.component';
import {NetworkComponent} from './network/network.component';

declare var $: any;

const routes: Routes = [
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'cluster',
    component: ClusterComponent
  },
  {
    path: 'etfinfo',
    loadChildren: 'app/etfinfo/etfinfo.module#EtfInfoModule',
    canLoad: [ LoadguardService ]
    // component: EtfinfoComponent
  },
  {
    path: 'etfdetail',
    component: EtfdetailComponent
  },
  {
    path: 'blacklitterman',
    component: BlacklittermanComponent
  },
  {
    path: 'network',
    component: NetworkComponent
  }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ LoadguardService ]
})
export class AppRoutingModule {
}
