package com.saintroche.order_ms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.saintroche.order_ms.models.Order;
import com.saintroche.order_ms.repository.OrderRepository;
// import com.saintroche.tracking_ms.model.OrderTracking;

@Service
public class OrderService {

    private final OrderRepository repository;
    private final RestTemplate restTemplate;

    public OrderService(OrderRepository repository, RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }

    @SuppressWarnings("unchecked")
    public Order createOrder(Order order) {
        order.setStatus("PENDING");
        order.setCreatedAt(System.currentTimeMillis());
        Order saved = repository.save(order);

        // Notify tracking service
        // OrderTracking tracking = new OrderTracking(saved.getId(), "PENDING", System.currentTimeMillis());

        Object tracking = new java.util.HashMap<String, Object>();
        ((java.util.Map<String, Object>) tracking).put("orderId", saved.getId());
        ((java.util.Map<String, Object>) tracking).put("status", "PENDING");
        ((java.util.Map<String, Object>) tracking).put("timestamp", System.currentTimeMillis());

        restTemplate.postForObject("http://localhost:1414/api/tracking", tracking, Object.class);

        return saved;
    }

    public Optional<Order> getOrder(Long orderId) {
        return repository.findById(orderId);
    }

    public List<Order> getOrdersByClient(Long clientId) {
        return repository.findByClientId(clientId);
    }


    @SuppressWarnings("unchecked")
    public Order updateOrder(Order order) {
        Order updated = repository.save(order);

        // Update tracking service

        // OrderTracking tracking = new OrderTracking(updated.getId(), updated.getStatus(), System.currentTimeMillis());
        Object tracking = new java.util.HashMap<String, Object>();
        ((java.util.Map<String, Object>) tracking).put("orderId", updated.getId());
        ((java.util.Map<String, Object>) tracking).put("status", updated.getStatus());
        ((java.util.Map<String, Object>) tracking).put("timestamp", System.currentTimeMillis());

        restTemplate.postForObject("http://localhost:1414/api/tracking", tracking, Object.class);

        return updated;
    }
}
