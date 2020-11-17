import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';

import {Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { LoginComponent } from './components/login/login.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { DeleteArticleComponent } from './components/delete-article/delete-article.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {path: 'admin', component: AdminHomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-article', component: AddArticleComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'order-successful', component: OrderSuccessComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    AddProductComponent,
    ArticlesComponent,
    AddArticleComponent,
    AdminHomepageComponent,
    LoginComponent,
    DeleteProductComponent,
    DeleteArticleComponent,
    OrderSuccessComponent,
    OrdersComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
