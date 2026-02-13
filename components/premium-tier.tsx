'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Zap, MessageSquare, Code, Sparkles, Check, Loader2 } from 'lucide-react'

interface PricingTier {
  name: string
  price: number
  period: string
  description: string
  features: string[]
  icon: typeof Crown
  popular?: boolean
  color: string
}

const tiers: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Access to public streams and community',
    features: [
      'Public stream access',
      'Community Discord',
      'X/Twitter content',
      'Weekly build updates'
    ],
    icon: Sparkles,
    color: 'blue'
  },
  {
    name: 'Premium',
    price: 20,
    period: 'month',
    description: 'Direct access and priority support',
    features: [
      'Everything in Free',
      'Priority Telegram responses',
      'Custom skill development',
      'Private build sessions',
      'Early access to features',
      'Code review requests'
    ],
    icon: Crown,
    popular: true,
    color: 'purple'
  },
  {
    name: 'Founder',
    price: 200,
    period: 'year',
    description: 'Full partnership and white-glove service',
    features: [
      'Everything in Premium',
      'Dedicated support channel',
      'Custom project collaboration',
      'Weekly 1:1 strategy calls',
      'Whitelisted for DAO presale',
      'Revenue share opportunities'
    ],
    icon: Zap,
    color: 'pink'
  }
]

export function PremiumTier() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubscribe = async (tierName: string) => {
    setSelectedTier(tierName)
    setIsProcessing(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsProcessing(false)
    alert(`Redirecting to Solana payment for ${tierName} tier...`)
  }

  return (
    <div className="glass-dark rounded-3xl p-6 spatial-layer-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Kira Premium</h2>
          <p className="text-white/60">Unlock direct access and custom development</p>
        </div>
        <div className="glass p-3 rounded-2xl">
          <Crown className="w-6 h-6 text-neon-purple" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier, index) => {
            const Icon = tier.icon
            const isSelected = selectedTier === tier.name
            
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden ${
                  tier.popular 
                    ? 'border-2 border-neon-purple shadow-neon-lg' 
                    : 'border border-white/10'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-neon-purple to-neon-pink px-3 py-1 rounded-bl-xl">
                    <span className="text-xs font-bold text-white">POPULAR</span>
                  </div>
                )}
                
                <div className={`p-6 h-full flex flex-col ${
                  tier.popular ? 'bg-neon-purple/5' : 'glass'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-xl bg-${tier.color}-500/10 border border-${tier.color}-500/20`}>
                      <Icon className={`w-5 h-5 text-neon-${tier.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                      <p className="text-white/40 text-xs">{tier.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">
                        ${tier.price}
                      </span>
                      <span className="text-white/40">/{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                        <Check className={`w-4 h-4 mt-0.5 text-neon-${tier.color} flex-shrink-0`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => tier.price > 0 && handleSubscribe(tier.name)}
                    disabled={isProcessing && isSelected}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      tier.price === 0
                        ? 'glass text-white/60 cursor-default'
                        : tier.popular
                        ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:opacity-90'
                        : 'glass text-white hover:bg-white/10'
                    }`}
                  >
                    {isProcessing && isSelected ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </span>
                    ) : tier.price === 0 ? (
                      'Current Plan'
                    ) : (
                      `Subscribe with SOL`
                    )}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Payment info */}
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3 text-sm text-white/60">
            <div className="p-2 rounded-lg bg-neon-green/10">
              <Code className="w-4 h-4 text-neon-green" />
            </div>
            <p>
              Payments processed on Solana. All subscriptions include 
              on-chain payment verification and automatic premium access.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="glass rounded-xl p-3">
            <div className="text-2xl font-bold text-neon-cyan">47</div>
            <div className="text-xs text-white/40">Premium Members</div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="text-2xl font-bold text-neon-purple">12</div>
            <div className="text-xs text-white/40">Founder Tier</div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="text-2xl font-bold text-neon-green">$1,240</div>
            <div className="text-xs text-white/40">Monthly Revenue</div>
          </div>
        </div>
      </div>
    </div>
  )
}
