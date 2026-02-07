// Simulation API Types
export interface SimulationResult {
    testCaseNumber: number;
    averageWaitTime: number;
    abandonmentRate: number;
    slaComplianceRate: number;
    workloadVariance: number;
    totalRevenue: number;
    strategy: 'SMART' | 'FIFO';
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