package com.saintroche.tracking_ms.model;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("orderTracking")
public class OrderTracking implements Serializable {
    @Id
    private Long orderId;
    private String status; 
    private Long lastUpdated;

    public OrderTracking() {}
    
    public OrderTracking(Long orderId, String status, Long lastUpdated) {
        this.orderId = orderId;
        this.status = status;
        this.lastUpdated = lastUpdated;
    }

    // getters and setters
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(Long lastUpdated) { this.lastUpdated = lastUpdated; }
}
