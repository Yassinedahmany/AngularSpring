import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {apiURL} from '../app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: ProductModel[] = [];
  product!: ProductModel;
  categories!: CategoryModel[];
  category!: CategoryModel;

  constructor(private http: HttpClient) {
    this.categories = [];
    this.products = [];
  }

  // Get list of products
  productsList() {
    return this.http.get<ProductModel[]>(`${apiURL}/products`, httpOptions);
  }

  // Add a new product
  addProduct(product: ProductModel) {
    return this.http.post<ProductModel>(`${apiURL}/products/save`, product, httpOptions);
  }

  // Delete a product
  deleteProduct(id: number) {
    return this.http.delete(`${apiURL}/products/${id}`);
  }

  // Edit a product
  editProduct(id: number) {
    return this.http.get<ProductModel>(`${apiURL}/products/${id}`); // Added a slash before id
  }

  // Update an existing product
  updateProduct(product: ProductModel) {
    return this.http.put<ProductModel>(`${apiURL}/products/update`, product, httpOptions); // Changed to PUT
  }

  // Sort products by idProduct
  sortProduct() {
    this.products.sort((x, y) => (x.idProduct! > y.idProduct! ? 1 : -1));
  }

  // Get list of categories
  categoriesList() {
    return this.http.get<CategoryModel[]>(`${apiURL}/categories`, httpOptions);
  }

  // Edit a category
  editCategory(id: number) {
    this.category = this.categories.find(c => c.idCategory === id)!;
    return this.category;
  }
}
