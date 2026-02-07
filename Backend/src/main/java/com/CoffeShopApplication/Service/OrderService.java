package com.CoffeShopApplication.Service;

import com.CoffeShopApplication.Repository.BaristaRepository;
import com.CoffeShopApplication.Repository.OrderRepository;
import com.CoffeShopApplication.model.Barista;
import com.CoffeShopApplication.model.DrinkType;
import com.CoffeShopApplication.model.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Duration;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final BaristaRepository baristaRepository;
    private final PriorityCalculator calculator;

    public Order createOrder(DrinkType type, boolean regular) {

        Order order = new Order();
        order.setDrinkType(type);
        order.setArrivalTime(LocalDateTime.now());
        order.setRegularCustomer(regular);
        order.setStatus("WAITING");
        order.setSkipCount(0);

        order.setPriorityScore(calculator.calculate(order));

        return orderRepository.save(order);
    }

    public void assignOrders() {

        List<Order> waitingOrders = orderRepository.findByStatus("WAITING");
        List<Barista> baristas = baristaRepository.findAll();

        if (waitingOrders.isEmpty()) return;

        LocalDateTime now = LocalDateTime.now();

        // STEP 1: Hard 10-minute enforcement
        Optional<Order> timeoutOrder = waitingOrders.stream()
                .filter(o -> Duration.between(o.getArrivalTime(), now).toMinutes() >= 10)
                .findFirst();

        for (Barista barista : baristas) {

            // Check if barista is free
            if (barista.getBusyUntil() == null ||
                    now.isAfter(barista.getBusyUntil())) {

                Order selectedOrder = null;

                // If someone crossed 10 minutes → assign immediately
                if (timeoutOrder.isPresent()) {
                    selectedOrder = timeoutOrder.get();
                } else {

                    // STEP 2: Sort by priority (highest first)
                    waitingOrders.sort(
                            Comparator.comparingDouble(Order::getPriorityScore)
                                    .reversed()
                    );

                    // STEP 3: Fairness rule (max 3 skips)
                    for (Order order : waitingOrders) {
                        if (order.getSkipCount() >= 3) {
                            selectedOrder = order;
                            break;
                        }
                    }

                    if (selectedOrder == null) {
                        selectedOrder = waitingOrders.get(0);
                    }
                }

                if (selectedOrder == null) continue;

                // STEP 4: Workload balancing logic
                boolean overloaded =
                        barista.getBusyUntil() != null &&
                                now.isBefore(barista.getBusyUntil());

                // Overloaded barista prefers short orders (<=4 min)
                if (overloaded &&
                        selectedOrder.getDrinkType().getPrepTime() > 4) {
                    continue;
                }

                // Assign order
                selectedOrder.setStatus("ASSIGNED");
                selectedOrder.setSkipCount(0);

                barista.setBusyUntil(
                        now.plusMinutes(
                                selectedOrder.getDrinkType().getPrepTime()
                        )
                );

                orderRepository.save(selectedOrder);
                baristaRepository.save(barista);

                // Increase skip count for other waiting orders
                for (Order order : waitingOrders) {
                    if (!order.getId().equals(selectedOrder.getId())) {
                        order.setSkipCount(order.getSkipCount() + 1);
                        orderRepository.save(order);
                    }
                }

                break; // assign only one per execution
            }
        }
    }
}
