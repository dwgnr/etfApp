import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EtfinfoComponent} from './etfinfo.component';
import { EtfinfoRoutingModule } from './etfinfo.routing';

@NgModule({
  imports: [
    CommonModule,
    EtfinfoRoutingModule,
  ],
  declarations: [
    EtfinfoComponent,
  ]
})
export class EtfInfoModule {}
