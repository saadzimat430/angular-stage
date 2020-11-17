import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CartService} from 'src/app/services/cart.service';
import {CartItem} from 'src/app/common/cart-item';
import {Order} from 'src/app/common/order';
import {OrderService} from 'src/app/services/order.service';
import {ValidationService} from 'src/app/services/validation.service';
import {Router} from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  submitted: boolean;

  cartItems: CartItem[] = (localStorage.getItem('cart-items') == null ? [] : JSON.parse(localStorage.getItem('cart-items')));

  order: Order = new Order();

  totalPrice = 0;
  totalQuantity = 0;

  constructor(private formBuilder: FormBuilder, private cartService: CartService,
              private orderService: OrderService, private fb: FormBuilder,
              private validator: ValidationService,
              private router: Router) {
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
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        phoneNumber: ['', Validators.compose([Validators.required, this.validator.phoneValidator()])]
      }),

      shippingAddress: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.compose([Validators.required, this.validator.zipValidator()])],
      })
    });

  }

  save(): void {
    const customer = this.checkoutFormGroup.value.customer;
    const shippingAddress = this.checkoutFormGroup.value.shippingAddress;

    const data = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      city: shippingAddress.city,
      street: shippingAddress.street,
      postalCode: shippingAddress.zipCode,
      productsList: this.getCartItems(),
      totalPrice: this.totalPrice,
      status: 'pending'
    };

    if (data.firstName !== '' && data.lastName !== '' && data.email !== '' && data.phoneNumber !== '') {
      this.orderService.createOrder(data)
        .subscribe(
          response => {
            console.log(response);
          });
      this.submitted = true;
    }
  }

  getCartItems(): string {
    let response = '';
    const ci = JSON.parse(localStorage.getItem('cart-items'));

    for (let i = 0; i < ci.length; i++) {
      if (i !== ci.length - 1) {
        response += ci[i].quantity + 'x ' + ci[i].name + ' ; ';
      } else {
        response += ci[i].quantity + 'x ' + ci[i].name;
      }
    }

    return response;
  }

  get formControlCustomer() {
    return this.checkoutFormGroup.controls.customer;
  }

  get formControlShipping() {
    return this.checkoutFormGroup.controls.shippingAddress;
  }

  onSubmit(): void {
    this.save();
    if (this.submitted) {
      this.router.navigateByUrl('/order-successful');
    }
  }

}
