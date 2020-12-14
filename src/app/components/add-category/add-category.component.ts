import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  category: ProductCategory = new ProductCategory();
  submitted = false;

  constructor(private categoryService: ProductService,
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

  }

  newCategory(): void {
    this.submitted = false;
    this.category = new ProductCategory();
  }

  save(): void {

    const data = {
      categoryName: this.category.categoryName
    };

    this.categoryService.createCategory(data)
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
