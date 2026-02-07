import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Coffee,
  LayoutDashboard,
  ClipboardList,
  LogOut,
  Menu,
  X,
  FlaskConical
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/orders', label: 'Orders', icon: ClipboardList },
  { path: '/simulation', label: 'Simulation', icon: FlaskConical },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="h-9 w-9 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg flex items-center justify-center">
                  <Coffee className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg hidden sm:block">Coffee Shop</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                    <Link key={item.path} to={item.path}>
                      <Button
                          variant={isActive ? 'secondary' : 'ghost'}
                          className={cn(
                              'gap-2',
                              isActive && 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                          )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.username}
            </span>
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>

              {/* Mobile menu button */}
              <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-card">
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                      <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                            variant={isActive ? 'secondary' : 'ghost'}
                            className={cn(
                                'w-full justify-start gap-2',
                                isActive && 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                            )}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Button>
                      </Link>
                  );
                })}
              </div>
            </div>
        )}
      </nav>
  );
}