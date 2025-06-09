"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from '@nhost/nhost-js';
import { nhost } from "@/lib/nhost";
import { signInWithProvider as authSignInWithProvider, signOut as authSignOut } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'google' | 'github' | 'linkedin') => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signIn: async () => {},
  signOut: async () => {},
  signInWithProvider: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    // Try to restore session from storage
    const session = nhost.auth.getSession();
    if (session?.user) {
      setUser(session.user);
    }

    // Subscribe to auth state changes
    const unsubscribe = nhost.auth.onAuthStateChanged((event, session) => {
      console.log('Auth state changed:', { event, user: session?.user });
      setUser(session?.user ?? null);
      setLoading(false);

      // Clear any previous errors when auth state changes
      setError(null);
    });

    // Set loading to false after initial check
    setLoading(false);

    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { error, session } = await nhost.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      if (session?.user) {
        setUser(session.user);
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await nhost.auth.signOut();
      if (error) throw error;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const signInWithProvider = async (provider: 'google' | 'github' | 'linkedin') => {
    try {
      setError(null);
      
      // Get the Codespaces URL or fallback to localhost
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : 'https://ominous-pancake-pjw5w9vvqgjq3w7r-3000.app.github.dev';

      const { error } = await nhost.auth.signIn({
        provider,
        options: {
          redirectTo: `${baseUrl}/dashboard`,
        }
      });
      if (error) throw error;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to sign in';
      setError(new Error(errorMessage));
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signOut, signInWithProvider }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


