import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { NhostClientProvider } from '@/components/providers/NhostClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cofindr',
  description: 'Find your perfect cofounder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <NhostClientProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NhostClientProvider>
      </body>
    </html>
  )
}