import {Component, OnInit} from '@angular/core';
import {Order} from 'src/app/common/order';
import {OrderService} from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];

  constructor(
    private order: OrderService
  ) {
  }

  ngOnInit(): void {
    this.getOrders();
    console.log(this.orders);
  }

  getOrders() {
    this.order.getOrdersList().subscribe(response => {
        this.orders = response._embedded.orders;
      }
    );
  }

}
