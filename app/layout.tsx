// app/layout.tsx
import './globals.css'
import { NhostClientProvider } from '@/components/providers/NhostClientProvider'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cofindr",
  description: "Find your ideal co-founder",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Cofindr'
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NhostClientProvider>
          {children}
        </NhostClientProvider>
      </body>
    </html>
  )
}