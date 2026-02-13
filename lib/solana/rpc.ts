import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'

const TOKEN_MINT = process.env.NEXT_PUBLIC_KIRA_TOKEN_MINT || ''
const TREASURY_WALLET = process.env.NEXT_PUBLIC_TREASURY_WALLET || ''

let connection: Connection | null = null

export function getConnection(): Connection {
  if (!connection) {
    const rpcUrl = process.env.SOLANA_RPC_URL || clusterApiUrl('mainnet-beta')
    connection = new Connection(rpcUrl, 'confirmed')
  }
  return connection
}

export async function getTokenInfo(mintAddress: string) {
  try {
    const conn = getConnection()
    const mintPubkey = new PublicKey(mintAddress)
    
    // Get token supply
    const supply = await conn.getTokenSupply(mintPubkey)
    
    // Get token accounts (holder count approximation)
    const tokenAccounts = await conn.getTokenAccountsByOwner(
      mintPubkey,
      { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
    )
    
    return {
      supply: supply.value.uiAmount || 0,
      decimals: supply.value.decimals,
      holderCount: tokenAccounts.value.length,
    }
  } catch (error) {
    console.error('Error fetching token info:', error)
    return null
  }
}

export async function getTreasuryBalance(walletAddress: string) {
  try {
    const conn = getConnection()
    const pubkey = new PublicKey(walletAddress)
    
    // Get SOL balance
    const solBalance = await conn.getBalance(pubkey)
    
    // Get token accounts
    const tokenAccounts = await conn.getParsedTokenAccountsByOwner(
      pubkey,
      { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
    )
    
    return {
      sol: solBalance / 1e9,
      tokens: tokenAccounts.value.map((account) => ({
        mint: account.account.data.parsed.info.mint,
        amount: account.account.data.parsed.info.tokenAmount.uiAmount || 0,
      })),
    }
  } catch (error) {
    console.error('Error fetching treasury balance:', error)
    return null
  }
}

export async function getRecentTransactions(address: string, limit: number = 10) {
  try {
    const conn = getConnection()
    const pubkey = new PublicKey(address)
    
    const signatures = await conn.getSignaturesForAddress(pubkey, { limit })
    
    const transactions = await Promise.all(
      signatures.map(async (sig) => {
        const tx = await conn.getTransaction(sig.signature)
        return {
          signature: sig.signature,
          timestamp: sig.blockTime ? new Date(sig.blockTime * 1000).toISOString() : null,
          status: tx?.meta?.err ? 'failed' : 'success',
        }
      })
    )
    
    return transactions
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return []
  }
}