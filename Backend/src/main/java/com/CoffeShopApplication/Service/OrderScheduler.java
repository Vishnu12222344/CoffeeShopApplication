package com.CoffeShopApplication.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderScheduler {

    private final OrderService orderService;

    @Scheduled(fixedRate = 30000)
    public void autoAssign() {
        orderService.assignOrders();
        System.out.println("Auto assignment executed.");
    }
}

