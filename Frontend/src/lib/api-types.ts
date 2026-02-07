// types/api.ts
// This file should be located at: src/types/api.ts

export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface OrderRequest {
    type: DrinkType;
    regular: boolean;
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

export interface MetricsResponse {
    averageWaitTime: number;
    timeoutRate: number;
    workloadBalance: number;
}

export type DrinkType =
    | 'ESPRESSO'
    | 'LATTE'
    | 'CAPPUCCINO'
    | 'AMERICANO'
    | 'MOCHA';

export type OrderStatus =
    | 'WAITING'
    | 'IN_PROGRESS'
    | 'ASSIGNED'
    | 'COMPLETED';