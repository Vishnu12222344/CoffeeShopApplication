package com.CoffeShopApplication.simulation;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simulation")
@RequiredArgsConstructor
public class SimulationController {

    private final SimulationService simulationService;

    @PostMapping("/smart")
    public SimulationSummary runSmart(@RequestParam(defaultValue = "100") int tests) {
        return simulationService.runSimulation(tests, true);
    }

    @PostMapping("/fifo")
    public SimulationSummary runFifo(@RequestParam(defaultValue = "100") int tests) {
        return simulationService.runSimulation(tests, false);
    }
}
