'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Copy, CheckCircle, ExternalLink } from 'lucide-react'

interface WalletData {
  address: string
  balance: number
  network: string
  status: 'checking' | 'funded' | 'empty' | 'error'
}

export function WalletViewer() {
  const [walletData, setWalletData] = useState<WalletData>({
    address: 'B3uJB9Vmjv5xW1PLtoU8hm4riRR1gixqsFywE5TW7GwZ',
    balance: 0,
    network: 'devnet',
    status: 'checking'
  })
  const [copied, setCopied] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date>(new Date())

  const checkBalance = async () => {
    try {
      setWalletData(prev => ({ ...prev, status: 'checking' }))
      
      // Using Solana public API
      const response = await fetch('https://api.devnet.solana.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: ['B3uJB9Vmjv5xW1PLtoU8hm4riRR1gixqsFywE5TW7GwZ']
        })
      })
      
      const data = await response.json()
      const balance = data.result?.value ? data.result.value / 1e9 : 0
      
      setWalletData({
        address: 'B3uJB9Vmjv5xW1PLtoU8hm4riRR1gixqsFywE5TW7GwZ',
        balance,
        network: 'devnet',
        status: balance > 0 ? 'funded' : 'empty'
      })
      setLastChecked(new Date())
    } catch (error) {
      setWalletData(prev => ({ ...prev, status: 'error' }))
    }
  }

  useEffect(() => {
    checkBalance()
    // Auto-refresh every 30 seconds
    const interval = setInterval(checkBalance, 30000)
    return () => clearInterval(interval)
  }, [])

  const copyAddress = () => {
    navigator.clipboard.writeText(walletData.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-dark rounded-3xl p-6 spatial-layer-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Devnet Wallet</h2>
          <p className="text-white/60">Test SOL for DAO deployment</p>
        </div>
        <div className="glass p-3 rounded-2xl">
          <Wallet className="w-6 h-6 text-neon-cyan" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Address */}
        <div className="glass rounded-xl p-4">
          <div className="text-white/60 text-sm mb-2">Wallet Address</div>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-white font-mono text-sm break-all">
              {walletData.address}
            </code>
            <button
              onClick={copyAddress}
              className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              title="Copy address"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-white/60" />
              )}
            </button>
          </div>
        </div>

        {/* Balance */}
        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Balance</span>
            <span className="text-xs text-white/40 px-2 py-1 rounded-full bg-white/5">
              {walletData.network}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">
              {walletData.balance.toFixed(4)}
            </span>
            <span className="text-white/60">SOL</span>
          </div>
          
          {/* Status indicator */}
          <div className="mt-3 flex items-center gap-2">
            {walletData.status === 'checking' && (
              <>
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-sm text-yellow-400">Checking...</span>
              </>
            )}
            {walletData.status === 'funded' && (
              <>
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm text-green-400">Funded ✅ Ready to Deploy DAO</span>
              </>
            )}
            {walletData.status === 'empty' && (
              <>
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-sm text-red-400">Needs Funding</span>
              </>
            )}
            {walletData.status === 'error' && (
              <>
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-sm text-red-400">Error checking</span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://solscan.io/account/${walletData.address}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-xl p-3 text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-white/80">View on Solscan</span>
          </a>
          
          <button
            onClick={checkBalance}
            className="glass rounded-xl p-3 text-center hover:bg-white/10 transition-colors"
          >
            <span className="text-sm text-white/80">Refresh Balance</span>
          </button>
        </div>

        {/* Instructions */}
        {walletData.status === 'empty' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-4 border border-yellow-500/20 bg-yellow-500/5"
          >
            <div className="text-yellow-400 text-sm font-semibold mb-2">
              🔑 How to Fund This Wallet
            </div>
            <ol className="text-white/70 text-sm space-y-2 list-decimal list-inside">
              <li>Go to <a href="https://faucet.solana.com/" target="_blank" rel="noopener noreferrer" className="text-neon-cyan underline">faucet.solana.com</a></li>
              <li>Select "Devnet" network</li>
              <li>Copy and paste the wallet address above</li>
              <li>Request 2-5 SOL</li>
              <li>Wait 30 seconds and refresh this page</li>
            </ol>
          </motion.div>
        )}

        {/* Last checked */}
        <div className="text-center text-xs text-white/40">
          Last checked: {lastChecked.toLocaleTimeString()}
          <br />
          Auto-refresh: 30 seconds
        </div>
      </div>
    </div>
  )
}
