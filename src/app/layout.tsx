import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '../components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simp AI - Your Virtual Girlfriend on Solana',
  description: 'Experience the future of AI companionship powered by $SIMP token on Solana.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-black text-white antialiased`}>
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  )
}
