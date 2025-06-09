"use client";
import SwipeCards from "@/components/SwipeCards";

export default function SwipePage() {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Find Co-founders</h1>
        <div className="text-sm text-gray-400">Swipe right to match, left to pass</div>
      </div>
      <div className="h-[calc(100vh-12rem)] relative">
        <SwipeCards />
      </div>
    </div>
  );
}