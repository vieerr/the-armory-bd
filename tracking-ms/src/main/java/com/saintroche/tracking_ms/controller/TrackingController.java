package com.saintroche.tracking_ms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saintroche.tracking_ms.model.OrderTracking;
import com.saintroche.tracking_ms.service.TrackingService;
@RestController
@RequestMapping("/api/tracking")
public class TrackingController {

    private final TrackingService trackingService;

    public TrackingController(TrackingService trackingService) {
        this.trackingService = trackingService;
    }

    // Get order status by ID
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderTracking> getOrder(@PathVariable Long orderId) {
        return trackingService.getByOrderId(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update order status
    @PostMapping
    public ResponseEntity<OrderTracking> updateOrder(@RequestBody OrderTracking tracking) {
        System.out.println("Received tracking update: " + tracking);
        return ResponseEntity.ok(trackingService.saveOrUpdate(tracking));
    }
}
