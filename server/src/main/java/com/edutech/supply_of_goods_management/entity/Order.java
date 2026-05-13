package com.edutech.supply_of_goods_management.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders") // do not change the table name ( do not change this line)
public class Order {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;
    private String status;

    @OneToMany(mappedBy = "order")
    @JsonIgnore
    private List<Feedback> feedbacks;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Order(Long id, int quantity, String status, List<Feedback> feedbacks, User user, Product product) {
        this.id = id;
        this.quantity = quantity;
        this.status = status;
        this.feedbacks = feedbacks;
        this.user = user;
        this.product = product;
    }

    public Order(int quantity, String status, List<Feedback> feedbacks, User user, Product product) {
        this.quantity = quantity;
        this.status = status;
        this.feedbacks = feedbacks;
        this.user = user;
        this.product = product;
    }

    public Order(int quantity, String status, List<Feedback> feedbacks, User user) {
        this.quantity = quantity;
        this.status = status;
        this.feedbacks = feedbacks;
        this.user = user;
    }

    public Order() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Feedback> getFeedbacks() {
        return feedbacks;
    }

    public void setFeedbacks(List<Feedback> feedbacks) {
        this.feedbacks = feedbacks;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    
}
