import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-background to-orange-50/30 dark:from-stone-950 dark:via-background dark:to-stone-950">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
