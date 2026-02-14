'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Users, 
  CheckCircle, 
  XCircle, 
  Lock,
  Unlock,
  AlertTriangle,
  Clock,
  ArrowRight,
  Wallet
} from 'lucide-react'

interface MultisigProposal {
  id: string
  type: 'transfer' | 'contract_upgrade' | 'emergency_pause'
  description: string
  amount?: number
  recipient?: string
  proposer: string
  signatures: string[]
  required: number
  status: 'pending' | 'approved' | 'rejected' | 'executed'
  createdAt: string
  expiresAt: string
}

interface MultisigWallet {
  address: string
  name: string
  threshold: number // e.g., 3 of 5
  totalSigners: number
  balance: number
  proposals: MultisigProposal[]
}

export function MultisigTreasury() {
  const [activeWallet, setActiveWallet] = useState<MultisigWallet>({
    address: 'B3uJB9Vmjv5xW1PLtoU8hm4riRR1gixqsFywE5TW7GwZ',
    name: 'Main Treasury (Multisig)',
    threshold: 3,
    totalSigners: 5,
    balance: 0,
    proposals: [
      {
        id: 'prop-1',
        type: 'transfer',
        description: 'Fund development wallet with 10 SOL for testing',
        amount: 10,
        recipient: 'DevWallet_123...',
        proposer: 'Wallet_1',
        signatures: ['Wallet_1', 'Wallet_2'],
        required: 3,
        status: 'pending',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  })

  const [showCreateProposal, setShowCreateProposal] = useState(false)
  const [newProposal, setNewProposal] = useState({
    type: 'transfer',
    description: '',
    amount: '',
    recipient: ''
  })

  const signProposal = (proposalId: string) => {
    // In real implementation, this would create a blockchain transaction
    console.log('Signing proposal:', proposalId)
  }

  const executeProposal = (proposalId: string) => {
    // In real implementation, this would execute the multisig transaction
    console.log('Executing proposal:', proposalId)
  }

  const createProposal = () => {
    // Validate and create new proposal
    if (!newProposal.description) return
    
    const proposal: MultisigProposal = {
      id: `prop-${Date.now()}`,
      type: newProposal.type as any,
      description: newProposal.description,
      amount: parseFloat(newProposal.amount) || undefined,
      recipient: newProposal.recipient || undefined,
      proposer: 'Current_Wallet',
      signatures: ['Current_Wallet'],
      required: activeWallet.threshold,
      status: 'pending',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    }
    
    setActiveWallet({
      ...activeWallet,
      proposals: [proposal, ...activeWallet.proposals]
    })
    
    setShowCreateProposal(false)
    setNewProposal({ type: 'transfer', description: '', amount: '', recipient: '' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'approved': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'rejected': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'executed': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      default: return 'text-white/40 bg-white/5 border-white/10'
    }
  }

  return (
    <div className="glass-dark rounded-3xl p-6 spatial-layer-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Multi-Sig Treasury</h2>
          <p className="text-white/60">Require {activeWallet.threshold} of {activeWallet.totalSigners} signatures</p>
        </div>
        <div className="glass p-3 rounded-2xl">
          <Shield className="w-6 h-6 text-neon-green" />
        </div>
      </div>

      {/* Wallet Info */}
      <div className="glass rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-white/60 text-sm mb-1">Treasury Address</div>
            <code className="text-white font-mono text-sm">{activeWallet.address}</code>
          </div>
          <div className="text-right">
            <div className="text-white/60 text-sm mb-1">Balance</div>
            <div className="text-2xl font-bold text-white">{activeWallet.balance.toFixed(4)} SOL</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-neon-cyan" />
            <span className="text-white/80">{activeWallet.totalSigners} Signers</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-neon-purple" />
            <span className="text-white/80">{activeWallet.threshold} Required</span>
          </div>
        </div>
      </div>

      {/* Create Proposal Button */}
      <button
        onClick={() => setShowCreateProposal(true)}
        className="w-full mb-6 py-4 bg-gradient-to-r from-neon-green to-neon-cyan rounded-xl font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <Shield className="w-5 h-5" />
        Create New Proposal
      </button>

      {/* Create Proposal Modal */}
      <AnimatePresence>
        {showCreateProposal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-6 mb-6 border border-neon-cyan/30"
          >
            <h3 className="text-lg font-bold text-white mb-4">New Proposal</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Proposal Type</label>
                <select
                  value={newProposal.type}
                  onChange={(e) => setNewProposal({...newProposal, type: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-cyan"
                >
                  <option value="transfer">Transfer SOL</option>
                  <option value="contract_upgrade">Contract Upgrade</option>
                  <option value="emergency_pause">Emergency Pause</option>
                </select>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Description</label>
                <textarea
                  value={newProposal.description}
                  onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
                  placeholder="What is this proposal for?"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan h-20 resize-none"
                />
              </div>

              {newProposal.type === 'transfer' && (
                <>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Amount (SOL)</label>
                    <input
                      type="number"
                      value={newProposal.amount}
                      onChange={(e) => setNewProposal({...newProposal, amount: e.target.value})}
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Recipient Address</label>
                    <input
                      type="text"
                      value={newProposal.recipient}
                      onChange={(e) => setNewProposal({...newProposal, recipient: e.target.value})}
                      placeholder="Solana wallet address"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <button
                  onClick={createProposal}
                  className="flex-1 py-3 bg-neon-green/20 border border-neon-green/30 rounded-xl text-neon-green font-medium hover:bg-neon-green/30 transition-colors"
                >
                  Submit Proposal
                </button>
                <button
                  onClick={() => setShowCreateProposal(false)}
                  className="flex-1 py-3 glass rounded-xl text-white/60 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proposals List */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white mb-4">Active Proposals</h3>
        
        {activeWallet.proposals.map((proposal) => (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(proposal.status)}`}>
                    {proposal.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-white/40">
                    {new Date(proposal.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="font-medium text-white">{proposal.description}</div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex justify-between text-sm text-white/60 mb-1">
                <span>Signatures</span>
                <span>{proposal.signatures.length} of {proposal.required}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-cyan transition-all"
                  style={{ width: `${(proposal.signatures.length / proposal.required) * 100}%` }}
                />
              </div>
            </div>

            {/* Signers */}
            <div className="flex flex-wrap gap-2 mb-3">
              {proposal.signatures.map((signer) => (
                <span key={signer} className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {signer.slice(0, 8)}
                </span>
              ))}
              {Array.from({ length: proposal.required - proposal.signatures.length }).map((_, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/40">
                  Awaiting...
                </span>
              ))}
            </div>

            {/* Actions */}
            {proposal.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => signProposal(proposal.id)}
                  className="flex-1 py-2 bg-neon-green/20 border border-neon-green/30 rounded-lg text-neon-green text-sm font-medium hover:bg-neon-green/30 transition-colors"
                >
                  Sign Proposal
                </button>
                {proposal.signatures.length >= proposal.required && (
                  <button
                    onClick={() => executeProposal(proposal.id)}
                    className="flex-1 py-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Execute
                  </button>
                )}
              </div>
            )}

            {proposal.amount && (
              <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-sm">
                <span className="text-white/60">Amount</span>
                <span className="text-white font-medium">{proposal.amount} SOL</span>
              </div>
            )}
          </motion.div>
        ))}

        {activeWallet.proposals.length === 0 && (
          <div className="text-center py-8 text-white/40">
            No active proposals
          </div>
        )}
      </div>

      {/* Security Info */}
      <div className="mt-6 p-4 glass rounded-xl border border-green-500/20 bg-green-500/5">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-green-400 text-sm font-semibold mb-1">
              Multi-Sig Protection Active
            </div>
            <p className="text-white/60 text-sm">
              No single wallet can access treasury funds. All transfers require {activeWallet.threshold} signatures. 
              This prevents theft even if one key is compromised.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
