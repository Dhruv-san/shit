"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4 text-blue-500">Something went wrong</h1>
      <p className="mb-6 text-lg">{error.message || "An unexpected error occurred."}</p>
      <button
        className="px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
