import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';
import type { AuthRequest } from '@/types/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: AuthRequest) => Promise<void>;
  register: (credentials: AuthRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has a token on mount
    const token = api.getToken();
    setIsAuthenticated(!!token);
  }, []);

  const login = async (credentials: AuthRequest) => {
    await api.login(credentials);
    setIsAuthenticated(true);
  };

  const register = async (credentials: AuthRequest) => {
    await api.register(credentials);
    setIsAuthenticated(true);
  };

  const logout = () => {
    api.logout();
    setIsAuthenticated(false);
  };

  return (
      <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}