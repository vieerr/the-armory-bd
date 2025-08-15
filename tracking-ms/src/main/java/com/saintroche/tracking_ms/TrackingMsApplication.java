package com.saintroche.tracking_ms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@SpringBootApplication
@EnableRedisRepositories(basePackages = "com.saintroche.tracking_ms.repository")
public class TrackingMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrackingMsApplication.class, args);
	}

}
