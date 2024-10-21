import {CategoryModel} from './category.model';

export class ProductModel {
  idProduct?: number;
  nameProduct?: string;
  //productImage: string;
  priceProduct?: number;
  dateCreate?: Date;
  category? : CategoryModel;
}
