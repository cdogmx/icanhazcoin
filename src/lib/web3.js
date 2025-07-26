import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

// WalletConnect project ID - you'll need to get this from https://cloud.walletconnect.com
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

// IcanHaz Coin contract configuration
export const ICANHAZ_CONTRACT = {
  address: '0x...', // Will be updated after deployment
  abi: [
    // ERC-20 standard functions
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint256)',
    'function transfer(address to, uint256 amount) returns (bool)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function transferFrom(address from, address to, uint256 amount) returns (bool)',
    
    // IcanHaz specific functions
    'function getContractInfo() view returns (tuple(uint256 totalSupply_, uint256 circulatingSupply, uint256 contractBalance, bool tradingEnabled_, bool limitsEnabled_, uint256 sellTaxRate_))',
    'function tradingEnabled() view returns (bool)',
    'function limitsEnabled() view returns (bool)',
    'function sellTaxRate() view returns (uint256)',
    'function maxWalletAmount() view returns (uint256)',
    'function maxTransactionAmount() view returns (uint256)',
    
    // Events
    'event Transfer(address indexed from, address indexed to, uint256 value)',
    'event Approval(address indexed owner, address indexed spender, uint256 value)',
  ]
}

// Uniswap V2 Router for swaps
export const UNISWAP_V2_ROUTER = {
  address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  abi: [
    'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
    'function swapExactETHForTokensSupportingFeeOnTransferTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable',
    'function swapExactTokensForETHSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external',
  ]
}

// WETH contract address
export const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

// Utility functions
export const formatTokenAmount = (amount, decimals = 18) => {
  if (!amount) return '0'
  const divisor = BigInt(10 ** decimals)
  const quotient = amount / divisor
  const remainder = amount % divisor
  
  if (remainder === 0n) {
    return quotient.toString()
  }
  
  const remainderStr = remainder.toString().padStart(decimals, '0')
  const trimmedRemainder = remainderStr.replace(/0+$/, '')
  
  if (trimmedRemainder === '') {
    return quotient.toString()
  }
  
  return `${quotient}.${trimmedRemainder}`
}

export const parseTokenAmount = (amount, decimals = 18) => {
  if (!amount) return 0n
  const [whole, fraction = ''] = amount.toString().split('.')
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals)
  return BigInt(whole + paddedFraction)
}

export const shortenAddress = (address, chars = 4) => {
  if (!address) return ''
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(amount)
}

export const formatNumber = (num, decimals = 2) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(decimals) + 'B'
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(decimals) + 'M'
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(decimals) + 'K'
  }
  return num.toFixed(decimals)
}

