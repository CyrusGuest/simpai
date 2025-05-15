'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SearchResult {
  chatId: string
  messageContent: string
  timestamp: Date
  role: 'user' | 'assistant'
}

interface SearchResultsProps {
  results: SearchResult[]
  isVisible: boolean
  onResultClick: (chatId: string) => void
}

const SearchResults = ({ results, isVisible, onResultClick }: SearchResultsProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isVisible) return null

  return (
    <div className="mt-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400/20 scrollbar-track-transparent">
      {results.length === 0 ? (
        <div className="text-white/50 text-sm p-3">
          No results found
        </div>
      ) : (
        <div className="space-y-1">
          {results.map((result, index) => (
            <motion.div
              key={`${result.chatId}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
              onClick={() => onResultClick(result.chatId)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80 line-clamp-2">
                    {result.messageContent}
                  </p>
                  <p className="text-xs text-pink-400/70 mt-1 flex items-center gap-1">
                    {result.role === 'assistant' ? '💝 Simp AI' : '👤 You'}
                    <span className="inline-block mx-1">•</span>
                    {new Date(result.timestamp).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults 