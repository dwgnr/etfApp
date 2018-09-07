import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartitemComponent } from '../cartitem/cartitem.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  declarations: [
    CartitemComponent,
  ],
  exports: [
    CartitemComponent,
  ],
  providers: []
})
export class CartItemModule {}
