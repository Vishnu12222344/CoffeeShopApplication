import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { SimulationSummary } from '@/types/simulation';

interface RunSimulationParams {
    testCases: number;
    strategy: 'SMART' | 'FIFO';
}

export function useRunSimulation() {
    return useMutation<SimulationSummary, Error, RunSimulationParams>({
        mutationFn: async ({ testCases, strategy }) => {
            if (strategy === 'SMART') {
                return api.runSmartSimulation(testCases);
            } else {
                return api.runFifoSimulation(testCases);
            }
        },
    });
}