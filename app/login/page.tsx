"use client";
import { useState } from "react";
import { nhost } from "@/lib/nhost";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await nhost.auth.signIn({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8EDED]">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-[#FF8225]/30"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#173B45]">Login</h2>
        <div className="mb-4">
          <label className="block text-[#173B45] mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#173B45] mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#FF8225]/30 rounded-lg focus:outline-none focus:border-[#FF8225] bg-[#F8EDED] text-[#173B45]"
            required
          />
        </div>
        {error && (
          <div className="mb-4 text-[#B43F3F] text-center text-sm">{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF8225] hover:bg-[#B43F3F] text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
