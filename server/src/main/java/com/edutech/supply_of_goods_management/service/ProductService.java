package com.edutech.supply_of_goods_management.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.supply_of_goods_management.entity.Product;
import com.edutech.supply_of_goods_management.repository.ProductRepository;

import java.util.List;

@Service
public class ProductService {
    @Autowired private ProductRepository productRepository;

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product details) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(details.getName());
        product.setDescription(details.getDescription());
        product.setPrice(details.getPrice());
        product.setStockQuantity(details.getStockQuantity());
        return productRepository.save(product);
    }

    public List<Product> getProductsByManufacturerId(Long manufacturerId) {
        return productRepository.findByManufacturerId(manufacturerId);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
