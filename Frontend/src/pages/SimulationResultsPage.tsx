import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from 'recharts';
import {
    ArrowLeft,
    TrendingDown,
    TrendingUp,
    Clock,
    DollarSign,
    UserX,
    CheckCircle,
    BarChart3,
    Eye,
    User,
    UserCheck,
    Coffee,
    AlertCircle,
} from 'lucide-react';
import type { SimulationSummary, SimulationStrategy, SimulationResult, SimOrder } from '@/types/simulation';

interface LocationState {
    summary: SimulationSummary;
    strategy: SimulationStrategy;
    testCases: number;
}

export default function SimulationResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;
    const [selectedTest, setSelectedTest] = useState<SimulationResult | null>(null);
    const [orderDialogOpen, setOrderDialogOpen] = useState(false);

    if (!state?.summary) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-muted-foreground">No simulation data available</p>
                <Button onClick={() => navigate('/dashboard')}>
                    Return to Dashboard
                </Button>
            </div>
        );
    }

    const { summary, strategy, testCases } = state;

    // Prepare chart data
    const chartData = summary.results.slice(0, 50).map((result, index) => ({
        test: index + 1,
        waitTime: result.averageWaitTime,
        abandonment: result.abandonmentRate,
        slaCompliance: result.slaComplianceRate,
        revenue: result.totalRevenue,
    }));

    const chartConfig = {
        waitTime: {
            label: 'Wait Time (min)',
            color: 'hsl(var(--chart-1))',
        },
        abandonment: {
            label: 'Abandonment %',
            color: 'hsl(var(--chart-2))',
        },
        slaCompliance: {
            label: 'SLA Compliance %',
            color: 'hsl(var(--chart-3))',
        },
        revenue: {
            label: 'Revenue ($)',
            color: 'hsl(var(--chart-4))',
        },
    };

    const handleViewOrders = (result: SimulationResult) => {
        setSelectedTest(result);
        setOrderDialogOpen(true);
    };

    const MetricCard = ({
                            title,
                            value,
                            icon: Icon,
                            trend,
                            colorClass,
                        }: {
        title: string;
        value: string | number;
        icon: any;
        trend?: 'up' | 'down';
        colorClass: string;
    }) => (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${colorClass}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {trend && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        {trend === 'up' ? (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                        ) : (
                            <TrendingDown className="h-3 w-3 text-red-600" />
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );

    // Calculate order statistics for selected test
    const getOrderStats = (orders: SimOrder[]) => {
        const completed = orders.filter(o => o.completionTime > 0);
        const abandoned = orders.length - completed.length;
        const regularCustomers = orders.filter(o => o.regularCustomer).length;

        return {
            total: orders.length,
            completed: completed.length,
            abandoned,
            regularCustomers,
            avgWaitTime: completed.length > 0
                ? completed.reduce((sum, o) => sum + (o.startTime - o.arrivalTime), 0) / completed.length
                : 0,
        };
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/dashboard')}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Simulation Results
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            {testCases} test cases using{' '}
                            <Badge
                                variant="secondary"
                                className={
                                    strategy === 'SMART'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-blue-100 text-blue-800'
                                }
                            >
                                {strategy}
                            </Badge>{' '}
                            strategy
                        </p>
                    </div>
                </div>
            </div>

            {/* Summary Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <MetricCard
                    title="Avg Wait Time"
                    value={`${summary.overallAverageWait.toFixed(2)} min`}
                    icon={Clock}
                    colorClass="text-blue-600"
                />
                <MetricCard
                    title="Abandonment Rate"
                    value={`${summary.overallAbandonment.toFixed(2)}%`}
                    icon={UserX}
                    colorClass="text-red-600"
                />
                <MetricCard
                    title="SLA Compliance"
                    value={`${summary.overallSlaCompliance.toFixed(2)}%`}
                    icon={CheckCircle}
                    colorClass="text-green-600"
                />
                <MetricCard
                    title="Workload Variance"
                    value={summary.overallWorkloadVariance.toFixed(2)}
                    icon={BarChart3}
                    colorClass="text-purple-600"
                />
                <MetricCard
                    title="Avg Revenue"
                    value={`$${summary.overallRevenue.toFixed(2)}`}
                    icon={DollarSign}
                    colorClass="text-emerald-600"
                />
            </div>

            {/* Charts and Data */}
            <Tabs defaultValue="charts" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="charts">Charts</TabsTrigger>
                    <TabsTrigger value="table">Data Table</TabsTrigger>
                    <TabsTrigger value="orders">Order Details</TabsTrigger>
                </TabsList>

                <TabsContent value="charts" className="space-y-4">
                    {/* Wait Time Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Average Wait Time Across Tests</CardTitle>
                            <CardDescription>
                                Wait time variation across {Math.min(50, testCases)} test cases
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[300px]">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="test"
                                        label={{ value: 'Test Case', position: 'insideBottom', offset: -5 }}
                                    />
                                    <YAxis
                                        label={{ value: 'Wait Time (min)', angle: -90, position: 'insideLeft' }}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Line
                                        type="monotone"
                                        dataKey="waitTime"
                                        stroke="var(--color-waitTime)"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Performance Metrics Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Metrics Comparison</CardTitle>
                            <CardDescription>
                                Abandonment rate vs SLA compliance across tests
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[300px]">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="test"
                                        label={{ value: 'Test Case', position: 'insideBottom', offset: -5 }}
                                    />
                                    <YAxis
                                        label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="abandonment"
                                        stroke="var(--color-abandonment)"
                                        strokeWidth={2}
                                        dot={false}
                                        name="Abandonment %"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="slaCompliance"
                                        stroke="var(--color-slaCompliance)"
                                        strokeWidth={2}
                                        dot={false}
                                        name="SLA Compliance %"
                                    />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Revenue Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Performance</CardTitle>
                            <CardDescription>
                                Total revenue across test cases
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[300px]">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="test"
                                        label={{ value: 'Test Case', position: 'insideBottom', offset: -5 }}
                                    />
                                    <YAxis
                                        label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar
                                        dataKey="revenue"
                                        fill="var(--color-revenue)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="table">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detailed Test Results</CardTitle>
                            <CardDescription>
                                All {testCases} test case results with order counts
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Test #</TableHead>
                                            <TableHead className="text-right">Orders</TableHead>
                                            <TableHead className="text-right">Avg Wait (min)</TableHead>
                                            <TableHead className="text-right">Abandonment %</TableHead>
                                            <TableHead className="text-right">SLA Compliance %</TableHead>
                                            <TableHead className="text-right">Revenue ($)</TableHead>
                                            <TableHead className="text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {summary.results.map((result) => (
                                            <TableRow key={result.testCaseNumber}>
                                                <TableCell className="font-medium">
                                                    {result.testCaseNumber}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {result.orders?.length || 0}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {result.averageWaitTime.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {result.abandonmentRate.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {result.slaComplianceRate.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {result.totalRevenue.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleViewOrders(result)}
                                                        className="gap-2"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View Orders
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Details by Test Case</CardTitle>
                            <CardDescription>
                                Click "View Orders" to see individual order details for each test
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3">
                                {summary.results.map((result) => {
                                    const stats = getOrderStats(result.orders || []);
                                    return (
                                        <Card key={result.testCaseNumber} className="hover:bg-accent/50 transition-colors">
                                            <CardContent className="pt-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-2">
                                                        <h4 className="font-semibold flex items-center gap-2">
                                                            Test Case #{result.testCaseNumber}
                                                            <Badge variant="outline">{stats.total} orders</Badge>
                                                        </h4>
                                                        <div className="flex gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                  {stats.completed} completed
                              </span>
                                                            <span className="flex items-center gap-1">
                                <UserX className="h-4 w-4 text-red-600" />
                                                                {stats.abandoned} abandoned
                              </span>
                                                            <span className="flex items-center gap-1">
                                <UserCheck className="h-4 w-4 text-blue-600" />
                                                                {stats.regularCustomers} regular
                              </span>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        onClick={() => handleViewOrders(result)}
                                                        className="gap-2"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View All Orders
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Order Details Dialog */}
            <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
                <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Coffee className="h-5 w-5" />
                            Test Case #{selectedTest?.testCaseNumber} - Order Details
                        </DialogTitle>
                        <DialogDescription>
                            {selectedTest?.orders?.length || 0} total orders in this simulation
                        </DialogDescription>
                    </DialogHeader>

                    {selectedTest && (
                        <div className="space-y-4">
                            {/* Order Statistics */}
                            <div className="grid grid-cols-4 gap-4">
                                {(() => {
                                    const stats = getOrderStats(selectedTest.orders || []);
                                    return (
                                        <>
                                            <Card>
                                                <CardContent className="pt-4">
                                                    <div className="text-2xl font-bold">{stats.total}</div>
                                                    <div className="text-xs text-muted-foreground">Total Orders</div>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardContent className="pt-4">
                                                    <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                                                    <div className="text-xs text-muted-foreground">Completed</div>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardContent className="pt-4">
                                                    <div className="text-2xl font-bold text-red-600">{stats.abandoned}</div>
                                                    <div className="text-xs text-muted-foreground">Abandoned</div>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardContent className="pt-4">
                                                    <div className="text-2xl font-bold">{stats.avgWaitTime.toFixed(2)} min</div>
                                                    <div className="text-xs text-muted-foreground">Avg Wait</div>
                                                </CardContent>
                                            </Card>
                                        </>
                                    );
                                })()}
                            </div>

                            {/* Orders Table */}
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead className="text-right">Arrival</TableHead>
                                            <TableHead className="text-right">Start</TableHead>
                                            <TableHead className="text-right">Complete</TableHead>
                                            <TableHead className="text-right">Wait Time</TableHead>
                                            <TableHead className="text-right">Prep Time</TableHead>
                                            <TableHead className="text-right">Price</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedTest.orders?.map((order, index) => {
                                            const waitTime = order.startTime - order.arrivalTime;
                                            const isAbandoned = order.completionTime === 0;
                                            const isSlaViolation = waitTime > 10;

                                            return (
                                                <TableRow key={index} className={isAbandoned ? 'bg-red-50 dark:bg-red-950/20' : ''}>
                                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            {order.regularCustomer ? (
                                                                <UserCheck className="h-4 w-4 text-blue-600" />
                                                            ) : (
                                                                <User className="h-4 w-4 text-gray-400" />
                                                            )}
                                                            <span className="text-sm">
                                {order.regularCustomer ? 'Regular' : 'New'}
                              </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">{order.arrivalTime.toFixed(2)}</TableCell>
                                                    <TableCell className="text-right">
                                                        {isAbandoned ? '-' : order.startTime.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {isAbandoned ? '-' : order.completionTime.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                            <span className={isSlaViolation && !isAbandoned ? 'text-red-600 font-semibold' : ''}>
                              {isAbandoned ? '-' : waitTime.toFixed(2)}
                            </span>
                                                    </TableCell>
                                                    <TableCell className="text-right">{order.prepTime} min</TableCell>
                                                    <TableCell className="text-right">${order.price}</TableCell>
                                                    <TableCell>
                                                        {isAbandoned ? (
                                                            <Badge variant="destructive" className="gap-1">
                                                                <AlertCircle className="h-3 w-3" />
                                                                Abandoned
                                                            </Badge>
                                                        ) : isSlaViolation ? (
                                                            <Badge variant="outline" className="gap-1 border-orange-500 text-orange-600">
                                                                <AlertCircle className="h-3 w-3" />
                                                                SLA Violation
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="outline" className="gap-1 border-green-500 text-green-600">
                                                                <CheckCircle className="h-3 w-3" />
                                                                Completed
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}