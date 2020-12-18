import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  submitted: boolean;

  products$ = new Observable<Product[]>();

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router,
    private productService: ProductService) {
    this.products$ = this.getAllProducts();
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

  getAllProducts(): Observable<Product[]> {
    return this.productService.getAllProducts();
  }

  update(p: Product): void {

    let data = {
      sku: p.sku,
      name: p.name,
      description: p.description,
      unitPrice: p.unitPrice,
      imageUrl: p.imageUrl,
      unitsInStock: p.unitsInStock
    };

    Object.keys(data).forEach((key) => (data[key] == "" || data[key] == null) && delete data[key]);

    this.productService.updateProduct(+p.id, data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {

        });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  delete(p: Product): void {
    this.productService.deleteProduct(+p.id).subscribe();

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}
