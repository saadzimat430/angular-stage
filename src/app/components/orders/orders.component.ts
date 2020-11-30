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
  status = ['shipped', 'completed', 'cancelled'];
  newStatus: string;

  constructor(
    private order: OrderService
  ) {
    this.getOrders();
  }

  ngOnInit(): void {
    console.log(this.orders);
  }

  updateStatus(id: string): void {
    const data = {
      status: this.newStatus
    };

    this.order.updateOrderStatus(+id, data).subscribe(response =>
      console.log(response.status)
    );
  }

  sendConfirmationEmail(firstName: string, email: string): void {
    const data = {
      firstName: firstName,
      orderStatus: this.newStatus,
      email: email
    }

    this.order.sendConfirmationEmail(data).subscribe(response =>
      console.log(response)
    );

    setTimeout(function(){ window.location.reload(); }, 4000);
  }

  getOrders(): void {
    this.order.getOrdersList().subscribe(response => {
        this.orders = response._embedded.orders;
      }
    );
  }

}

