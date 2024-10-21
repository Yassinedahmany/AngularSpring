import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf } from '@angular/common';
import { CategoryModel } from '../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgForOf
  ],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'] // fixed typo: should be 'styleUrls' instead of 'styleUrl'
})
export class EditProductComponent implements OnInit {
  currentProduct: ProductModel = new ProductModel();
  categories: CategoryModel[] = [];
  newCategory!: CategoryModel;
  newCategoryId!: number;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Load categories
    this.productService.categoriesList().subscribe(c => {
      this.categories = c;
    });

    this.productService.editProduct(this.activatedRoute.snapshot.params['id']).subscribe(p=>{
      this.currentProduct = p;
      this.newCategoryId = this.currentProduct.category?.idCategory!;
    });

    // Load the current product
    //this.currentProduct = this.productService.editProduct(this.activatedRoute.snapshot.params['id']);
    //this.newCategoryId = this.currentProduct.category?.idCategory!;
  }

  updateProduct() {
    this.currentProduct.category = this.categories.find(c=>c.idCategory==this.newCategoryId);
    this.productService.updateProduct(this.currentProduct).subscribe(p=>{
      this.router.navigate(['products-list']);
    })

    //this.newCategory = this.productService.editCategory(this.newCategoryId);
    //this.currentProduct.category = this.newCategory;
    //this.productService.updateProduct(this.currentProduct);
    //this.router.navigate(['products-list']);
  }
}
