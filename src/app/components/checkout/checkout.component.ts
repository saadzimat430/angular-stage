import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  submitted = false;

  cartItems: CartItem[] = (localStorage.getItem('cart-items') == null ? [] : JSON.parse(localStorage.getItem('cart-items')));

  order: Order = new Order();

  totalPrice: number = 0;
  totalQuantity: number = 0;

  @ViewChild('myModal') modal: ElementRef;

  constructor(private formBuilder: FormBuilder, private cartService: CartService,
    private orderService: OrderService, private renderer: Renderer2) { }

  showModal() {
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
    // setTimeout(window.location.reload.bind('/'), 1000);
  }
  
  closeModal() {
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'none');
  }
  
  listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }

  ngOnInit(): void {

    this.listCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        phoneNumber: ['']
      }),

      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        zipCode: [''],
      })
    });

  }

  save(): void {

    const data = {
      firstName: this.order.firstName,
      lastName: this.order.lastName,
      email: this.order.email,
      phoneNumber: this.order.phoneNumber,
      city: this.order.city,
      street: this.order.street,
      postalCode: this.order.postalCode,
      productsList: this.getCartItems(),
      totalPrice: this.totalPrice,
      status: "pending"
    };

    this.orderService.createOrder(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {

        });
  }

  getCartItems(): string {
    var response = "";
    var ci = JSON.parse(localStorage.getItem('cart-items'));

    for (var i = 0; i < ci.length; i++) {
      if (i !== ci.length - 1) {
        response += ci[i].quantity + "x " + ci[i].name + " ; ";
      } else {
        response += ci[i].quantity + "x " + ci[i].name;
      }
    }

    return response;
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
