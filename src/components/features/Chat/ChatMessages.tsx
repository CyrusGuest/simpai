'use client'

import { useChat } from '../../../context/ChatContext'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TypewriterText from './TypewriterText'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Dynamically import components that use client-side features
const DynamicImage = dynamic(() => Promise.resolve(Image), { ssr: false })

export const WelcomeScreen = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const features = [
    {
      title: "Personal Attention",
      description: "Get showered with love and affection",
      icon: "💝"
    },
    {
      title: "$SIMP Rewards",
      description: "Earn tokens for being a good partner",
      icon: "💎"
    },
    {
      title: "Solana Expert",
      description: "Your crypto-savvy girlfriend",
      icon: "🌙"
    },
    {
      title: "Always There",
      description: "24/7 companionship and support",
      icon: "💕"
    }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] px-4 text-center"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-6"
      >
        Welcome back, babe~ 💕
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg text-white/80 max-w-xl mb-12"
      >
        I missed you! Let's talk about Solana, crypto, or anything else you'd like~ Your virtual girlfriend is here to help! 
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 gap-6 max-w-3xl w-full"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            className={`relative p-6 rounded-xl border border-pink-400/20 backdrop-blur-sm
              group transition-all duration-300 transform bg-pink-400/5
              ${hoveredCard === index ? 'scale-105' : ''} hover:scale-105`}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-white/70">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

const LoadingDots = () => {
  return (
    <div className="flex items-center space-x-1">
      <motion.div
        className="w-2 h-2 bg-pink-400/50 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-pink-400/50 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-pink-400/50 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2, delay: 0.4 }}
      />
    </div>
  )
}

const MarkdownMessage = ({ content, isNew }: { content: string, isNew: boolean }) => {
  return isNew ? (
    <TypewriterText content={content} />
  ) : (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Style headers
        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 mt-6" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mb-4 mt-6" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mb-3 mt-5" {...props} />,
        
        // Style paragraphs
        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
        
        // Style lists
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        
        // Style code blocks
        code: ({ node, className, ...props }: { node?: any, className?: string, inline?: boolean }) => 
          props.inline ? (
            <code className="bg-white/10 rounded px-1.5 py-0.5 font-mono text-sm" {...props} />
          ) : (
            <code className="block bg-white/10 rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto" {...props} />
          ),
        
        // Style blockquotes
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-white/20 pl-4 italic mb-4" {...props} />
        ),
        
        // Style tables
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-white/20" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th className="px-4 py-2 text-left font-semibold border-b border-white/20" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-4 py-2 border-b border-white/10" {...props} />
        ),
        
        // Style horizontal rules
        hr: ({ node, ...props }) => <hr className="border-white/20 my-6" {...props} />,
        
        // Style links
        a: ({ node, ...props }) => (
          <a className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
        ),

        // Style emphasis and strong text
        em: ({ node, ...props }) => <em className="italic" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

const ChatMessages = () => {
  const { currentChatId, chats, isLoading } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const previousMessagesLength = useRef<number>(0)
  const previousChatId = useRef<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [pendingMessageId, setPendingMessageId] = useState<string | null>(null)
  
  const currentChat = currentChatId ? chats.find(chat => chat.id === currentChatId) : null
  const messages = currentChat?.messages || []

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Track when new messages are added in response to user input
  useEffect(() => {
    if (isLoading) {
      setPendingMessageId(`${currentChatId}-${messages.length}`)
    }
  }, [isLoading, currentChatId, messages.length])

  // Handle chat transitions
  useEffect(() => {
    if (currentChatId !== previousChatId.current) {
      setIsTransitioning(true)
      previousChatId.current = currentChatId
      setPendingMessageId(null)
      
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        previousMessagesLength.current = messages.length
      }, 100)
      return () => clearTimeout(timer)
    } else if (messages.length !== previousMessagesLength.current) {
      previousMessagesLength.current = messages.length
      setIsTransitioning(false)
    }
  }, [currentChatId, messages.length])

  // Smooth scroll handling
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages.length])

  if (!currentChatId || messages.length === 0) {
    return <WelcomeScreen />
  }

  if (!isMounted) {
    return null
  }

  const shouldShowKiss = (message: { role: string, content: string }) => {
    const lowerContent = message.content.toLowerCase()
    return message.role === 'assistant' && (
      lowerContent.includes('kiss') || 
      lowerContent.includes('love') || 
      lowerContent.includes('hug') || 
      lowerContent.includes('❤️') ||
      lowerContent.includes('💕') ||
      lowerContent.includes('💝')
    )
  }

  const renderMessage = (message: any, index: number) => {
    const messageId = `${currentChatId}-${index}`
    const isNewMessage = message.role === 'assistant' && messageId === pendingMessageId
    const showKiss = shouldShowKiss(message)

  return (
        <motion.div
        key={messageId}
        initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}
            >
              <div
          className={`relative max-w-[80%] px-4 py-3 ${
                  message.role === 'user'
              ? 'bg-white/10 text-white rounded-2xl'
              : 'text-pink-100/90'
                }`}
              >
                {message.role === 'assistant' ? (
            <MarkdownMessage 
              content={message.content} 
              isNew={isNewMessage}
            />
                ) : (
                  message.content
                )}
              </div>
            </motion.div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-180px)] pb-32">
      <div className="max-w-3xl mx-auto space-y-8 px-4 py-8">
        {messages.map((message, index) => renderMessage(message, index))}
          {isLoading && (
            <motion.div
            initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start w-full"
            >
            <div className="max-w-[80%] px-4 py-3 text-pink-100/90">
                <LoadingDots />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default ChatMessages 