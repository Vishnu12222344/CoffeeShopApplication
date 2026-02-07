package com.CoffeShopApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CoffeShopApplication {
	public static void main(String[] args) {
		SpringApplication.run(CoffeShopApplication.class, args);
	}
}

