import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Wallet, LogOut, Copy, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { shortenAddress } from '../lib/web3'
import { useUserBalance } from '../hooks/useTokenData'
import toast from 'react-hot-toast'

export const WalletConnect = () => {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { balance, hasBalance } = useUserBalance()

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast.success('Address copied to clipboard!')
    }
  }

  const handleViewOnEtherscan = () => {
    if (address) {
      window.open(`https://etherscan.io/address/${address}`, '_blank')
    }
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Connect Your Wallet</h3>
        <div className="grid gap-3">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => connect({ connector })}
              disabled={isPending}
              className="wallet-button flex items-center gap-3 p-4 h-auto"
              variant="outline"
            >
              <Wallet size={20} />
              <div className="text-left">
                <div className="font-semibold">{connector.name}</div>
                <div className="text-sm opacity-70">
                  {connector.name === 'MetaMask' && 'Connect using MetaMask'}
                  {connector.name === 'WalletConnect' && 'Scan with your mobile wallet'}
                  {connector.name === 'Injected' && 'Connect with browser wallet'}
                </div>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="text-sm text-muted-foreground text-center mt-4">
          <p>By connecting your wallet, you agree to our Terms of Service.</p>
          <p className="mt-1">Your wallet will be used to interact with the IcanHaz Coin smart contract.</p>
        </div>
      </div>
    )
  }

  return (
    <Card className="card-glow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Wallet size={20} className="text-primary" />
            </div>
            <div>
              <div className="font-semibold">Wallet Connected</div>
              <div className="text-sm text-muted-foreground">
                {chain?.name || 'Ethereum'}
              </div>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
            Connected
          </Badge>
        </div>

        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <div className="text-sm text-muted-foreground">Address</div>
              <div className="font-mono text-sm">{shortenAddress(address, 6)}</div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyAddress}
                className="h-8 w-8 p-0"
              >
                <Copy size={14} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleViewOnEtherscan}
                className="h-8 w-8 p-0"
              >
                <ExternalLink size={14} />
              </Button>
            </div>
          </div>

          {/* ICHZ Balance */}
          <div className="p-3 bg-primary/10 rounded-lg">
            <div className="text-sm text-muted-foreground">ICHZ Balance</div>
            <div className="text-2xl font-bold gradient-text">
              {hasBalance ? `${balance} ICHZ` : '0 ICHZ'}
            </div>
            {!hasBalance && (
              <div className="text-sm text-muted-foreground mt-1">
                Buy ICHZ to get started!
              </div>
            )}
          </div>

          {/* Network Status */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Network</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>{chain?.name || 'Ethereum'}</span>
            </div>
          </div>

          {/* Disconnect Button */}
          <Button
            onClick={() => disconnect()}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <LogOut size={16} />
            Disconnect Wallet
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export const WalletButton = () => {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()

  if (isConnected) {
    return null // WalletConnect component will handle connected state
  }

  const handleConnect = () => {
    const metaMaskConnector = connectors.find(c => c.name === 'MetaMask')
    if (metaMaskConnector) {
      connect({ connector: metaMaskConnector })
    } else {
      connect({ connector: connectors[0] })
    }
  }

  return (
    <Button
      onClick={handleConnect}
      className="wallet-button flex items-center gap-2"
    >
      <Wallet size={18} />
      Connect Wallet
    </Button>
  )
}

