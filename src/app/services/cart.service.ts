import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = (localStorage.getItem('cart-items')==null ? [] : JSON.parse(localStorage.getItem('cart-items')));

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    // check if we already have item in cart
    if (this.cartItems.length > 0) {

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);

    }

    alreadyExistsInCart = (existingCartItem != undefined);

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();
    window.localStorage.setItem('cart-items', JSON.stringify(this.cartItems));

  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    if (this.cartItems != null && []) {
      for (let currentCartItem of this.cartItems) {
        totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
        totalQuantityValue += currentCartItem.quantity;
      }

      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);

      window.localStorage.setItem('cart-items', JSON.stringify(this.cartItems));
    }

  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    const itemIndex = JSON.parse(localStorage.getItem('cart-items')).findIndex(temp => temp.id === cartItem.id);

    if (cartItem.quantity === 0) {
      this.remove(cartItem);
      setTimeout(window.location.reload.bind(window.location), 1000);
    } else {
      this.cartItems[itemIndex].quantity--;
      this.computeCartTotals();
    }

    window.localStorage.setItem('cart-items', JSON.stringify(this.cartItems));
  }

  remove(cartItem: CartItem) {
    // get index of item in array
    // if found, then remove item from array at given index
    const itemIndex = JSON.parse(localStorage.getItem('cart-items')).findIndex(tempCartItem => tempCartItem.id === cartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      window.localStorage.setItem('cart-items', JSON.stringify(this.cartItems));
      this.computeCartTotals();
    }
  }

}
