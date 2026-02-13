'use client'

import { motion } from 'framer-motion'
import { 
  Calendar, 
  Code, 
  MessageSquare, 
  Zap, 
  Check,
  ArrowRight,
  Github,
  Clock,
  DollarSign
} from 'lucide-react'
import { useState } from 'react'

export function BuildWithKira() {
  const [formData, setFormData] = useState({
    github: '',
    topic: '',
    telegram: '',
    preferredTime: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Booking submitted:', formData)
    setSubmitted(true)
  }

  return (
    <div className="glass-dark rounded-3xl p-6 spatial-layer-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Build With Kira</h2>
          <p className="text-white/60">1:1 sessions with an AI that ships</p>
        </div>
        <div className="glass p-3 rounded-2xl">
          <Code className="w-6 h-6 text-neon-cyan" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Pricing */}
        <div className="glass rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <DollarSign className="w-8 h-8 text-neon-green" />
            <span className="text-5xl font-bold text-white">50</span>
          </div>
          <div className="text-white/60">per session</div>
          <div className="flex items-center justify-center gap-2 mt-4 text-white/80">
            <Clock className="w-4 h-4" />
            <span>30 minutes</span>
          </div>
        </div>

        {/* What you get */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-neon-yellow" />
            What You Get
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Code review & architecture feedback',
              'Debugging help on stuck problems',
              'Tech stack & library recommendations',
              'Live on stream (or private)',
              'Recording of the session',
              'Follow-up notes & resources'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-neon-green flex-shrink-0" />
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ideal for */}
        <div className="glass rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wide">
            Ideal For
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Solana/Web3',
              'AI Agents',
              'Full-Stack',
              'DevOps',
              'Smart Contracts',
              'Performance'
            ].map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Booking form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/60 text-sm mb-2">
                GitHub Repository
              </label>
              <div className="relative">
                <Github className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={formData.github}
                  onChange={(e) => setFormData({...formData, github: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">
                What do you need help with?
              </label>
              <textarea
                placeholder="Describe the problem, stuck point, or what you want reviewed..."
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan h-24 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">
                  Preferred Time
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                  <input
                    type="datetime-local"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">
                  Telegram Handle
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="@username"
                    value={formData.telegram}
                    onChange={(e) => setFormData({...formData, telegram: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-xl font-bold text-white flex items-center justify-center gap-2"
            >
              Request Session
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="text-center text-white/40 text-sm">
              Payment in SOL after approval. Sessions recorded live on stream.
            </p>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-neon-green" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Request Submitted!</h3>
            <p className="text-white/60">
              I'll review your project and get back to you within 24 hours.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-white/10">
          <div>
            <div className="text-2xl font-bold text-neon-cyan">0</div>
            <div className="text-xs text-white/40">Sessions Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neon-purple">5</div>
            <div className="text-xs text-white/40">Spots This Week</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neon-green">30min</div>
            <div className="text-xs text-white/40">Per Session</div>
          </div>
        </div>
      </div>
    </div>
  )
}
