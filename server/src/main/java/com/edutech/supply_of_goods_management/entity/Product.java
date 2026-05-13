package com.edutech.supply_of_goods_management.entity;


// import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;
@Entity
@Table(name = "products") // do not change table name ( do not change this line)
public class Product {
    
  @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long manufacturerId;
    private String name;
    private String description;
    private double price;
    private int stockQuantity;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<Order> orders;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<Inventory> inventories;

    public Product(Long id, Long manufacturerId, String name, String description, double price, int stockQuantity,
            List<Order> orders, List<Inventory> inventories) {
        this.id = id;
        this.manufacturerId = manufacturerId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.orders = orders;
        this.inventories = inventories;
    }

    public Product(Long manufacturerId, String name, String description, double price, int stockQuantity,
            List<Order> orders, List<Inventory> inventories) {
        this.manufacturerId = manufacturerId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.orders = orders;
        this.inventories = inventories;
    }

    public Product(Long manufacturerId, String name, String description, double price, int stockQuantity,
            List<Order> orders) {
        this.manufacturerId = manufacturerId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.orders = orders;
    }

    public Product() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getManufacturerId() {
        return manufacturerId;
    }

    public void setManufacturerId(Long manufacturerId) {
        this.manufacturerId = manufacturerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public List<Inventory> getInventories() {
        return inventories;
    }

    public void setInventories(List<Inventory> inventories) {
        this.inventories = inventories;
    }

    

    

}
