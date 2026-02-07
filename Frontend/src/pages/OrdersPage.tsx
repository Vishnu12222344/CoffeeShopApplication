import { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { CreateOrderForm } from '@/components/CreateOrderForm';
import { OrderList } from '@/components/OrderList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, Clock, Coffee, CheckCircle } from 'lucide-react';

export default function OrdersPage() {
  const { data: orders, isLoading } = useOrders();
  const [activeTab, setActiveTab] = useState('all');

  const waitingOrders = orders?.filter(o => o.status === 'WAITING') || [];
  const inProgressOrders = orders?.filter(o => o.status === 'IN_PROGRESS') || [];
  const completedOrders = orders?.filter(o => o.status === 'COMPLETED') || [];

  const getFilteredOrders = () => {
    switch (activeTab) {
      case 'waiting':
        return waitingOrders;
      case 'in_progress':
        return inProgressOrders;
      case 'completed':
        return completedOrders;
      default:
        return orders || [];
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <ClipboardList className="h-8 w-8 text-primary" />
          Orders
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage and track all coffee orders
        </p>
      </div>

      {/* Create Order Form */}
      <CreateOrderForm />

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Order Queue</CardTitle>
          <CardDescription>
            All orders sorted by priority. Auto-refreshes every 5 seconds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all" className="gap-2">
                All
                <Badge variant="secondary" className="ml-1">
                  {orders?.length || 0}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="waiting" className="gap-2">
                <Clock className="h-4 w-4" />
                Waiting
                <Badge variant="secondary" className="ml-1">
                  {waitingOrders.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="in_progress" className="gap-2">
                <Coffee className="h-4 w-4" />
                In Progress
                <Badge variant="secondary" className="ml-1">
                  {inProgressOrders.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Completed
                <Badge variant="secondary" className="ml-1">
                  {completedOrders.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : (
                <OrderList orders={getFilteredOrders()} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
