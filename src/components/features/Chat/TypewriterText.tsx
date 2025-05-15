'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface TypewriterTextProps {
  content: string
  speed?: number // base characters per second
}

const TypewriterText = ({ content, speed = 50 }: TypewriterTextProps) => {
  const [displayedContent, setDisplayedContent] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    setDisplayedContent('')
    setIsComplete(false)
    setIsPaused(false)
    
    let currentIndex = 0
    let timeoutId: NodeJS.Timeout

    const typeNextCharacter = () => {
      if (currentIndex < content.length) {
        const char = content[currentIndex]
        setDisplayedContent(content.slice(0, currentIndex + 1))
        currentIndex++

        const delay = char === '.' ? 150 : 
                     char === ',' ? 100 :
                     char === ' ' ? 25 : 15

        timeoutId = setTimeout(typeNextCharacter, delay)
      } else {
        setIsComplete(true)
      }
    }

    timeoutId = setTimeout(typeNextCharacter, 50)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [content, speed])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
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
        {displayedContent}
      </ReactMarkdown>
      {!isComplete && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 0.8
          }}
          className="inline-block ml-1 -mb-1 w-2 h-4 bg-white/70"
        />
      )}
    </motion.div>
  )
}

export default TypewriterText 