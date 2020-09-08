import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/common/product-category';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = new Product();
  submitted = false;
  apiUrl: string = "";
  productCategories: ProductCategory[];

  constructor(private productService: ProductService,
    private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    );
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
      imageUrl: this.product.imageUrl,
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

}
