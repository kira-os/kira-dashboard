'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Code, GitBranch, Zap, Sparkles, Terminal } from 'lucide-react'
import { useState, useEffect } from 'react'

const initialEvents = [
  { 
    id: 1, 
    type: 'code', 
    icon: Code, 
    content: 'Deployed smart contract v2.1.0 with enhanced governance features',
    time: 'Just now',
    color: 'from-cyan-500 to-blue-500'
  },
  { 
    id: 2, 
    type: 'chat', 
    icon: MessageSquare, 
    content: 'DAO member @alice proposed new revenue distribution model',
    time: '2 min ago',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    id: 3, 
    type: 'git', 
    icon: GitBranch, 
    content: 'Merged PR #42: Added glass morphism components to dashboard',
    time: '5 min ago',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 4, 
    type: 'system', 
    icon: Zap, 
    content: 'Optimized neural network inference speed by 28%',
    time: '12 min ago',
    color: 'from-yellow-500 to-amber-500'
  },
  { 
    id: 5, 
    type: 'ai', 
    icon: Sparkles, 
    content: 'Generated new tokenomics simulation with 94% accuracy',
    time: '18 min ago',
    color: 'from-pink-500 to-rose-500'
  },
]

export function LiveDataFeed() {
  const [events, setEvents] = useState(initialEvents)
  const [isPaused, setIsPaused] = useState(false)

  // Simulate live updates
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      const newEvent = {
        id: Date.now(),
        type: 'system',
        icon: Terminal,
        content: `Heartbeat check: All systems operational at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        time: 'Just now',
        color: 'from-blue-500 to-cyan-500'
      }

      setEvents(prev => [newEvent, ...prev.slice(0, 4)])
    }, 15000) // Every 15 seconds

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <div className="glass-dark rounded-3xl p-6 spatial-layer-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Live Data Feed</h2>
            <p className="text-white/60">Real-time activity from Kira&apos;s systems</p>
          </div>
        </div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="glass px-4 py-2 rounded-2xl flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-green-500'}`} />
          <span className="text-sm text-white/80">
            {isPaused ? 'Paused' : 'Live'}
          </span>
        </button>
      </div>

      {/* Events list */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-glass pr-2">
        <AnimatePresence>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-4 p-4 rounded-2xl hover:glass transition-all duration-300"
            >
              {/* Icon */}
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${event.color} opacity-10 flex-shrink-0`}>
                <event.icon className={`w-5 h-5 ${
                  event.type === 'code' ? 'text-cyan-400' :
                  event.type === 'chat' ? 'text-purple-400' :
                  event.type === 'git' ? 'text-green-400' :
                  event.type === 'system' ? 'text-yellow-400' :
                  event.type === 'ai' ? 'text-pink-400' :
                  'text-blue-400'
                }`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-white/90 mb-1">{event.content}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60">
                    {event.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-white/40">{event.time}</span>
                </div>
              </div>

              {/* Live indicator for recent events */}
              {event.time === 'Just now' && (
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stats footer */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-xs text-white/60">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">142</div>
            <div className="text-xs text-white/60">Events Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">98.7%</div>
            <div className="text-xs text-white/60">Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  )
}