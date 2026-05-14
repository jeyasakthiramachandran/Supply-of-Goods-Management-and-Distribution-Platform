package com.edutech.supply_of_goods_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.supply_of_goods_management.entity.Inventory;
import com.edutech.supply_of_goods_management.entity.Product;
import com.edutech.supply_of_goods_management.repository.InventoryRepository;
import com.edutech.supply_of_goods_management.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {
    @Autowired
    InventoryRepository inventoryRepository;
    @Autowired
    ProductRepository productRepository;

public Inventory addInventory(Long productId, Inventory inventory) {

    Product product = productRepository.findById(productId)
        .orElseThrow(() -> new RuntimeException("Product not found"));

    // // ✅ Preserve wholesalerId from request
    // if (inventory.getWholesalerId() == null) {
    //     throw new RuntimeException("Wholesaler ID required");
    // }

    inventory.setProduct(product);

    return inventoryRepository.save(inventory);
}


    public Inventory updateInventory(Long id, int stockQuantity){
        Inventory inventory = inventoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Inventory not found"));
        inventory.setStockQuantity(stockQuantity);
        return inventoryRepository.save(inventory);
    }

    public List<Inventory> getAllInventories(Long wholesalerId){
        return inventoryRepository.findByWholesalerId(wholesalerId);
    }
}
