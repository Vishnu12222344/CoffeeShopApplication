package com.CoffeShopApplication.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private DrinkType drinkType;

    private LocalDateTime arrivalTime;

    private boolean regularCustomer;

    private double priorityScore;
    private int skipCount;


    private String status; // WAITING, ASSIGNED, COMPLETED
}

