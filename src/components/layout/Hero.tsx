'use client'

import Link from 'next/link'
import { PlayCircle, ChevronRight, Search, Database, Brain, LineChart, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)
    }, 3000) // Change step every 3 seconds

    return () => clearInterval(interval)
  }, [])

  if (!isMounted) return null

  const steps = [
    {
      icon: Search,
      title: "Query On-Chain Data",
      description: "Search across wallets, tokens, and transactions",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Database,
      title: "Process Blockchain Activity",
      description: "Aggregate and structure raw chain data",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Identify patterns and anomalies",
      color: "from-pink-500 to-orange-500"
    },
    {
      icon: LineChart,
      title: "Generate Insights",
      description: "Get actionable trading intelligence",
      color: "from-orange-500 to-blue-500"
    }
  ]

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 bg-gradient-to-br from-[#1A0B2E] via-[#4A154B] to-[#2D1B69]"
      />
      
      {/* Animated Gradient Orbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="fixed inset-0"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px]" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px]" />
      </motion.div>

      {/* Content */}
      <div className="relative mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
        <motion.h1 
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 leading-tight py-1"
        >
          The On-Chain Intelligence Engine
        </motion.h1>
        
        <motion.p 
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-white/70 max-w-[800px] mx-auto mb-12 text-center"
        >
          Shadow AI turns blockchain data into actionable insight. Analyze token activity, wallet flows, or ecosystem trends to uncover hidden patterns and make smarter trading decisions.
        </motion.p>
        
        {/* Buttons */}
        <motion.div 
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link 
            href="/platform"
            className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-lg font-medium hover:bg-white/90 transition-all duration-300 cursor-pointer"
          >
            <PlayCircle className="group-hover:scale-110 transition-transform duration-300" size={20} />
            <span>Launch App</span>
          </Link>
          <Link 
            href="/platform"
            className="group flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-lg font-medium hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            <span>Try Demo</span>
            <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </Link>
        </motion.div>

        {/* Workflow Animation */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="w-full max-w-[1200px] mx-auto"
        >
          <div className="relative h-[250px] rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 bg-black/30">
            {/* Workflow Steps */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-between w-full px-16">
                {steps.map((step, index) => {
                  const isActive = currentStep === index
                  const Icon = step.icon
                  
                  return (
                    <div key={index} className="flex items-center">
                      <div className="flex flex-col items-center w-44">
                        <motion.div
                          animate={{
                            boxShadow: isActive 
                              ? "0 0 25px rgba(147, 51, 234, 0.5)" 
                              : "0 0 0 rgba(147, 51, 234, 0)",
                          }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut"
                          }}
                          className={`relative p-4 rounded-full bg-gradient-to-r ${step.color} mb-4 transform-gpu`}
                        >
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1.2, opacity: 0 }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeOut"
                              }}
                              className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color}`}
                            />
                          )}
                          <Icon size={24} className="text-white relative z-10" />
                        </motion.div>
                        <div className="text-center">
                          <motion.h3
                            animate={{
                              color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.7)"
                            }}
                            transition={{ duration: 0.3 }}
                            className="font-semibold text-lg mb-2"
                          >
                            {step.title}
                          </motion.h3>
                          <motion.p
                            animate={{
                              opacity: isActive ? 1 : 0.7
                            }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-white/70"
                          >
                            {step.description}
                          </motion.p>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <motion.div
                          animate={{
                            opacity: [0.3, 1, 0.3],
                            x: [0, 10, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5,
                            ease: "linear"
                          }}
                          className="mx-8"
                        >
                          <ArrowRight className="text-white/50" size={20} />
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Animated Gradient Line */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-0 h-1 w-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero 