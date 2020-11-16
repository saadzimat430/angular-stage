import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any;

  constructor(
    private order: OrderService
  ) {
    this.getOrders();
    console.log(this.orders);
  }

  getOrders() {
    this.order.getOrdersList().subscribe((data) => {
      this.orders = data;
    })
  }

  ngOnInit(): void {
  }

}
