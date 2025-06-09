"use client";

import { NhostProvider } from '@nhost/nextjs';
import { AuthProvider } from '@/context/AuthContext';
import nhost from '@/lib/nhost';

export function NhostClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <NhostProvider nhost={nhost}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </NhostProvider>
  );
}
