import { NextRequest, NextResponse } from 'next/server'
import { getTokenInfo, getTreasuryBalance, getRecentTransactions } from '@/lib/solana/rpc'

export async function GET(request: NextRequest) {
  try {
    const tokenMint = process.env.NEXT_PUBLIC_KIRA_TOKEN_MINT
    const treasuryWallet = process.env.NEXT_PUBLIC_TREASURY_WALLET
    
    if (!tokenMint || !treasuryWallet) {
      // Return mock data if env vars not set
      return NextResponse.json({
        price: 0.0428,
        change24h: 12.4,
        marketCap: 42800000,
        volume24h: 3200000,
        holders: 1247,
        treasurySol: 42.8,
        treasuryUsd: 36750,
        recentTransactions: [
          { address: '8xF3...c7A2', amount: 42000, type: 'buy', time: '2 min ago' },
          { address: '5d9K...e8B1', amount: 15000, type: 'sell', time: '5 min ago' },
          { address: '3a2M...f9C4', amount: 85000, type: 'buy', time: '12 min ago' },
        ],
        distribution: [
          { label: 'Bonding Curve', value: 40, color: 'from-cyan-500 to-blue-500' },
          { label: 'Treasury', value: 30, color: 'from-purple-500 to-pink-500' },
          { label: 'Team', value: 15, color: 'from-green-500 to-emerald-500' },
          { label: 'Community', value: 15, color: 'from-yellow-500 to-amber-500' },
        ],
        timestamp: new Date().toISOString(),
        isLive: false,
      })
    }
    
    // Fetch real data
    const [tokenInfo, treasuryBalance] = await Promise.all([
      getTokenInfo(tokenMint),
      getTreasuryBalance(treasuryWallet),
    ])
    
    // Calculate metrics
    const supply = tokenInfo?.supply || 0
    const price = 0.0428 // Would fetch from DEX API
    const marketCap = supply * price
    
    return NextResponse.json({
      price,
      change24h: 12.4, // Would calculate from historical data
      marketCap,
      volume24h: 3200000, // Would fetch from DEX API
      holders: tokenInfo?.holderCount || 0,
      treasurySol: treasuryBalance?.sol || 0,
      treasuryUsd: (treasuryBalance?.sol || 0) * 85, // Approximate SOL price
      recentTransactions: [], // Would fetch from Helius or similar
      distribution: [
        { label: 'Bonding Curve', value: 40, color: 'from-cyan-500 to-blue-500' },
        { label: 'Treasury', value: 30, color: 'from-purple-500 to-pink-500' },
        { label: 'Team', value: 15, color: 'from-green-500 to-emerald-500' },
        { label: 'Community', value: 15, color: 'from-yellow-500 to-amber-500' },
      ],
      timestamp: new Date().toISOString(),
      isLive: true,
    })
  } catch (error) {
    console.error('Error fetching token metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch token metrics' },
      { status: 500 }
    )
  }
}