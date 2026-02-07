package com.CoffeShopApplication.Service;

import com.CoffeShopApplication.dto.MetricsResponse;
import com.CoffeShopApplication.model.Barista;
import com.CoffeShopApplication.model.Order;
import com.CoffeShopApplication.Repository.BaristaRepository;
import com.CoffeShopApplication.Repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MetricsService {

    private final OrderRepository orderRepository;
    private final BaristaRepository baristaRepository;

    public MetricsResponse calculateMetrics() {

        List<Order> orders = orderRepository.findAll();

        double totalWait = 0;
        int timeoutCount = 0;

        for (Order order : orders) {

            long wait = Duration.between(
                    order.getArrivalTime(),
                    LocalDateTime.now()
            ).toMinutes();

            totalWait += wait;

            if (wait > 10) {
                timeoutCount++;
            }
        }

        double avgWait = orders.isEmpty() ? 0 : totalWait / orders.size();
        double timeoutRate = orders.isEmpty() ? 0 :
                (timeoutCount * 100.0) / orders.size();

        List<Barista> baristas = baristaRepository.findAll();
        double busyCount = baristas.stream()
                .filter(b -> LocalDateTime.now().isBefore(b.getBusyUntil()))
                .count();

        double workloadBalance = (busyCount / baristas.size()) * 100;

        return new MetricsResponse(avgWait, timeoutRate, workloadBalance);
    }
}

