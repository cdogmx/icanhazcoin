import React, { useState, useEffect } from 'react'
import { Flame, TrendingDown, Calendar, Target, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatNumber, formatCurrency } from '../lib/web3'
import { useTokenData } from '../hooks/useTokenData'

export const BurnTracker = () => {
  const { tokenData } = useTokenData()
  const [burnHistory, setBurnHistory] = useState([])
  const [nextBurnCountdown, setNextBurnCountdown] = useState(0)

  // Mock burn history data
  const mockBurnHistory = [
    { date: '2024-01-15', amount: 5000000000, txHash: '0x123...abc', reason: 'Community Vote' },
    { date: '2024-02-01', amount: 8000000000, txHash: '0x456...def', reason: 'Milestone Burn' },
    { date: '2024-02-15', amount: 12000000000, txHash: '0x789...ghi', reason: 'Revenue Burn' },
    { date: '2024-03-01', amount: 15000000000, txHash: '0xabc...123', reason: 'Community Vote' },
    { date: '2024-03-15', amount: 10000000000, txHash: '0xdef...456', reason: 'Deflationary Burn' },
  ]

  // Mock burn chart data
  const burnChartData = [
    { month: 'Jan', burned: 5000000000, cumulative: 5000000000 },
    { month: 'Feb', burned: 20000000000, cumulative: 25000000000 },
    { month: 'Mar', burned: 25000000000, cumulative: 50000000000 },
    { month: 'Apr', burned: 0, cumulative: 50000000000 },
  ]

  const burnMilestones = [
    { target: 100000000000, label: '100B ICHZ', progress: 50, reward: 'NFT Drop' },
    { target: 250000000000, label: '250B ICHZ', progress: 20, reward: 'Staking Boost' },
    { target: 500000000000, label: '500B ICHZ', progress: 10, reward: 'Major Exchange Listing' },
  ]

  useEffect(() => {
    setBurnHistory(mockBurnHistory)
    
    // Countdown to next burn (mock: 7 days from now)
    const nextBurnDate = new Date()
    nextBurnDate.setDate(nextBurnDate.getDate() + 7)
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = nextBurnDate.getTime() - now
      setNextBurnCountdown(Math.max(0, distance))
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const formatCountdown = (milliseconds) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24))
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)
    
    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }

  const totalBurned = tokenData.burnedTokens || 50000000000
  const burnPercentage = (totalBurned / tokenData.totalSupply) * 100
  const burnValueUSD = totalBurned * tokenData.price

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-sm">
            Burned: {formatNumber(payload[0]?.value)} ICHZ
          </p>
          <p className="text-sm">
            Cumulative: {formatNumber(payload[1]?.value)} ICHZ
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Burn Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-glow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <Flame size={24} className="text-red-400" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Burned</div>
                <div className="text-2xl font-bold text-red-400">
                  {formatNumber(totalBurned)} ICHZ
                </div>
                <div className="text-xs text-muted-foreground">
                  {burnPercentage.toFixed(2)}% of supply
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingDown size={24} className="text-green-400" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Burn Value</div>
                <div className="text-2xl font-bold text-green-400">
                  {formatCurrency(burnValueUSD, 'USD')}
                </div>
                <div className="text-xs text-muted-foreground">
                  At current price
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Calendar size={24} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Next Burn</div>
                <div className="text-lg font-bold text-blue-400">
                  {formatCountdown(nextBurnCountdown)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Community vote burn
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Burn Chart */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="text-red-400" size={20} />
              Burn History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={burnChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    tickFormatter={(value) => formatNumber(value)}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="burned"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    name="Monthly Burned"
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke="#f97316"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                    name="Cumulative Burned"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Burn Milestones */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="text-primary" size={20} />
              Burn Milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {burnMilestones.map((milestone, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{milestone.label}</div>
                    <div className="text-sm text-muted-foreground">
                      Reward: {milestone.reward}
                    </div>
                  </div>
                  <Badge variant={milestone.progress === 100 ? "default" : "outline"}>
                    {milestone.progress}%
                  </Badge>
                </div>
                <Progress value={milestone.progress} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                  {formatNumber(totalBurned)} / {formatNumber(milestone.target)} ICHZ
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Burns */}
      <Card className="card-glow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Flame className="text-red-400" size={20} />
            Recent Burns
          </CardTitle>
          <Button size="sm" className="flex items-center gap-2">
            <Zap size={16} />
            Propose Burn
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {burnHistory.map((burn, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Flame size={16} className="text-red-400" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      {formatNumber(burn.amount)} ICHZ Burned
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {burn.reason} • {new Date(burn.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-muted-foreground">
                    {burn.txHash}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(burn.amount * tokenData.price, 'USD')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Burn Mechanism Info */}
      <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="text-red-400" size={20} />
            How Token Burns Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Automatic Burns</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 1% of trading fees burned weekly</li>
                <li>• Revenue-based burns from partnerships</li>
                <li>• Milestone achievement burns</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Community Burns</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Community governance proposals</li>
                <li>• Special event burns</li>
                <li>• Holder-voted burn amounts</li>
              </ul>
            </div>
          </div>
          <div className="pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Deflationary Mechanism:</strong> Token burns permanently remove ICHZ from circulation, 
              reducing total supply and potentially increasing scarcity over time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BurnTracker

