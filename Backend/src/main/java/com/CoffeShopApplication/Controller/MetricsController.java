package com.CoffeShopApplication.Controller;

import com.CoffeShopApplication.dto.MetricsResponse;
import com.CoffeShopApplication.Service.MetricsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/metrics")
@RequiredArgsConstructor
public class MetricsController {

    private final MetricsService metricsService;

    @GetMapping
    public MetricsResponse getMetrics() {
        return metricsService.calculateMetrics();
    }
}

