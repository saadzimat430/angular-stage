import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  previousCategoryId: number = 1;
  currentCategoryId: number = 2;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 6;
  totalElements: number = 0;

  previousKeyword: string = null;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  showSuccess(name: string) {
    this.toastr.success(name+" was added to cart successfully.", 'Item added to cart', {
      timeOut: 3000,
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    // if we have a different keyword than previous, then set pageNumber to 1
    if (this.previousKeyword != theKeyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = theKeyword;
    //    console.log(`keyword=${theKeyword}, pageNumber=${this.pageNumber}`)


    this.productService.searchProductsPaginate(this.pageNumber - 1, this.pageSize, theKeyword).subscribe(
      this.processResult()
    )
  }

  handleListProducts() {
    // check if "id" param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string and convert it to number using "+"
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      // default is category id 2
      this.currentCategoryId = 2;
    }

    // if we have a different category_id than previous
    // then reset pageNumber to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    // pagenumber -1 because pagination in spring REST is 0 based, means first page has index 0
    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(
      this.processResult()
    );
  }

  processResult() {
    return data => {
      this.products = data._embedded.products;
      // +1 because pagination in Angular is normal, but in Spring REST is 0 based
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product) {
    // console.log(`Adding to cart: ${product}`);

    const cartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);

    this.showSuccess(product.name);
  }

}
