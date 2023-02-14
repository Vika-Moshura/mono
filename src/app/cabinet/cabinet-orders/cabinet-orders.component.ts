import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/IOrder';

@Component({
  selector: 'app-cabinet-orders',
  templateUrl: './cabinet-orders.component.html',
  styleUrls: ['./cabinet-orders.component.scss']
})
export class CabinetOrdersComponent implements OnInit {
  public userOrders!:IOrder[];
  constructor() { }

  ngOnInit(): void {
  }

}
