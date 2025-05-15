'use client'

import Link from 'next/link'
import Image from 'next/image'
import { User, PlayCircle } from 'lucide-react'

const Navigation = () => {
  const navItems = [
    { label: 'Platform', href: '/platform' },
    { label: 'Docs', href: '/docs' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Features', href: '/features' },
    { label: 'Enterprise', href: '/enterprise' },
    { label: 'Blog', href: '/blog' },
    { label: 'Forum', href: '/forum' },
    { label: 'Careers', href: '/careers' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 h-[60px] bg-black/90 backdrop-blur-sm z-50 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white cursor-pointer">
            <Image
              src="/Shadow AI Logo.png"
              alt="Shadow AI Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            Shadow AI
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
            <User size={18} />
            <span className="hidden sm:inline">Account</span>
          </button>
          <Link href="/platform" className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-colors cursor-pointer">
            <PlayCircle size={18} />
            <span className="hidden sm:inline">Launch App</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 