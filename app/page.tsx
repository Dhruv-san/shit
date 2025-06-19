"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Optionally, check auth state here if you have a custom hook or context
    // For now, just leave as landing page
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-5xl font-bold text-blue-500">CoFindr</h1>
      <p className="text-gray-400 text-center max-w-md mt-4">
        Match with co-founders based on vision, skill, and startup goals.
      </p>
      <div className="mt-8 space-x-4">
        <Link href="/login">
          <button className="bg-white text-black px-5 py-2 rounded hover:bg-gray-300">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-500">
            Sign Up
          </button>
        </Link>
      </div>
    </main>
  );
}