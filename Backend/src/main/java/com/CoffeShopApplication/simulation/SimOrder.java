package com.CoffeShopApplication.simulation;

import lombok.Data;

@Data
public class SimOrder {

    private double arrivalTime;
    private double startTime;
    private double completionTime;
    private int prepTime;
    private double price;
    private boolean regularCustomer;
}
