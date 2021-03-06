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
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import { AuthGuard } from './guards';
import {WorldmapComponent} from './worldmap/worldmap.component';

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
    // canLoad: [ LoadguardService ]
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
  },
  {
    path: 'worldmap',
    component: WorldmapComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ LoadguardService ]
})
export class AppRoutingModule {
}
