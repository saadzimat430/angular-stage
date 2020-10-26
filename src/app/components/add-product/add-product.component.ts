import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/common/product-category';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  product: Product = new Product();
  submitted = false;
  apiUrl: string = "";
  productCategories: ProductCategory[];

  constructor(private productService: ProductService,
    private router: Router, private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }

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
      category: "http://localhost:8080/api/product-category/" + this.product.category
    };

    this.productService.createProduct(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          
        });
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

}
