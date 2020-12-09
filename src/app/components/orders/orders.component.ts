import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  status = ['shipped', 'completed', 'cancelled'];
  newStatus: string;

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;

  constructor(
    private order: OrderService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {
    this.getOrders();
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    } else {
      this.router.navigateByUrl('/login');
    }
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

    setTimeout(function () { window.location.reload(); }, 4000);
  }

  getOrders(): void {
    this.order.getOrdersList().subscribe(response => {
      this.orders = response._embedded.orders;
    }
    );
  }

}

