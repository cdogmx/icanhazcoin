import React from 'react'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts'
import { 
  Users, 
  Coins, 
  TrendingUp, 
  Lock, 
  Flame, 
  Wallet,
  DollarSign,
  Activity,
  Shield
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { useTokenData } from '../hooks/useTokenData'
import { formatNumber, formatCurrency } from '../lib/web3'

export const TokenStats = () => {
  const { tokenData } = useTokenData()

  // Distribution data for pie chart
  const distributionData = [
    { name: 'Community', value: 60, color: 'hsl(var(--chart-1))', amount: 600000000000 },
    { name: 'Team', value: 15, color: 'hsl(var(--chart-2))', amount: 150000000000 },
    { name: 'Marketing', value: 15, color: 'hsl(var(--chart-3))', amount: 150000000000 },
    { name: 'Liquidity', value: 10, color: 'hsl(var(--chart-4))', amount: 100000000000 },
  ]

  // Holder distribution data
  const holderData = [
    { range: '1-1K', holders: 8500, percentage: 55 },
    { range: '1K-10K', holders: 4200, percentage: 27 },
    { range: '10K-100K', holders: 2100, percentage: 14 },
    { range: '100K-1M', holders: 520, percentage: 3.4 },
    { range: '1M+', holders: 100, percentage: 0.6 },
  ]

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = "primary" }) => (
    <Card className="card-glow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full bg-${color}/20 flex items-center justify-center`}>
              <Icon size={24} className={`text-${color}`} />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{title}</div>
              <div className="text-2xl font-bold">{value}</div>
              {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
            </div>
          </div>
          {trend && (
            <Badge variant={trend > 0 ? "default" : "destructive"} className="flex items-center gap-1">
              <TrendingUp size={12} />
              {trend > 0 ? '+' : ''}{trend}%
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.value}% ({formatNumber(data.amount)} ICHZ)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={DollarSign}
          title="Market Cap"
          value={formatCurrency(tokenData.marketCap, 'USD')}
          trend={12.5}
          color="primary"
        />
        <StatCard
          icon={Activity}
          title="24h Volume"
          value={formatCurrency(tokenData.volume24h, 'USD')}
          trend={-3.2}
          color="chart-2"
        />
        <StatCard
          icon={Users}
          title="Holders"
          value={formatNumber(tokenData.holders)}
          subtitle="Unique addresses"
          trend={8.7}
          color="chart-3"
        />
        <StatCard
          icon={Coins}
          title="Circulating Supply"
          value={formatNumber(tokenData.circulatingSupply)}
          subtitle={`${((tokenData.circulatingSupply / tokenData.totalSupply) * 100).toFixed(1)}% of total`}
          color="chart-4"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Token Distribution */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="text-primary" size={20} />
              Token Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3 flex-1">
                {distributionData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{item.value}%</div>
                      <div className="text-xs text-muted-foreground">
                        {formatNumber(item.amount)} ICHZ
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Locks */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-primary" size={20} />
              Security & Locks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-green-400" />
                  <span className="text-sm">Team Tokens Locked</span>
                </div>
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                  12 months
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-blue-400" />
                  <span className="text-sm">Liquidity Locked</span>
                </div>
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Permanent
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame size={16} className="text-red-400" />
                  <span className="text-sm">Tokens Burned</span>
                </div>
                <span className="text-sm font-semibold">
                  {formatNumber(tokenData.burnedTokens)} ICHZ
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet size={16} className="text-yellow-400" />
                  <span className="text-sm">Max Wallet</span>
                </div>
                <span className="text-sm font-semibold">2% of supply</span>
              </div>
            </div>

            {/* Vesting Progress */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Marketing Vesting</span>
                  <span>65% released</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Team Vesting</span>
                  <span>0% released</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Holder Distribution */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="text-primary" size={20} />
            Holder Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={holderData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="range" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="holders" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 pt-4 border-t border-border">
            {holderData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-muted-foreground">{item.range} ICHZ</div>
                <div className="font-semibold">{formatNumber(item.holders)}</div>
                <div className="text-xs text-muted-foreground">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TokenStats

