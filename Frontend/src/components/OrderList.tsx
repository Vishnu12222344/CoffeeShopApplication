import { Order, DRINK_INFO } from '@/types/api';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Clock, Star, Zap } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface OrderListProps {
  orders: Order[];
  compact?: boolean;
}

const statusColors: Record<string, string> = {
  WAITING: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  COMPLETED: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
};

export function OrderList({ orders, compact = false }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No orders to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => {
        const drinkInfo = DRINK_INFO[order.drinkType] || { 
          name: order.drinkType, 
          icon: '☕', 
          prepTime: 3 
        };
        const waitTime = order.arrivalTime 
          ? formatDistanceToNow(new Date(order.arrivalTime), { addSuffix: false })
          : 'Just now';

        return (
          <div
            key={order.id}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border bg-card transition-all hover:shadow-md",
              compact && "p-3"
            )}
          >
            <div className="flex items-center gap-4">
              {/* Drink Icon */}
              <div className="text-3xl">{drinkInfo.icon}</div>
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{drinkInfo.name}</span>
                  {order.regularCustomer && (
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {waitTime}
                  </span>
                  {order.priorityScore > 50 && (
                    <span className="flex items-center gap-1 text-orange-600">
                      <Zap className="h-3 w-3" />
                      High Priority
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {!compact && (
                <div className="text-right text-sm text-muted-foreground">
                  <div>Order #{order.id}</div>
                  <div>Score: {order.priorityScore?.toFixed(1)}</div>
                </div>
              )}
              <Badge 
                variant="secondary"
                className={cn("font-medium", statusColors[order.status])}
              >
                {order.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
