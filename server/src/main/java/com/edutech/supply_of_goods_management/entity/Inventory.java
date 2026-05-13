package com.edutech.supply_of_goods_management.entity;


import javax.persistence.*;

@Entity
@Table(name = "inventories") // do not change the table name ( do not change this line)
public class Inventory {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long wholesalerId;
    private int stockQuantity;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Inventory(Long id, Long wholesalerId, int stockQuantity, Product product) {
        this.id = id;
        this.wholesalerId = wholesalerId;
        this.stockQuantity = stockQuantity;
        this.product = product;
    }

    public Inventory(Long wholesalerId, int stockQuantity, Product product) {
        this.wholesalerId = wholesalerId;
        this.stockQuantity = stockQuantity;
        this.product = product;
    }

    public Inventory(Long wholesalerId, int stockQuantity) {
        this.wholesalerId = wholesalerId;
        this.stockQuantity = stockQuantity;
    }

    public Inventory() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getWholesalerId() {
        return wholesalerId;
    }

    public void setWholesalerId(Long wholesalerId) {
        this.wholesalerId = wholesalerId;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    
    
}