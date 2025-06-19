'use client';

import { Sidebar } from '@/components/ui/Sidebar';
import { Header } from '@/components/ui/Header';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Get the current page title from the path
  const getTitle = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length < 2) return 'Dashboard';
    return segments[1].charAt(0).toUpperCase() + segments[1].slice(1);
  };

  return (
    <div className="relative flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header title={getTitle()} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-800">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
