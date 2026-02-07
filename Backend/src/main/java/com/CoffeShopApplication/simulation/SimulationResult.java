package com.CoffeShopApplication.simulation;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SimulationResult {

    private int testCaseNumber;
    private double averageWaitTime;
    private double abandonmentRate;
    private double slaComplianceRate;
    private double workloadVariance;
    private double totalRevenue;
    private String strategy;
}
