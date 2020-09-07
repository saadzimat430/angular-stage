import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = new Product();
  submitted = false;
  apiUrl: string = "";
  selectedFiles: FileList;
  currentFile: File;

  constructor(private productService: ProductService,
    private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  newProduct(): void {
    this.submitted = false;
    this.product = new Product();
  }

  upload(): string {
    
  }

  save(): void {
    this.currentFile = this.selectedFiles.item(0);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + environment.apiKey });
    headers.append('Content-Type', 'multipart/form-data');
    let formdata: FormData = new FormData();
    formdata.append('file', this.currentFile);
    const req = new HttpRequest('POST', 'https://murmuring-beach-44839.herokuapp.com/api/upload/', formdata, {
      reportProgress: true,
      headers: headers,
      responseType: 'text'
    });

    const data = {
      sku: this.product.sku,
      name: this.product.name,
      description: this.product.description,
      unitPrice: this.product.unitPrice,
      imageUrl: this.http.request(req).subscribe(
        (data) => {data}, 
        (err)=>console.log(err),
      ),
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
