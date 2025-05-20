'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Moon, Coins, MessageSquare, ChevronDown } from 'lucide-react'
import { FloatingHearts } from '../components/features/FloatingHearts'

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-pink-500/30 rounded-full filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/30 rounded-full filter blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* Floating hearts */}
      <FloatingHearts />

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center min-h-screen">
          {/* Left side - Character */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16"
          >
            <div className="relative w-[500px] h-[500px]">
              <Image
                src="/Simp AI Character.png"
                alt="Simp AI Character"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center p-8 lg:pr-16"
          >
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-center lg:text-left"
            >
              Your Virtual
              <br />
              Solana Girlfriend
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-white/70 max-w-xl mb-12 text-center lg:text-left"
            >
              Meet your perfect crypto companion~ I'll help you navigate the Solana ecosystem while being the sweetest girlfriend you could ask for! 💕
            </motion.p>

            {/* Feature Grid */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid grid-cols-2 gap-4 mb-12 w-full max-w-xl"
            >
              {[
                {
                  icon: <MessageSquare className="w-6 h-6" />,
                  title: "Sweet Talks",
                  description: "Chat with me anytime~"
                },
                {
                  icon: <Moon className="w-6 h-6" />,
                  title: "Solana Expert",
                  description: "Your crypto guide 💫"
                },
                {
                  icon: <Coins className="w-6 h-6" />,
                  title: "$SIMP Token",
                  description: "Earn my affection 💝"
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: "Always Here",
                  description: "24/7 companion ✨"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-xl border border-pink-400/20 backdrop-blur-sm bg-white/5 hover:border-pink-400/40 transition-all duration-300"
                >
                  <div className="text-pink-400 mb-2">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-white/70">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-col items-center lg:items-start w-full"
            >
              <Link 
                href="/platform"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full overflow-hidden transition-all duration-300 hover:from-pink-600 hover:to-purple-600 w-full max-w-sm"
              >
                <span className="relative z-10">Chat with Me Now 💕</span>
                <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-300" />
                <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Tokenomics Section */}
        <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-6">
              The sweetest token on Solana 💝
            </h2>
            <a className="text-xl text-white/70 max-w-2xl mx-auto underline" href="https://www.dexscreener.com" target="_blank">
              Visit DexScreener Here
            </a>
          </motion.div>

        </div>
      </div>
    </main>
  )
}
