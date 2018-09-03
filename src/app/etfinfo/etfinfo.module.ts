import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EtfinfoComponent} from './etfinfo.component';
import { EtfinfoRoutingModule } from './etfinfo.routing';
import { CartitemComponent } from '../cartitem/cartitem.component';
import {ValuesPipe} from './values.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  imports: [
    CommonModule,
    EtfinfoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
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
