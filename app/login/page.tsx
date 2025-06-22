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

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { error } = await nhost.auth.signIn({ provider: 'google' });
      if (error) setError(error.message);
      // Nhost will redirect automatically if configured
    } catch (err) {
      setError("Google login failed");
    }
    setLoading(false);
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
          className="w-full bg-[#FF8225] hover:bg-[#B43F3F] text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 mb-3"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-white border border-[#FF8225] text-[#173B45] font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-[#FF8225]/10 disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block"><g><path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.1-6.1C34.5 5.5 29.5 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5c11 0 20.5-8.5 20.5-20.5 0-1.4-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.8 13 24 13c2.7 0 5.2.9 7.2 2.4l6.1-6.1C34.5 5.5 29.5 3.5 24 3.5c-7.2 0-13.4 3.1-17.7 8.1z"/><path fill="#FBBC05" d="M24 44.5c5.5 0 10.5-1.9 14.4-5.2l-6.7-5.5c-2 1.4-4.5 2.2-7.7 2.2-5.6 0-10.3-3.8-12-9H6.2v5.7C10.5 40.9 16.7 44.5 24 44.5z"/><path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.1-6.1C34.5 5.5 29.5 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5c11 0 20.5-8.5 20.5-20.5 0-1.4-.1-2.7-.3-4z"/></g></svg>
          Continue with Google
        </button>
      </form>
    </div>
  );
}
