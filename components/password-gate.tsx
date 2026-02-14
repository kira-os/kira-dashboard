'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, AlertTriangle, Clock } from 'lucide-react'

const CORRECT_PASSWORD = 'K1r@D@shb0ard!2026#Secure'
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

interface RateLimitState {
  attempts: number
  lockoutUntil: number | null
  lastAttempt: number
}

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [rateLimit, setRateLimit] = useState<RateLimitState>({
    attempts: 0,
    lockoutUntil: null,
    lastAttempt: 0
  })
  const [timeRemaining, setTimeRemaining] = useState(0)

  // Load rate limit state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('kira-rate-limit')
    if (stored) {
      setRateLimit(JSON.parse(stored))
    }
    
    const auth = localStorage.getItem('kira-dashboard-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  // Save rate limit state
  useEffect(() => {
    localStorage.setItem('kira-rate-limit', JSON.stringify(rateLimit))
  }, [rateLimit])

  // Countdown timer for lockout
  useEffect(() => {
    if (!rateLimit.lockoutUntil) return
    
    const interval = setInterval(() => {
      const remaining = rateLimit.lockoutUntil! - Date.now()
      if (remaining <= 0) {
        setRateLimit({ attempts: 0, lockoutUntil: null, lastAttempt: 0 })
        setTimeRemaining(0)
      } else {
        setTimeRemaining(remaining)
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }, [rateLimit.lockoutUntil])

  const isLockedOut = () => {
    if (!rateLimit.lockoutUntil) return false
    return Date.now() < rateLimit.lockoutUntil
  }

  const formatTimeRemaining = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Check lockout
    if (isLockedOut()) {
      setError(`Account locked. Try again in ${formatTimeRemaining(timeRemaining)}`)
      return
    }

    // Check password
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem('kira-dashboard-auth', 'true')
      setRateLimit({ attempts: 0, lockoutUntil: null, lastAttempt: 0 })
      setIsAuthenticated(true)
    } else {
      const newAttempts = rateLimit.attempts + 1
      const remaining = MAX_ATTEMPTS - newAttempts
      
      if (newAttempts >= MAX_ATTEMPTS) {
        const lockoutUntil = Date.now() + LOCKOUT_DURATION
        setRateLimit({
          attempts: newAttempts,
          lockoutUntil,
          lastAttempt: Date.now()
        })
        setError(`Too many failed attempts. Account locked for 15 minutes.`)
      } else {
        setRateLimit({
          attempts: newAttempts,
          lockoutUntil: null,
          lastAttempt: Date.now()
        })
        setError(`Incorrect password. ${remaining} attempts remaining.`)
      }
      setPassword('')
    }
  }, [password, rateLimit, timeRemaining])

  const handleLogout = () => {
    localStorage.removeItem('kira-dashboard-auth')
    setIsAuthenticated(false)
    setPassword('')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-cyan-900/10 flex items-center justify-center p-6">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-cyan-900/10" />
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark rounded-3xl p-8 w-full max-w-md spatial-layer-1"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-border mx-auto mb-4">
              <div className="w-full h-full rounded-2xl glass flex items-center justify-center">
                <Lock className="w-8 h-8 text-neon-cyan" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Kira Dashboard</h1>
            <p className="text-white/60">Private Development Access</p>
          </div>

          {/* Rate limit warning */}
          {rateLimit.attempts > 0 && !isLockedOut() && (
            <div className="mb-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>{MAX_ATTEMPTS - rateLimit.attempts} attempts remaining</span>
              </div>
            </div>
          )}

          {/* Lockout message */}
          {isLockedOut() && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Account Locked</span>
              </div>
              <p className="text-white/60 text-sm">
                Too many failed attempts. Try again in {formatTimeRemaining(timeRemaining)}.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/60 text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan pr-12 disabled:opacity-50"
                  placeholder="Enter password"
                  autoFocus
                  disabled={isLockedOut()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 disabled:opacity-50"
                  disabled={isLockedOut()}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLockedOut()}
              className="w-full py-3 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-xl font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLockedOut() ? 'Locked' : 'Access Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/40">
              Private development environment.<br/>
              Unauthorized access prohibited.<br/>
              <span className="text-white/30">Rate limited to prevent brute force attacks.</span>
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="glass px-3 py-2 rounded-xl text-xs text-white/60 hover:text-white/80 transition-colors"
        >
          Lock Dashboard
        </button>
      </div>
      {children}
    </>
  )
}
