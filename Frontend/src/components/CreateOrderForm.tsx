import { useState } from 'react';
import { useCreateOrder } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Coffee, Loader2 } from 'lucide-react';

const DRINK_TYPES = [
  { value: 'ESPRESSO', label: 'Espresso', prepTime: '2 min' },
  { value: 'AMERICANO', label: 'Americano', prepTime: '2 min' },
  { value: 'CAPPUCCINO', label: 'Cappuccino', prepTime: '3 min' },
  { value: 'LATTE', label: 'Latte', prepTime: '4 min' },
  { value: 'MOCHA', label: 'Mocha', prepTime: '5 min' },
] as const;

export function CreateOrderForm() {
  const [drinkType, setDrinkType] = useState<string>('');
  const [isRegular, setIsRegular] = useState(false);
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!drinkType) {
      toast({
        title: 'Error',
        description: 'Please select a drink type',
        variant: 'destructive',
      });
      return;
    }

    // ⚠️ CRITICAL: Make sure the data format matches exactly what backend expects
    const orderData = {
      type: drinkType,  // Must be one of: "ESPRESSO", "LATTE", "CAPPUCCINO", "AMERICANO", "MOCHA"
      regular: isRegular  // Must be boolean true/false, NOT string "true"/"false"
    };

    console.log('Creating order with data:', orderData); // Debug log

    createOrder(orderData, {
      onSuccess: () => {
        toast({
          title: 'Order created!',
          description: `${drinkType} order has been added to the queue.`,
        });
        // Reset form
        setDrinkType('');
        setIsRegular(false);
      },
      onError: (error) => {
        console.error('Order creation error:', error); // Debug log
        toast({
          title: 'Failed to create order',
          description: error instanceof Error ? error.message : 'Please try again.',
          variant: 'destructive',
        });
      },
    });
  };

  return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coffee className="h-5 w-5" />
            Create New Order
          </CardTitle>
          <CardDescription>
            Add a new coffee order to the queue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Drink Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="drink-type">Drink Type</Label>
              <Select value={drinkType} onValueChange={setDrinkType}>
                <SelectTrigger id="drink-type" className="w-full">
                  <SelectValue placeholder="Select a drink type" />
                </SelectTrigger>
                <SelectContent>
                  {DRINK_TYPES.map((drink) => (
                      <SelectItem key={drink.value} value={drink.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{drink.label}</span>
                          <span className="text-xs text-muted-foreground ml-4">
                        {drink.prepTime}
                      </span>
                        </div>
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Regular Customer Toggle */}
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="regular-customer">Regular Customer</Label>
                <p className="text-sm text-muted-foreground">
                  Give this order priority
                </p>
              </div>
              <Switch
                  id="regular-customer"
                  checked={isRegular}
                  onCheckedChange={setIsRegular}
              />
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                className="w-full"
                disabled={isPending || !drinkType}
            >
              {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating order...
                  </>
              ) : (
                  <>
                    <Coffee className="mr-2 h-4 w-4" />
                    Create Order
                  </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
  );
}