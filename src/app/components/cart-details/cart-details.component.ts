import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = (localStorage.getItem('cart-items') == null ? [] : JSON.parse(localStorage.getItem('cart-items')));
  totalPrice = 0;
  totalQuantity = 0;

  constructor(private cartService: CartService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  showInfo(name: string) {
    this.toastr.info(name + ' was removed from the cart successfully ', 'Item removed from cart', {
      timeOut: 1000,
    });
  }

  listCartDetails() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.incrementQuantity(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
    this.showInfo(cartItem.name);
  }

  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
    setTimeout(window.location.reload.bind(window.location), 1000);
    this.showInfo(cartItem.name);
  }

}
