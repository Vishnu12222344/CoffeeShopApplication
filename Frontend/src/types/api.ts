// API Types matching Spring Boot backend DTOs

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface OrderRequest {
  drinkType: DrinkType;
  regularCustomer: boolean;
}

export interface MetricsResponse {
  avgWaitTime: number;
  timeoutRate: number;
  workloadBalance: number;
}

export interface Order {
  id: number;
  drinkType: DrinkType;
  arrivalTime: string;
  regularCustomer: boolean;
  status: OrderStatus;
  skipCount: number;
  priorityScore: number;
}

export type DrinkType = 
  | 'ESPRESSO' 
  | 'LATTE' 
  | 'CAPPUCCINO' 
  | 'AMERICANO' 
  | 'MOCHA';

export type OrderStatus = 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';

export interface User {
  username: string;
  roles: string[];
}

// Drink type display info
export const DRINK_INFO: Record<DrinkType, { name: string; prepTime: number; icon: string }> = {
  ESPRESSO: { name: 'Espresso', prepTime: 2, icon: '☕' },
  LATTE: { name: 'Latte', prepTime: 4, icon: '🥛' },
  CAPPUCCINO: { name: 'Cappuccino', prepTime: 4, icon: '☕' },
  AMERICANO: { name: 'Americano', prepTime: 3, icon: '🫗' },
  MOCHA: { name: 'Mocha', prepTime: 5, icon: '🍫' },
};
