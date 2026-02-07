package com.CoffeShopApplication.Service;

import com.CoffeShopApplication.model.Order;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class PriorityCalculator {

    public double calculate(Order order) {

        long waitMinutes = Duration.between(
                order.getArrivalTime(),
                LocalDateTime.now()
        ).toMinutes();

        double waitComponent = waitMinutes * 4;
        double complexityBonus = (6 - order.getDrinkType().getPrepTime()) * 2.5;
        double loyaltyBonus = order.isRegularCustomer() ? 10 : 0;
        double urgencyBonus = waitMinutes >= 8 ? 50 : 0;

        return waitComponent + complexityBonus + loyaltyBonus + urgencyBonus;
    }
}

