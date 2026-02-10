package com.CoffeShopApplication.simulation;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SimulationService {

    private static final double LAMBDA = 1.4;
    private static final Random random = new Random();

    public SimulationSummary runSimulation(int testCases, boolean useSmart) {

        Stack<SimulationResult> stackResults = new Stack<>();

        double totalAvgWait = 0;
        double totalAbandon = 0;
        double totalSla = 0;
        double totalVariance = 0;
        double totalRevenue = 0;

        for (int i = 1; i <= testCases; i++) {

            SimulationResult result = runSingleTest(i, useSmart);

            stackResults.push(result);

            totalAvgWait += result.getAverageWaitTime();
            totalAbandon += result.getAbandonmentRate();
            totalSla += result.getSlaComplianceRate();
            totalVariance += result.getWorkloadVariance();
            totalRevenue += result.getTotalRevenue();
        }

        return new SimulationSummary(
                new ArrayList<>(stackResults),
                totalAvgWait / testCases,
                totalAbandon / testCases,
                totalSla / testCases,
                totalVariance / testCases,
                totalRevenue / testCases
        );
    }

    private SimulationResult runSingleTest(int testNumber, boolean useSmart) {

        int customerCount = 200 + random.nextInt(51);

        List<SimOrder> orders = generateOrders(customerCount);

        List<SimBarista> baristas = Arrays.asList(
                new SimBarista(),
                new SimBarista(),
                new SimBarista()
        );

        double totalWait = 0;
        int abandonedCount = 0;
        int slaViolations = 0;
        double revenue = 0;
        int processedCount = 0;

        if (useSmart) {
            // SMART Strategy: Shortest Job First from waiting queue
            PriorityQueue<SimOrder> waitingQueue = new PriorityQueue<>(
                    Comparator.comparingInt(SimOrder::getPrepTime)
            );

            int orderIndex = 0;

            // Process all orders
            while (orderIndex < orders.size() || !waitingQueue.isEmpty()) {

                // Find the barista that will be available soonest
                SimBarista nextBarista = baristas.stream()
                        .min(Comparator.comparingDouble(SimBarista::getAvailableAt))
                        .orElseThrow();

                double baristaAvailableTime = nextBarista.getAvailableAt();

                // Add all orders that arrived before this barista becomes available
                while (orderIndex < orders.size() &&
                        orders.get(orderIndex).getArrivalTime() <= baristaAvailableTime) {
                    waitingQueue.add(orders.get(orderIndex));
                    orderIndex++;
                }

                // If queue is empty, wait for next customer arrival
                if (waitingQueue.isEmpty()) {
                    if (orderIndex < orders.size()) {
                        // Fast-forward to next arrival
                        SimOrder nextArrival = orders.get(orderIndex);
                        waitingQueue.add(nextArrival);
                        orderIndex++;
                    } else {
                        break;
                    }
                }

                // Pick the shortest job from waiting queue
                SimOrder nextOrder = waitingQueue.poll();

                // Start time is when barista is available OR when customer arrived, whichever is later
                nextOrder.setStartTime(Math.max(nextOrder.getArrivalTime(), nextBarista.getAvailableAt()));

                double waitTime = nextOrder.getStartTime() - nextOrder.getArrivalTime();

                // Check abandonment (new customers only, wait > 8 min)
                if (!nextOrder.isRegularCustomer() && waitTime > 8) {
                    abandonedCount++;
                    continue;
                }

                // Check SLA violation (wait > 10 min)
                if (waitTime > 10) {
                    slaViolations++;
                }

                // Complete the order
                nextOrder.setCompletionTime(nextOrder.getStartTime() + nextOrder.getPrepTime());
                nextBarista.setAvailableAt(nextOrder.getCompletionTime());
                nextBarista.setTotalWorkTime(nextBarista.getTotalWorkTime() + nextOrder.getPrepTime());

                totalWait += waitTime;
                revenue += nextOrder.getPrice();
                processedCount++;
            }

        } else {
            // FIFO: Process in arrival order
            for (SimOrder order : orders) {

                SimBarista bestBarista = baristas.stream()
                        .min(Comparator.comparingDouble(SimBarista::getAvailableAt))
                        .orElseThrow();

                order.setStartTime(
                        Math.max(order.getArrivalTime(), bestBarista.getAvailableAt())
                );

                double waitTime = order.getStartTime() - order.getArrivalTime();

                if (!order.isRegularCustomer() && waitTime > 8) {
                    abandonedCount++;
                    continue;
                }

                if (waitTime > 10) {
                    slaViolations++;
                }

                order.setCompletionTime(order.getStartTime() + order.getPrepTime());

                bestBarista.setAvailableAt(order.getCompletionTime());
                bestBarista.setTotalWorkTime(
                        bestBarista.getTotalWorkTime() + order.getPrepTime()
                );

                totalWait += waitTime;
                revenue += order.getPrice();
                processedCount++;
            }
        }

        double avgWait = processedCount > 0 ? totalWait / processedCount : 0;
        double abandonRate = (abandonedCount * 100.0) / customerCount;
        double slaCompliance = 100 - ((slaViolations * 100.0) / processedCount);
        double variance = calculateVariance(baristas);

        String strategy = useSmart ? "SMART" : "FIFO";

        return new SimulationResult(
                testNumber,
                avgWait,
                abandonRate,
                slaCompliance,
                variance,
                revenue,
                strategy,
                orders
        );
    }

    private List<SimOrder> generateOrders(int count) {

        List<SimOrder> orders = new ArrayList<>();
        double currentTime = 0;

        for (int i = 0; i < count; i++) {

            currentTime += -Math.log(1 - random.nextDouble()) / LAMBDA;

            SimOrder order = new SimOrder();
            order.setArrivalTime(currentTime);

            assignDrink(order);

            order.setRegularCustomer(random.nextBoolean());

            orders.add(order);
        }

        return orders;
    }

    private void assignDrink(SimOrder order) {

        double r = random.nextDouble();

        if (r < 0.25) {
            order.setPrepTime(1);
            order.setPrice(120);
        } else if (r < 0.45) {
            order.setPrepTime(2);
            order.setPrice(150);
        } else if (r < 0.60) {
            order.setPrepTime(2);
            order.setPrice(140);
        } else if (r < 0.80) {
            order.setPrepTime(4);
            order.setPrice(180);
        } else if (r < 0.92) {
            order.setPrepTime(4);
            order.setPrice(200);
        } else {
            order.setPrepTime(6);
            order.setPrice(250);
        }
    }

    private double calculateVariance(List<SimBarista> baristas) {

        double avg = baristas.stream()
                .mapToDouble(SimBarista::getTotalWorkTime)
                .average()
                .orElse(0);

        return baristas.stream()
                .mapToDouble(b -> Math.pow(b.getTotalWorkTime() - avg, 2))
                .average()
                .orElse(0);
    }
}