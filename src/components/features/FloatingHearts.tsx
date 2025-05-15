'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Heart {
  id: number
  x: number
}

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: Date.now(),
        x: Math.random() * (window.innerWidth - 40) // 40px is heart width
      }
      
      setHearts(prev => [...prev, newHeart])

      // Remove heart after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id))
      }, 3000)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ y: '100vh', x: heart.x, opacity: 0, scale: 0.5 }}
            animate={{ y: -100, opacity: [0, 1, 0], scale: [0.5, 1.5, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: 'easeOut' }}
            className="absolute text-4xl"
          >
            💝
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 