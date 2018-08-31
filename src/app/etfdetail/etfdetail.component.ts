import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etfdetail',
  templateUrl: './etfdetail.component.html',
  styleUrls: ['./etfdetail.component.css']
})
export class EtfdetailComponent implements OnInit {

  constructor() { }

  columnDefs = [
    {headerName: 'Make', field: 'make' },
    {headerName: 'Model', field: 'model' },
    {headerName: 'PriceResponse', field: 'price'}
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  ngOnInit() {
  }

}
