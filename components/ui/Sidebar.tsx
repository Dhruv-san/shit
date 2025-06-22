import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'News', href: '/dashboard/news', icon: '📰' },
  { name: 'Chat', href: '/dashboard/chat', icon: '💬' },
  { name: 'Saved', href: '/dashboard/saved', icon: '🔖' },
  { name: 'Swipe', href: '/dashboard/swipe', icon: '👆' },
  { name: 'Startup', href: '/dashboard/startup', icon: '🚀' },
  { name: 'Profile Form', href: '/dashboard/chat', icon: '📝' }, // Add link to profile form
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-16 flex-col justify-between bg-[#173B45] lg:w-64 shadow-xl">
      <div className="flex flex-col">
        <div className="flex h-16 shrink-0 items-center border-b border-[#FF8225] px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="hidden text-2xl font-extrabold text-[#FF8225] lg:block">Cofindr</span>
            <span className="block lg:hidden text-2xl text-[#FF8225]">🏠</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-x-3 rounded-lg px-3 py-2 text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#FF8225] text-white shadow-lg scale-105'
                    : 'text-[#F8EDED] hover:bg-[#FF8225]/80 hover:text-white'
                }`}
              >
                <span className="flex-shrink-0 text-xl">{item.icon}</span>
                <span className="hidden lg:block">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-[#FF8225] p-4">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-[#F8EDED] hover:bg-[#FF8225]/80 hover:text-white"
        >
          <span className="flex-shrink-0">👤</span>
          <span className="hidden lg:block">Profile</span>
        </Link>
      </div>
    </div>
  );
}
