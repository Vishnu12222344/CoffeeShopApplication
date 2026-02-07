package com.CoffeShopApplication.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MetricsResponse {

    private double averageWaitTime;
    private double timeoutRate;
    private double workloadBalance;
}

