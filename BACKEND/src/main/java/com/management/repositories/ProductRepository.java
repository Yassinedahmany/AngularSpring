package com.management.repositories;

import com.management.entities.Category;
import com.management.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@RepositoryRestResource(path = "rest")
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select product from Product product where product.priceProduct >?1")
    List<Product> findAllProductsByPrice(double priceProduct);

    @Query("select product from Product product where product.nameProduct like %:nameProduct and product.priceProduct >:priceProduct")
    List<Product> findAllProductsByNamePrice(@Param("nameProduct") String nameProduct , @Param("priceProduct") double priceProduct);

    @Query("select product from Product product where product.category =?1")
    List<Product> findAllProductsByCategory(Category category);

    @Query("select product from Product product order by product.nameProduct")
    List<Product> findAllProductsByNameSort();

    List<Product> findByCategoryIdCategory(Long idCatgory);

}
