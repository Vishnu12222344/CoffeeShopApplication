import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRunSimulation } from '@/hooks/useSimulation';
import { useToast } from '@/hooks/use-toast';
import {
    FlaskConical,
    Loader2,
    Zap,
    List,
    ArrowRight,
    TrendingDown,
    Users,
    Clock,
    DollarSign
} from 'lucide-react';

export default function SimulationPage() {
    const [testCases, setTestCases] = useState(100);
    const navigate = useNavigate();
    const { mutate: runSimulation, isPending } = useRunSimulation();
    const { toast } = useToast();

    const handleRunSimulation = (strategy: 'SMART' | 'FIFO') => {
        if (testCases < 1 || testCases > 1000) {
            toast({
                title: 'Invalid test cases',
                description: 'Please enter a number between 1 and 1000',
                variant: 'destructive',
            });
            return;
        }

        runSimulation(
            { testCases, strategy },
            {
                onSuccess: (data) => {
                    toast({
                        title: 'Simulation Complete!',
                        description: `Successfully ran ${testCases} test cases using ${strategy} strategy`,
                    });
                    navigate('/simulation/results', {
                        state: { summary: data, strategy, testCases }
                    });
                },
                onError: (error) => {
                    toast({
                        title: 'Simulation Failed',
                        description: error.message,
                        variant: 'destructive',
                    });
                },
            }
        );
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <FlaskConical className="h-8 w-8 text-amber-600" />
                    Queue Strategy Simulation
                </h1>
                <p className="text-muted-foreground mt-2">
                    Compare different queue management strategies to optimize coffee shop operations
                </p>
            </div>

            {/* Overview Card */}
            <Card className="border-2">
                <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                    <CardDescription>
                        Simulate real coffee shop scenarios with multiple baristas and customer orders
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-semibold flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Simulation Parameters
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• 3 baristas working in parallel</li>
                                <li>• 200-250 customer orders per test</li>
                                <li>• 6 different drink types (1-6 min prep time)</li>
                                <li>• Random arrival times (Poisson process)</li>
                                <li>• Mix of regular and new customers</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold flex items-center gap-2">
                                <TrendingDown className="h-4 w-4" />
                                Metrics Tracked
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Average wait time per customer</li>
                                <li>• Abandonment rate (customers leaving)</li>
                                <li>• SLA compliance (wait time &lt; 10 min)</li>
                                <li>• Workload balance across baristas</li>
                                <li>• Total revenue generated</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Test Cases Input */}
            <Card>
                <CardHeader>
                    <CardTitle>Configure Simulation</CardTitle>
                    <CardDescription>
                        Set the number of test cases to run
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 max-w-md">
                        <Label htmlFor="test-cases">Number of Test Cases</Label>
                        <Input
                            id="test-cases"
                            type="number"
                            min={1}
                            max={1000}
                            value={testCases}
                            onChange={(e) => setTestCases(parseInt(e.target.value) || 100)}
                            placeholder="100"
                            className="text-lg"
                        />
                        <p className="text-xs text-muted-foreground">
                            Each test simulates a full day of operations (1-1000 tests)
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Strategy Cards */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* SMART Strategy */}
                <Card className="border-2 hover:border-amber-500 transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-amber-500" />
                            SMART Strategy
                        </CardTitle>
                        <CardDescription>Shortest Job First (SJF)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm">How it works:</h4>
                            <p className="text-sm text-muted-foreground">
                                Orders are prioritized by preparation time. Shorter drinks (like espresso)
                                are completed first, minimizing average wait time and maximizing throughput.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                                <TrendingDown className="h-4 w-4 text-green-600" />
                                Expected Benefits:
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Lower average wait times</li>
                                <li>• Higher customer throughput</li>
                                <li>• Reduced abandonment rates</li>
                                <li>• Better SLA compliance</li>
                            </ul>
                        </div>

                        <Button
                            className="w-full gap-2 bg-amber-600 hover:bg-amber-700"
                            size="lg"
                            onClick={() => handleRunSimulation('SMART')}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Running...
                                </>
                            ) : (
                                <>
                                    <FlaskConical className="h-5 w-5" />
                                    Run SMART Simulation
                                    <ArrowRight className="h-5 w-5 ml-auto" />
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* FIFO Strategy */}
                <Card className="border-2 hover:border-blue-500 transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <List className="h-5 w-5 text-blue-500" />
                            FIFO Strategy
                        </CardTitle>
                        <CardDescription>First In First Out</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm">How it works:</h4>
                            <p className="text-sm text-muted-foreground">
                                Traditional queue processing where orders are handled in the exact order they
                                arrive. Simple and fair, but may lead to longer wait times when complex drinks
                                block the queue.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-600" />
                                Characteristics:
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Fair to all customers</li>
                                <li>• Simple to implement</li>
                                <li>• Predictable wait order</li>
                                <li>• May have higher wait times</li>
                            </ul>
                        </div>

                        <Button
                            className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                            size="lg"
                            onClick={() => handleRunSimulation('FIFO')}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Running...
                                </>
                            ) : (
                                <>
                                    <FlaskConical className="h-5 w-5" />
                                    Run FIFO Simulation
                                    <ArrowRight className="h-5 w-5 ml-auto" />
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Info Footer */}
            <Card className="bg-muted/50">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                        <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="space-y-1">
                            <h4 className="font-semibold text-sm">Revenue Tracking</h4>
                            <p className="text-sm text-muted-foreground">
                                Each simulation tracks total revenue based on completed orders. Abandoned orders
                                (customers who leave due to long wait times) do not contribute to revenue, making
                                strategy choice critical for profitability.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}