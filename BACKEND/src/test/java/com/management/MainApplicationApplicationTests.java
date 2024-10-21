package com.management;

import com.management.entities.Category;
import com.management.entities.Product;
import com.management.repositories.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.List;

@SpringBootTest
class MainApplicationApplicationTests {
	@Autowired
	ProductRepository productRepository;

	@Test
	public void TestCreateProduct(){
		//Product product = new Product("Apple TV", 3000.00, new Date());
		//productRepository.save(product);
	}
	@Test
	public  void TestUpdateProduct(){
		Product product = productRepository.findById(1L).get();
		product.setPriceProduct(2500.00);
		productRepository.save(product);
	}
	@Test
	public void TestFindProductById(){
		Product product = productRepository.findById(1L).get();
		System.out.println(product);
	}
	@Test
	public void TestFindAllProducts(){
		List<Product> products = productRepository.findAll();
		for (Product p : products){
			System.out.println(p);
		}
		products.forEach(System.out::println);
	}
	@Test
	public void TestDeleteProductById(){
		productRepository.deleteById(1L);
	}
	@Test
	public void TestDeleteAllProducts(){
		productRepository.deleteAll();
	}

	@Test
	public void TestFindAllProductsByPrice(){
		List<Product> products = productRepository.findAllProductsByPrice(5000.00);
		products.forEach(System.out::println);
	}
	@Test
	public void TestFindAllProductsByNamePrice(){
		List<Product> products = productRepository.findAllProductsByNamePrice("TV", 5000.00);
		products.forEach(System.out::println);
	}
	@Test
	public void TestFindAllProductsByCategory(){
		Category category = new Category();
		category.setIdCategory(2L);
		List<Product> products = productRepository.findAllProductsByCategory(category);
		products.forEach(System.out::println);
	}
	@Test
	public void TestFindAllProductsByNameSort(){
		List<Product> products = productRepository.findAllProductsByNameSort();
		products.forEach(System.out::println);
	}

}
