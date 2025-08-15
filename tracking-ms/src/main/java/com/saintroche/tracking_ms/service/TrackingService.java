package com.saintroche.tracking_ms.service;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.saintroche.tracking_ms.model.OrderTracking;
import com.saintroche.tracking_ms.repository.OrderTrackingRepository;

@Service
public class TrackingService {

    private final OrderTrackingRepository repository;

    public TrackingService(OrderTrackingRepository repository) {
        this.repository = repository;
    }

    public OrderTracking saveOrUpdate(OrderTracking tracking) {
        return repository.save(tracking);
    }

    public Optional<OrderTracking> getByOrderId(Long orderId) {
        return repository.findById(orderId);
    }

    public void deleteByOrderId(Long orderId) {
        repository.deleteById(orderId);
    }
}
