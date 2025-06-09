"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import { useCallback } from "react";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: "🏠" },
  { path: "/dashboard/swipe", label: "Swipe", icon: "🤝" },
  { path: "/dashboard/saved", label: "Saved", icon: "💾" },
  { path: "/dashboard/startup", label: "My Startup", icon: "🚀" },
  { path: "/dashboard/chat", label: "Chat", icon: "💬" },
  { path: "/dashboard/news", label: "News", icon: "📰" },
  { path: "/profile", label: "Profile", icon: "👤" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [signOut, router]);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-black">
        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="fixed top-4 left-4 z-50 p-2 bg-blue-900/50 rounded-lg md:hidden"
        >
          <span className="text-2xl">☰</span>
        </button>

        {/* Sidebar */}
        <aside
          className={`${
            open ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-900/50 backdrop-blur-xl border-r border-blue-900/20 transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
        >
          <nav className="h-full flex flex-col p-4">
            <div className="mb-8">
              <Link
                href="/dashboard"
                className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
              >
                Cofindr
              </Link>
            </div>

            {/* Menu items */}
            <div className="flex-1 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-2 rounded-lg p-2.5 transition-all transform hover:scale-[1.02] ${
                    pathname === item.path
                      ? "bg-blue-600/80 text-white shadow-lg shadow-blue-500/20"
                      : "text-gray-300 hover:bg-blue-900/30"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 rounded-lg p-2.5 text-gray-300 hover:bg-red-900/30 hover:text-red-400 transition-all mt-4"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>

            {/* Footer */}
            <div className="mt-auto pt-4 text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Cofindr
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-black">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

        {/* Mobile overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
