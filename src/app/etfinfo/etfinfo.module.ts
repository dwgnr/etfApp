import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EtfinfoComponent} from './etfinfo.component';
import { EtfinfoRoutingModule } from './etfinfo.routing';
import {ValuesPipe} from './values.pipe';

@NgModule({
  imports: [
    CommonModule,
    EtfinfoRoutingModule,
  ],
  declarations: [
    EtfinfoComponent,
    ValuesPipe,
  ],
  providers: [ValuesPipe]
})
export class EtfInfoModule {}
