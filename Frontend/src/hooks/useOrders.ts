import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { OrderRequest } from '@/types/api';

// Query key
const ORDERS_QUERY_KEY = ['orders'];

// Fetch orders
export function useOrders() {
  return useQuery({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: () => api.getOrders(),
    refetchInterval: 5000, // Auto-refresh every 5 seconds
  });
}

// Create order mutation
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: OrderRequest) => {
      // ⚠️ CRITICAL: Ensure data is in correct format before sending
      console.log('Sending order data to API:', orderData);

      // Validate data before sending
      if (!orderData.type) {
        throw new Error('Drink type is required');
      }

      if (typeof orderData.regular !== 'boolean') {
        throw new Error('Regular must be a boolean value');
      }

      return api.createOrder(orderData);
    },
    onSuccess: () => {
      // Invalidate and refetch orders after successful creation
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
    },
  });
}