import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  showSuccess(name: string) {
    this.toastr.success(name + ' was added to cart successfully.', 'Item added to cart', {
      timeOut: 3000,
    });
  }

  handleProductDetails() {
    
    // convert string id to number
    const productId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart() {
    const cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
    this.showSuccess(this.product.name);
  }

}
