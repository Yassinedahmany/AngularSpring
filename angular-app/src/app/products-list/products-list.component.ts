import { Component } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {ProductModel} from '../models/product.model';
import {ProductService} from '../services/product.service';
import {RouterLink} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    RouterLink,
    NgIf
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  products! : ProductModel[];
  constructor(private productService: ProductService ,public authService : AuthService) {
    productService.productsList().subscribe(p => {
      //console.log(p);
      this.products = p;
    });
    //this.products = productService.productsList();
  }
  deleteProduct(product : ProductModel) {
    let message = confirm("Are you sure you want to delete this product?");
    if(message)
      this.productService.deleteProduct(product.idProduct!).subscribe(()=>{
      this.loadProducts();
      });
  }
  loadProducts(){
    this.productService.productsList().subscribe(p => {
      this.products=p;
    })
  }
}
