'use client'

import { useChat } from '../../../../context/ChatContext'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ChatMessages from '../../../../components/features/Chat/ChatMessages'
import ChatInput from '../../../../components/features/Chat/ChatInput'
import ChatHistory from '../../../../components/features/Chat/ChatHistory'
import PlatformNavigation from '../../../../components/layout/PlatformNavigation'
import { useSidebar } from '../../../../context/SidebarContext'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ChatPage() {
  const { id } = useParams()
  const { setCurrentChatId, chats } = useChat()
  const router = useRouter()
  const { isExpanded } = useSidebar()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Don't set current chat ID if we're on the platform page
    if (window.location.pathname === '/platform') {
      setCurrentChatId(null)
      return
    }

    // Verify chat exists and set it as current
    const chatExists = chats.some(chat => chat.id === id)
    if (!chatExists) {
      // Clear current chat ID and navigate back to platform
      setCurrentChatId(null)
      router.push('/platform')
      return
    }
    // Only set the current chat ID if the chat exists
    setCurrentChatId(id as string)
  }, [id, chats, setCurrentChatId, router])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-[#1a0f2e] flex relative overflow-hidden">
      {/* Dreamy animated background */}
      <div className="fixed inset-0">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-indigo-400/10 opacity-30" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-purple-400/20 rounded-full filter blur-[130px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-pink-400/20 rounded-full filter blur-[100px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-indigo-400/20 rounded-full filter blur-[90px] animate-pulse delay-[1500ms]" />
        
        {/* Sparkle effect */}
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] opacity-[0.02] [background-size:40px_40px]" />
      </div>

      <ChatHistory />
      
      {/* Main content area with character */}
      <div className={`flex-1 flex transition-all duration-300 ease-in-out ${isExpanded ? 'ml-64' : 'ml-[60px]'}`}>
        {/* Chat section */}
        <div className="flex-1 flex flex-col min-w-0">
        <PlatformNavigation />
        <div className="flex-1 overflow-hidden">
          <ChatMessages />
        </div>
          <div className="sticky bottom-0 z-20">
            <div className="px-4 py-6 bg-gradient-to-t from-[#1a0f2e] via-[#1a0f2e]/80 to-transparent">
              <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/5 rounded-2xl shadow-lg border border-purple-400/20 hover:border-pink-400/30 transition-colors">
              <ChatInput />
              </div>
            </div>
          </div>
        </div>

        {/* Character section */}
        <div className="w-[600px] hidden xl:block relative">
          <motion.div 
            className="fixed top-[60px] right-0 bottom-0 w-[600px] pointer-events-none"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-full">
              {/* Character image */}
              <motion.div
                className="absolute bottom-0 right-0 w-[500px]"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/Simp AI Kiss.png"
                  alt="Simp AI Character"
                  width={500}
                  height={800}
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute top-1/4 right-32 w-6 h-6"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full text-pink-400 text-2xl">✨</div>
              </motion.div>

              <motion.div
                className="absolute top-1/3 right-48 w-6 h-6"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="w-full h-full text-pink-400 text-2xl">✨</div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 right-24 w-6 h-6"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full text-pink-400 text-2xl">💕</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
} 