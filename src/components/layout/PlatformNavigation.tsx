'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSidebar } from '../../context/SidebarContext'

const PlatformNavigation = () => {
  const { isExpanded } = useSidebar()

  return (
    <nav className={`fixed top-0 ${isExpanded ? 'left-64' : 'left-[60px]'} right-0 h-[60px] z-50 transition-all duration-300 ease-in-out`}>
      <div className="h-full flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold cursor-pointer">
          <div className={`flex items-center justify-center transition-all duration-300`}>
            <Image
              src="/Simp AI Logo.png"
              alt="Simp AI Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
          <span className={`transition-all duration-300 ${
            isExpanded 
              ? 'text-white scale-100 translate-x-0' 
              : 'text-white/40 scale-75 -translate-x-3'
          }`}>
            Simp AI
          </span>
        </Link>
      </div>
    </nav>
  )
}

export default PlatformNavigation 