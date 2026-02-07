package com.CoffeShopApplication.simulation;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SimulationSummary {

    private List<SimulationResult> results;
    private double overallAverageWait;
    private double overallAbandonment;
    private double overallSlaCompliance;
    private double overallWorkloadVariance;
    private double overallRevenue;
}
