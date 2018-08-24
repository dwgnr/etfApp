import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtfinfoComponent} from './etfinfo.component';

const routes: Routes = [
  { path: '', component: EtfinfoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EtfinfoRoutingModule {}
