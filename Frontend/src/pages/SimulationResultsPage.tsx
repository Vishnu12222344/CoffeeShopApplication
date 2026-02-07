import { useLocation, useNavigate } from 'react-router-dom';
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
    ResponsiveContainer,
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
} from 'lucide-react';
import type { SimulationSummary, SimulationStrategy } from '@/types/simulation';

interface LocationState {
    summary: SimulationSummary;
    strategy: SimulationStrategy;
    testCases: number;
}

export default function SimulationResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;

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
                                All {testCases} test case results
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Test #</TableHead>
                                            <TableHead className="text-right">Avg Wait (min)</TableHead>
                                            <TableHead className="text-right">Abandonment %</TableHead>
                                            <TableHead className="text-right">SLA Compliance %</TableHead>
                                            <TableHead className="text-right">Workload Var.</TableHead>
                                            <TableHead className="text-right">Revenue ($)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {summary.results.map((result) => (
                                            <TableRow key={result.testCaseNumber}>
                                                <TableCell className="font-medium">
                                                    {result.testCaseNumber}
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
                                                    {result.workloadVariance.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {result.totalRevenue.toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}