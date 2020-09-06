import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = new Product();
  submitted = false;
  apiUrl: string = "";

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
  }

  newProduct(): void {
    this.submitted = false;
    this.product = new Product();
  }

  save(): void {
    const data = {
      sku: this.product.sku,
      name: this.product.name,
      description: this.product.description,
      unitPrice: this.product.unitPrice,
      // imageUrl: this.product.imageUrl,
      imageUrl: "https://i.ibb.co/614gmmk/file.jpg",
      active: true,
      unitsInStock: this.product.unitsInStock,
      category: "https://murmuring-beach-44839.herokuapp.com/api/product-category/" + this.product.category
    };

    this.productService.createProduct(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  // gotoList() {
  //   this.router.navigate(['/products']);
  // }

}
