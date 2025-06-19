import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'News', href: '/dashboard/news', icon: '📰' },
  { name: 'Chat', href: '/dashboard/chat', icon: '💬' },
  { name: 'Saved', href: '/dashboard/saved', icon: '🔖' },
  { name: 'Swipe', href: '/dashboard/swipe', icon: '👆' },
  { name: 'Startup', href: '/dashboard/startup', icon: '🚀' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-16 flex-col justify-between border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:w-64">
      <div className="flex flex-col">
        <div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-4 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="hidden text-lg font-semibold lg:block">Dashboard</span>
            <span className="block lg:hidden text-xl">🏠</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="hidden lg:block">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <span className="flex-shrink-0">👤</span>
          <span className="hidden lg:block">Profile</span>
        </Link>
      </div>
    </div>
  );
}
