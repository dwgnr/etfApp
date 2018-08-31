import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {ClusterComponent} from './cluster/cluster.component';
import {EtfinfoComponent} from './etfinfo/etfinfo.component';
import {EtfdetailComponent} from './etfdetail/etfdetail.component';
import {LoadguardService} from './services/loadguard.service';

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
  }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ LoadguardService ]
})
export class AppRoutingModule {
}
