import { Component } from '@angular/core';
import {ProductModel} from '../models/product.model';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../services/product.service';
import {CategoryModel} from '../models/category.model';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  newProduct: ProductModel = new ProductModel();
  categories! : CategoryModel[];
  newCategory!: CategoryModel;
  newCategoryId!: number;
  constructor(private productService: ProductService ,private router: Router,) {
    productService.categoriesList().subscribe(c => {
      this.categories = c;
    })
    //  this.categories = productService.categoriesList();
  }
  addProduct(){
    this.newProduct.category = this.categories.find(c=>c.idCategory==this.newCategoryId);
    this.productService.addProduct(this.newProduct).subscribe(p=>{
      this.router.navigate(['products-list']);
    })

    //this.newCategory = this.productService.editCategory(this.newCategoryId);
    //this.newProduct.category = this.newCategory;
    //this.productService.addProduct(this.newProduct);
    //this.router.navigate(['products-list']);
  }

}
