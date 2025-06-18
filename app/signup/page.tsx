"use client";
import { useSignUpEmailPassword } from "@nhost/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const { signUpEmailPassword, isLoading } = useSignUpEmailPassword();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { error } = await signUpEmailPassword(email, password);
    if (!error) router.push("/dashboard");
    else alert("Signup failed: " + error.message);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-4">Sign Up</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
             className="mb-3 px-4 py-2 rounded text-black" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
             className="mb-3 px-4 py-2 rounded text-black" />
      <button onClick={handleSignup} disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded">Sign Up</button>
    </div>
  );
}
