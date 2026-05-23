// frontend/app/layout.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: Root layout for entire app
// Loads fonts, sets metadata, wraps app with providers

import type { Metadata } from 'next'
import { Space_Grotesk, Rajdhani, Share_Tech_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { QueryProvider } from '@/providers/QueryProvider'
import { WalletProvider } from '@/providers/WalletProvider'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import './globals.css'

// Font definitions
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const shareMonoTech = Share_Tech_Mono({
  variable: '--font-share-mono',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: `${SITE_NAME} - Solana Trading Terminal`,
  description: SITE_DESCRIPTION,
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${rajdhani.variable} ${shareMonoTech.variable}`}
    >
      <body className="bg-ash-950 text-ash-100 font-rajdhani">
        <QueryProvider>
          <WalletProvider>
            {children}
            <Toaster position="bottom-right" />
          </WalletProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
