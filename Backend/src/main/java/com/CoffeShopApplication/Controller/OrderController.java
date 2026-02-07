package com.CoffeShopApplication.Controller;

import com.CoffeShopApplication.Service.OrderService;
import com.CoffeShopApplication.Repository.OrderRepository;
import com.CoffeShopApplication.dto.OrderRequest;
import com.CoffeShopApplication.model.DrinkType;
import com.CoffeShopApplication.model.Order;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;

    // Create Order with improved error handling
    @PostMapping
    public ResponseEntity<?> create(@RequestBody OrderRequest request) {
        try {
            log.info("Creating order - Type: {}, Regular: {}",
                    request.getType(), request.isRegular());

            if (request.getType() == null) {
                log.error("DrinkType is null in request");
                return ResponseEntity
                        .badRequest()
                        .body("Drink type is required");
            }

            Order order = orderService.createOrder(
                    request.getType(),
                    request.isRegular()
            );

            log.info("Order created successfully - ID: {}", order.getId());
            return ResponseEntity.ok(order);

        } catch (IllegalArgumentException e) {
            log.error("Invalid drink type: {}", request.getType(), e);
            return ResponseEntity
                    .badRequest()
                    .body("Invalid drink type: " + request.getType());
        } catch (Exception e) {
            log.error("Error creating order", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create order: " + e.getMessage());
        }
    }

    // Assign Orders
    @PostMapping("/assign")
    public ResponseEntity<String> assign() {
        try {
            orderService.assignOrders();
            return ResponseEntity.ok("Orders Assigned");
        } catch (Exception e) {
            log.error("Error assigning orders", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to assign orders: " + e.getMessage());
        }
    }

    // Get All Orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        try {
            List<Order> orders = orderRepository.findAll();
            log.info("Retrieved {} orders", orders.size());
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            log.error("Error retrieving orders", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // Get Orders By Status
    @GetMapping("/status")
    public ResponseEntity<List<Order>> getByStatus(@RequestParam String value) {
        try {
            List<Order> orders = orderRepository.findByStatus(value);
            log.info("Retrieved {} orders with status: {}", orders.size(), value);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            log.error("Error retrieving orders by status: {}", value, e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}