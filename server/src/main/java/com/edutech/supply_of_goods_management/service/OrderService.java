package com.edutech.supply_of_goods_management.service;



import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.supply_of_goods_management.entity.Order;
import com.edutech.supply_of_goods_management.entity.Product;
import com.edutech.supply_of_goods_management.entity.User;
import com.edutech.supply_of_goods_management.repository.OrderRepository;
import com.edutech.supply_of_goods_management.repository.ProductRepository;
import com.edutech.supply_of_goods_management.repository.UserRepository;

import java.util.List;
import java.util.Optional;
@Service
public class OrderService {
    @Autowired OrderRepository orderRepository;
    @Autowired UserRepository userRepository;
    @Autowired ProductRepository productRepository;

    public Order placeOrder(Long productId, Long userId, Order order){
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        order.setProduct(product);
        order.setUser(user);
        return orderRepository.save(order);
    }

    public Order updateOrder(Long id, String status){
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders(Long userId){
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getOrderById(Long id){
        return orderRepository.findByProductId(id);
    }

}
