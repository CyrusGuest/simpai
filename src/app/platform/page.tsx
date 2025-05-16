'use client'

import { WelcomeScreen } from '../../components/features/Chat/ChatMessages'
import ChatHistory from '../../components/features/Chat/ChatHistory'
import PlatformNavigation from '../../components/layout/PlatformNavigation'
import { useSidebar } from '../../context/SidebarContext'
import ChatInput from '../../components/features/Chat/ChatInput'
import WalletInfo from '../../components/WalletInfo'
import { motion } from 'framer-motion'

export default function PlatformPage() {
  const { isExpanded } = useSidebar()
  
  return (
    <main className="min-h-screen bg-[#150b1d] flex relative overflow-hidden">
      {/* Dreamy animated background */}
      <div className="fixed inset-0">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-600/10 to-indigo-500/10 opacity-40" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-pink-400/20 rounded-full filter blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-400/20 rounded-full filter blur-[100px] animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/20 rounded-full filter blur-[110px] animate-pulse delay-[2000ms]" />
        
        {/* Sparkle effect */}
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] opacity-[0.03] [background-size:32px_32px]" />
      </div>

      <ChatHistory />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isExpanded ? 'ml-64' : 'md:ml-[64px]'}`}>
        <PlatformNavigation />
        <div className="flex-1 overflow-hidden hidden md:inline-block">
          <WelcomeScreen />
        </div>
        <div className='md:hidden gradient-to-br text-purple-400 font-bold absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 from-pink-500/10 via-purple-600/10 to-indigo-500/10 opacity-40 text-3xl w-full text-center'>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-6">Welcome back, babe~ 💕</h1>
        </div>
        <div className="fixed md:sticky bottom-0 w-full md:w-auto z-20 transition-all duration-300 ease-in-out">
          <div className="px-4 py-6 bg-gradient-to-t from-[#150b1d] via-[#150b1d]/80 to-transparent">
            <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/5 rounded-2xl shadow-lg border border-pink-400/20 hover:border-pink-400/30 transition-colors">
              <ChatInput />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div 
        className="fixed top-20 right-10 w-32 h-32 pointer-events-none opacity-[0.03]"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <img src="/heart-pattern.svg" alt="" className="w-full h-full" />
      </motion.div>
    </main>
  )
} 