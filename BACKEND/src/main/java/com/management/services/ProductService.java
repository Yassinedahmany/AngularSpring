package com.management.services;

import com.management.entities.Category;
import com.management.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService
{
    Product saveProduct(Product product);
    Product updateProduct(Product product);
    Product getProductById(Long id);
    List<Product> getAllProducts();
    void deleteProductById(Long id);
    void deleteAllProducts();

    List<Product> findAllProductsByPrice(double priceProduct);
    List<Product> findAllProductsByNamePrice(@Param("nameProduct") String nameProduct , @Param("priceProduct") double priceProduct);
    List<Product> findAllProductsByCategory(Category category);

    List<Product> findAllProductsByIdCategory(Long idCategory);
    List<Product> findAllProductsByNameSort();

    Page<Product> getAllProductsByPage(int page, int size);

}
