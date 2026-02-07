import { useMetrics } from '@/hooks/useMetrics';
import { useOrders } from '@/hooks/useOrders';
import { MetricCard } from '@/components/MetricCard';
import { OrderList } from '@/components/OrderList';
import { SimulationDialog } from '@/components/SimulationDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Clock,
  AlertTriangle,
  Users,
  Coffee,
  TrendingUp,
  FlaskConical
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis } from 'recharts';

export default function DashboardPage() {
  const { data: metrics, isLoading: metricsLoading } = useMetrics();
  const { data: orders, isLoading: ordersLoading } = useOrders();

  const waitingOrders = orders?.filter(o => o.status === 'WAITING') || [];
  const inProgressOrders = orders?.filter(o => o.status === 'IN_PROGRESS') || [];

  // Mock chart data based on metrics
  const chartData = [
    { time: '10:00', waitTime: 2.5 },
    { time: '10:30', waitTime: 3.2 },
    { time: '11:00', waitTime: 4.1 },
    { time: '11:30', waitTime: 3.8 },
    { time: '12:00', waitTime: 5.2 },
    { time: '12:30', waitTime: metrics?.avgWaitTime || 4.5 },
  ];

  const chartConfig = {
    waitTime: {
      label: 'Wait Time',
      color: 'hsl(var(--primary))',
    },
  };

  return (
      <div className="space-y-8">
        {/* Header with Simulation Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Real-time coffee shop metrics and order tracking
            </p>
          </div>
          <SimulationDialog />
        </div>

        {/* Simulation Info Card */}
        <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-amber-600" />
              Queue Strategy Simulation
            </CardTitle>
            <CardDescription>
              Test and compare SMART (Shortest Job First) vs FIFO (First In First Out) strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Run simulations to analyze wait times, abandonment rates, SLA compliance, and revenue
              across different queueing strategies. Each test simulates 200-250 customer orders with
              3 baristas working in parallel.
            </p>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metricsLoading ? (
              <>
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <Skeleton className="h-4 w-24" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-8 w-16" />
                      </CardContent>
                    </Card>
                ))}
              </>
          ) : (
              <>
                <MetricCard
                    title="Avg Wait Time"
                    value={`${metrics?.avgWaitTime?.toFixed(1) || 0} min`}
                    subtitle="Target: < 5 minutes"
                    icon={Clock}
                    colorClass="text-blue-600"
                />
                <MetricCard
                    title="Timeout Rate"
                    value={`${metrics?.timeoutRate?.toFixed(1) || 0}%`}
                    subtitle="Orders > 10 min"
                    icon={AlertTriangle}
                    colorClass="text-amber-600"
                />
                <MetricCard
                    title="Workload Balance"
                    value={`${metrics?.workloadBalance?.toFixed(0) || 0}%`}
                    subtitle="Barista utilization"
                    icon={Users}
                    colorClass="text-emerald-600"
                />
                <MetricCard
                    title="Active Orders"
                    value={waitingOrders.length + inProgressOrders.length}
                    subtitle={`${waitingOrders.length} waiting, ${inProgressOrders.length} in progress`}
                    icon={Coffee}
                    colorClass="text-orange-600"
                />
              </>
          )}
        </div>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              Wait Time Trend
            </CardTitle>
            <CardDescription>
              Average customer wait time over the last few hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="waitTimeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `${value}m`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                    type="monotone"
                    dataKey="waitTime"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#waitTimeGradient)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Waiting Orders</CardTitle>
            <CardDescription>
              Orders in queue sorted by priority
            </CardDescription>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
            ) : (
                <OrderList orders={waitingOrders.slice(0, 5)} compact />
            )}
          </CardContent>
        </Card>
      </div>
  );
}