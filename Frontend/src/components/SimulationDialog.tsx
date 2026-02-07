import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRunSimulation } from '@/hooks/useSimulation';
import { useToast } from '@/hooks/use-toast';
import { FlaskConical, Loader2, Zap, List } from 'lucide-react';
import type { SimulationStrategy } from '@/types/simulation';

interface SimulationDialogProps {
    trigger?: React.ReactNode;
}

export function SimulationDialog({ trigger }: SimulationDialogProps) {
    const [open, setOpen] = useState(false);
    const [testCases, setTestCases] = useState(100);
    const [strategy, setStrategy] = useState<SimulationStrategy>('SMART');
    const navigate = useNavigate();
    const { mutate: runSimulation, isPending } = useRunSimulation();
    const { toast } = useToast();

    const handleRunSimulation = () => {
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
                    setOpen(false);
                    // Navigate to results page with data
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
        <Dialog open={open} onSetOpen={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button size="lg" className="gap-2">
                        <FlaskConical className="h-5 w-5" />
                        Run Simulation
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FlaskConical className="h-5 w-5" />
                        Run Queue Simulation
                    </DialogTitle>
                    <DialogDescription>
                        Compare SMART vs FIFO queue strategies across multiple test cases
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Test Cases Input */}
                    <div className="space-y-2">
                        <Label htmlFor="test-cases">Number of Test Cases</Label>
                        <Input
                            id="test-cases"
                            type="number"
                            min={1}
                            max={1000}
                            value={testCases}
                            onChange={(e) => setTestCases(parseInt(e.target.value) || 100)}
                            placeholder="100"
                        />
                        <p className="text-xs text-muted-foreground">
                            Each test simulates 200-250 customer orders (1-1000 tests)
                        </p>
                    </div>

                    {/* Strategy Selection */}
                    <div className="space-y-3">
                        <Label>Queue Strategy</Label>
                        <RadioGroup
                            value={strategy}
                            onValueChange={(value) => setStrategy(value as SimulationStrategy)}
                        >
                            <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent transition-colors">
                                <RadioGroupItem value="SMART" id="smart" className="mt-1" />
                                <div className="flex-1">
                                    <Label htmlFor="smart" className="flex items-center gap-2 cursor-pointer font-semibold">
                                        <Zap className="h-4 w-4 text-amber-500" />
                                        SMART Strategy
                                    </Label>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Shortest Job First - Prioritizes orders by preparation time for optimal throughput
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent transition-colors">
                                <RadioGroupItem value="FIFO" id="fifo" className="mt-1" />
                                <div className="flex-1">
                                    <Label htmlFor="fifo" className="flex items-center gap-2 cursor-pointer font-semibold">
                                        <List className="h-4 w-4 text-blue-500" />
                                        FIFO Strategy
                                    </Label>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        First In First Out - Traditional queue processing in arrival order
                                    </p>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleRunSimulation}
                        disabled={isPending}
                        className="gap-2"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Running...
                            </>
                        ) : (
                            <>
                                <FlaskConical className="h-4 w-4" />
                                Run Simulation
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}