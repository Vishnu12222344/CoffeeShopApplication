// Simulation API Types

export interface SimOrder {
    arrivalTime: number;
    startTime: number;
    completionTime: number;
    prepTime: number;
    price: number;
    regularCustomer: boolean;
}

export interface SimulationResult {
    testCaseNumber: number;
    averageWaitTime: number;
    abandonmentRate: number;
    slaComplianceRate: number;
    workloadVariance: number;
    totalRevenue: number;
    strategy: 'SMART' | 'FIFO';
    orders: SimOrder[];  // NEW: List of all orders in this test case
}

export interface SimulationSummary {
    results: SimulationResult[];
    overallAverageWait: number;
    overallAbandonment: number;
    overallSlaCompliance: number;
    overallWorkloadVariance: number;
    overallRevenue: number;
}

export type SimulationStrategy = 'SMART' | 'FIFO';