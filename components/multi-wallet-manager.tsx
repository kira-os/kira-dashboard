'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wallet, 
  Plus, 
  Trash2, 
  Copy, 
  CheckCircle, 
  RefreshCw,
  Shield,
  Users,
  Send,
  ArrowRightLeft,
  Eye,
  EyeOff
} from 'lucide-react'

interface WalletData {
  id: string
  name: string
  address: string
  balance: number
  type: 'main' | 'treasury' | 'team' | 'community' | 'operations'
  createdAt: string
  purpose: string
}

const WALLET_TYPES = {
  main: { label: 'Main DAO', color: 'purple', icon: Shield },
  treasury: { label: 'Treasury', color: 'green', icon: Wallet },
  team: { label: 'Team', color: 'cyan', icon: Users },
  community: { label: 'Community', color: 'pink', icon: Users },
  operations: { label: 'Operations', color: 'yellow', icon: ArrowRightLeft }
}

export function MultiWalletManager() {
  const [wallets, setWallets] = useState<WalletData[]>([
    {
      id: 'main-1',
      name: 'Primary DAO Wallet',
      address: 'B3uJB9Vmjv5xW1PLtoU8hm4riRR1gixqsFywE5TW7GwZ',
      balance: 0,
      type: 'main',
      createdAt: new Date().toISOString(),
      purpose: 'Primary deployment and control wallet'
    }
  ])
  const [showPrivateKeys, setShowPrivateKeys] = useState<Record<string, boolean>>({})
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [transferAmount, setTransferAmount] = useState('')
  const [transferTo, setTransferTo] = useState('')

  // Simulate checking balances
  const refreshBalances = async () => {
    // In real implementation, this would query Solana
    console.log('Refreshing balances...')
  }

  const generateNewWallet = async (type: WalletData['type']) => {
    setIsGenerating(true)
    
    // Simulate wallet generation
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newWallet: WalletData = {
      id: `wallet-${Date.now()}`,
      name: `${WALLET_TYPES[type].label} Wallet ${wallets.filter(w => w.type === type).length + 1}`,
      address: `Generated_${Math.random().toString(36).substring(7)}_`, // Placeholder
      balance: 0,
      type,
      createdAt: new Date().toISOString(),
      purpose: 'Generated for testing'
    }
    
    setWallets([...wallets, newWallet])
    setIsGenerating(false)
  }

  const deleteWallet = (id: string) => {
    if (id === 'main-1') {
      alert('Cannot delete main DAO wallet')
      return
    }
    setWallets(wallets.filter(w => w.id !== id))
  }

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0)

  return (
    <div className="glass-dark rounded-3xl p-6 spatial-layer-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Multi-Wallet Treasury</h2>
          <p className="text-white/60">Manage DAO funds across multiple wallets</p>
        </div>
        <div className="glass p-3 rounded-2xl">
          <Shield className="w-6 h-6 text-neon-purple" />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{wallets.length}</div>
          <div className="text-xs text-white/40">Total Wallets</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-neon-green">{totalBalance.toFixed(2)}</div>
          <div className="text-xs text-white/40">Total SOL</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-neon-cyan">
            {wallets.filter(w => w.balance > 0).length}
          </div>
          <div className="text-xs text-white/40">Funded</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-neon-purple">
            {wallets.filter(w => w.type === 'treasury').length}
          </div>
          <div className="text-xs text-white/40">Treasury</div>
        </div>
      </div>

      {/* Wallet List */}
      <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto scrollbar-glass pr-2">
        <AnimatePresence>
          {wallets.map((wallet, index) => {
            const TypeIcon = WALLET_TYPES[wallet.type].icon
            const typeColor = WALLET_TYPES[wallet.type].color
            
            return (
              <motion.div
                key={wallet.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`glass rounded-xl p-4 border-l-4 border-neon-${typeColor} ${
                  selectedWallet === wallet.id ? 'bg-white/5' : ''
                }`}
                onClick={() => setSelectedWallet(selectedWallet === wallet.id ? null : wallet.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${typeColor}-500/10`}>
                      <TypeIcon className={`w-5 h-5 text-neon-${typeColor}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{wallet.name}</div>
                      <div className="flex items-center gap-2 text-sm text-white/40">
                        <code className="font-mono">{wallet.address.slice(0, 16)}...</code>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            copyAddress(wallet.address)
                          }}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          {copiedAddress === wallet.address ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-white">{wallet.balance.toFixed(4)} SOL</div>
                      <div className={`text-xs ${wallet.balance > 0 ? 'text-green-400' : 'text-white/40'}`}>
                        {wallet.balance > 0 ? 'Funded' : 'Empty'}
                      </div>
                    </div>
                    
                    {wallet.id !== 'main-1' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteWallet(wallet.id)
                        }}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedWallet === wallet.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-white/40 mb-1">Full Address</div>
                        <code className="text-xs text-white/80 break-all">{wallet.address}</code>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 mb-1">Purpose</div>
                        <div className="text-sm text-white/80">{wallet.purpose}</div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 py-2 px-4 bg-neon-cyan/20 border border-neon-cyan/30 rounded-lg text-neon-cyan text-sm font-medium hover:bg-neon-cyan/30 transition-colors">
                        <Send className="w-4 h-4 inline mr-2" />
                        Send SOL
                      </button>
                      <button className="flex-1 py-2 px-4 bg-neon-purple/20 border border-neon-purple/30 rounded-lg text-neon-purple text-sm font-medium hover:bg-neon-purple/30 transition-colors">
                        <ArrowRightLeft className="w-4 h-4 inline mr-2" />
                        Receive
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Add Wallet Buttons */}
      <div className="glass rounded-xl p-4 mb-6">
        <div className="text-sm text-white/60 mb-3">Generate New Wallet</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.entries(WALLET_TYPES).filter(([key]) => key !== 'main').map(([key, config]) => {
            const Icon = config.icon
            return (
              <button
                key={key}
                onClick={() => generateNewWallet(key as WalletData['type'])}
                disabled={isGenerating}
                className={`py-3 px-2 rounded-xl glass hover:bg-white/10 transition-colors text-center ${
                  isGenerating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Icon className={`w-5 h-5 text-neon-${config.color} mx-auto mb-1`} />
                <div className="text-xs text-white/80">{config.label}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bulk Operations */}
      <div className="glass rounded-xl p-4">
        <div className="text-sm text-white/60 mb-3">Treasury Operations</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="py-3 px-4 bg-neon-green/20 border border-neon-green/30 rounded-xl text-neon-green font-medium hover:bg-neon-green/30 transition-colors">
            Fund All Wallets
          </button>
          <button className="py-3 px-4 bg-neon-purple/20 border border-neon-purple/30 rounded-xl text-neon-purple font-medium hover:bg-neon-purple/30 transition-colors">
            Consolidate to Main
          </button>
          <button className="py-3 px-4 bg-neon-cyan/20 border border-neon-cyan/30 rounded-xl text-neon-cyan font-medium hover:bg-neon-cyan/30 transition-colors">
            Export All Keys
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 p-4 glass rounded-xl border border-yellow-500/20 bg-yellow-500/5">
        <div className="text-yellow-400 text-sm font-semibold mb-2">
          ⚠️ Development Mode
        </div>
        <p className="text-white/60 text-sm">
          Wallets shown are placeholders. Once funded, real Solana wallets will be generated 
          with proper keypairs. All keys will be stored in 1Password only.
        </p>
      </div>
    </div>
  )
}
