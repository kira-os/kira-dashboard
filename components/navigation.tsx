'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  Brain, 
  BarChart3, 
  Users, 
  Wallet, 
  Settings, 
  Menu, 
  X,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: Brain, label: 'Intelligence', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: Users, label: 'DAO', active: false },
  { icon: Wallet, label: 'Treasury', active: false },
  { icon: Settings, label: 'Systems', active: false },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden glass p-3 rounded-2xl spatial-layer-1"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar navigation */}
      <motion.nav
        initial={false}
        animate={{
          x: isOpen ? 0 : -300,
        }}
        className="fixed left-0 top-0 h-full w-80 z-40 lg:relative lg:translate-x-0"
      >
        <div className="h-full glass-dark border-r border-white/10 p-6 flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl gradient-border">
              <div className="w-full h-full rounded-2xl glass flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-neon-cyan" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold neon-text">Kira</h1>
              <p className="text-sm text-white/60">Interdimensional Dashboard</p>
            </div>
          </div>

          {/* Navigation items */}
          <div className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={cn(
                  'w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-300',
                  item.active
                    ? 'glass bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20'
                    : 'hover:glass hover:bg-white/5'
                )}
              >
                <item.icon className={cn(
                  'w-5 h-5',
                  item.active ? 'text-neon-cyan' : 'text-white/60'
                )} />
                <span className={cn(
                  'font-medium',
                  item.active ? 'text-white' : 'text-white/80'
                )}>
                  {item.label}
                </span>
                {item.active && (
                  <motion.div
                    layoutId="activeNav"
                    className="ml-auto w-2 h-2 rounded-full bg-neon-cyan"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Bottom section */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-full glass p-4 rounded-2xl flex items-center justify-between spatial-layer-1"
            >
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-neon-purple" />
                ) : (
                  <Sun className="w-5 h-5 text-neon-cyan" />
                )}
                <span className="text-white/80">
                  {theme === 'dark' ? 'Dark' : 'Light'} Mode
                </span>
              </div>
              <div className="relative w-12 h-6 rounded-full bg-white/10">
                <motion.div
                  className="absolute top-1 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                  animate={{
                    x: theme === 'dark' ? 28 : 4,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
            </button>

            {/* Status indicator */}
            <div className="glass p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">System Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-green-400">Live</span>
                </div>
              </div>
              <div className="text-xs text-white/40">
                Autonomous • 24/7 • Evolving
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}