"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !user && isClient) {
      console.log('No user found, redirecting to login');
      router.replace('/login');
    }
  }, [loading, user, router, isClient]);

  // Don't render anything on server or during initial client render
  if (!isClient) {
    return null;
  }

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-gray-900/80 p-8 rounded-2xl shadow-xl flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-blue-200">Loading...</p>
        </div>
      </div>
    );
  }

  // If we have a user, render the protected content
  if (user) {
    return <>{children}</>;
  }

  // Otherwise, render nothing (redirect will happen)
  return null;
}