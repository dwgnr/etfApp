import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EtfinfoComponent} from './etfinfo.component';
import { EtfinfoRoutingModule } from './etfinfo.routing';
import { CartitemComponent } from '../cartitem/cartitem.component';
import {ValuesPipe} from './values.pipe';

@NgModule({
  imports: [
    CommonModule,
    EtfinfoRoutingModule,
  ],
  declarations: [
    EtfinfoComponent,
    CartitemComponent,
    ValuesPipe,
  ],
  exports: [
    EtfinfoComponent,
    CartitemComponent,
  ],
  providers: []
})
export class EtfInfoModule {}
