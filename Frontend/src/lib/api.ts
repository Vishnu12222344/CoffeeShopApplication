import type {
  AuthRequest,
  AuthResponse,
  OrderRequest,
  Order,
  MetricsResponse
} from '@/types/api';
import type { SimulationSummary } from '@/types/simulation';

// Configure your backend URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getToken() {
    return this.token;
  }

  private async request<T>(
      endpoint: string,
      options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.setToken(null);
        window.location.href = '/login';
      }

      // Try to get error message from response
      const text = await response.text();
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;

      try {
        const errorData = JSON.parse(text);
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is plain text, use it as error message
        if (text) {
          errorMessage = text;
        }
      }

      throw new Error(errorMessage);
    }

    // Handle empty responses
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  // Auth endpoints
  async register(credentials: AuthRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    this.setToken(response.token);
    return response;
  }

  async login(credentials: AuthRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    this.setToken(response.token);
    return response;
  }

  logout() {
    this.setToken(null);
  }

  // Order endpoints
  async createOrder(order: OrderRequest): Promise<Order> {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async getOrders(): Promise<Order[]> {
    return this.request<Order[]>('/orders');
  }

  // Metrics endpoints
  async getMetrics(): Promise<MetricsResponse> {
    return this.request<MetricsResponse>('/metrics');
  }

  // Simulation endpoints
  async runSmartSimulation(testCases: number = 100): Promise<SimulationSummary> {
    return this.request<SimulationSummary>(`/simulation/smart?tests=${testCases}`, {
      method: 'POST',
    });
  }

  async runFifoSimulation(testCases: number = 100): Promise<SimulationSummary> {
    return this.request<SimulationSummary>(`/simulation/fifo?tests=${testCases}`, {
      method: 'POST',
    });
  }
}

export const api = new ApiClient();