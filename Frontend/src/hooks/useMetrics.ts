import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useMetrics() {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: () => api.getMetrics(),
    refetchInterval: 10000, // Poll every 10 seconds
  });
}
