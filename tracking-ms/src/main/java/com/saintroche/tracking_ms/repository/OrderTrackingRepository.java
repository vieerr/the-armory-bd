package com.saintroche.tracking_ms.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.saintroche.tracking_ms.model.OrderTracking;

@Repository
public interface OrderTrackingRepository extends CrudRepository<OrderTracking, Long> {
    // Spring Data Redis will automatically handle basic CRUD
}
