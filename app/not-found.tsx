import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4 text-blue-500">404 - Not Found</h1>
      <p className="mb-6 text-lg">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition">Go Home</Link>
    </div>
  );
}
