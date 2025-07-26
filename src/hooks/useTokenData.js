import { useState, useEffect } from 'react'
import { useReadContract, useAccount } from 'wagmi'
import { ICANHAZ_CONTRACT } from '../lib/web3'

// Mock data for development (will be replaced with real data after deployment)
const MOCK_TOKEN_DATA = {
  price: 0.000000123,
  priceChange24h: 15.67,
  marketCap: 123000000,
  volume24h: 2500000,
  holders: 15420,
  totalSupply: 1000000000000,
  circulatingSupply: 600000000000,
  burnedTokens: 50000000000,
  liquidityLocked: true,
  tradingEnabled: true,
}

export const useTokenData = () => {
  const [tokenData, setTokenData] = useState(MOCK_TOKEN_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Read contract info (will work after deployment)
  const { data: contractInfo } = useReadContract({
    address: ICANHAZ_CONTRACT.address,
    abi: ICANHAZ_CONTRACT.abi,
    functionName: 'getContractInfo',
    query: {
      enabled: ICANHAZ_CONTRACT.address !== '0x...',
    },
  })

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTokenData(prev => ({
        ...prev,
        price: prev.price * (1 + (Math.random() - 0.5) * 0.02), // ±1% random change
        priceChange24h: prev.priceChange24h + (Math.random() - 0.5) * 2, // ±1% change
        volume24h: prev.volume24h * (1 + (Math.random() - 0.5) * 0.1), // ±5% change
      }))
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Update with real contract data when available
  useEffect(() => {
    if (contractInfo) {
      setTokenData(prev => ({
        ...prev,
        totalSupply: Number(contractInfo.totalSupply_) / 1e18,
        circulatingSupply: Number(contractInfo.circulatingSupply) / 1e18,
        tradingEnabled: contractInfo.tradingEnabled_,
      }))
    }
  }, [contractInfo])

  return {
    tokenData,
    isLoading,
    error,
    isLive: ICANHAZ_CONTRACT.address !== '0x...',
  }
}

export const useUserBalance = () => {
  const { address } = useAccount()
  const [balance, setBalance] = useState('0')

  // Read user's ICHZ balance
  const { data: balanceData } = useReadContract({
    address: ICANHAZ_CONTRACT.address,
    abi: ICANHAZ_CONTRACT.abi,
    functionName: 'balanceOf',
    args: [address],
    query: {
      enabled: !!address && ICANHAZ_CONTRACT.address !== '0x...',
    },
  })

  useEffect(() => {
    if (balanceData) {
      setBalance((Number(balanceData) / 1e18).toFixed(2))
    }
  }, [balanceData])

  return {
    balance,
    hasBalance: Number(balance) > 0,
  }
}

export const useTokenPrice = () => {
  const [priceData, setPriceData] = useState({
    current: MOCK_TOKEN_DATA.price,
    change24h: MOCK_TOKEN_DATA.priceChange24h,
    history: generateMockPriceHistory(),
  })

  // Generate mock price history for charts
  function generateMockPriceHistory() {
    const history = []
    const basePrice = MOCK_TOKEN_DATA.price
    const now = Date.now()
    
    for (let i = 23; i >= 0; i--) {
      const timestamp = now - (i * 60 * 60 * 1000) // Hourly data for 24 hours
      const randomChange = (Math.random() - 0.5) * 0.1 // ±5% random change
      const price = basePrice * (1 + randomChange)
      
      history.push({
        timestamp,
        price,
        volume: Math.random() * 100000 + 50000,
      })
    }
    
    return history
  }

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceData(prev => {
        const newPrice = prev.current * (1 + (Math.random() - 0.5) * 0.02)
        const change24h = ((newPrice - prev.history[0]?.price) / prev.history[0]?.price) * 100
        
        return {
          current: newPrice,
          change24h,
          history: [
            ...prev.history.slice(1),
            {
              timestamp: Date.now(),
              price: newPrice,
              volume: Math.random() * 100000 + 50000,
            }
          ]
        }
      })
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return priceData
}

