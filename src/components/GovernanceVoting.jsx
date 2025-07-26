import React, { useState, useEffect } from 'react'
import { Vote, Users, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useAccount } from 'wagmi'
import { formatNumber } from '../lib/web3'
import { useUserBalance } from '../hooks/useTokenData'
import toast from 'react-hot-toast'

export const GovernanceVoting = () => {
  const { isConnected } = useAccount()
  const { balance } = useUserBalance()
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: 'general'
  })

  // Mock proposals data
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: 'Increase Monthly Token Burn to 10B ICHZ',
      description: 'Proposal to increase the monthly community burn from 5B to 10B ICHZ tokens to accelerate deflationary pressure and increase token scarcity.',
      category: 'tokenomics',
      status: 'active',
      author: '0x742d35Cc6634C0532925a3b8D404d3aABB8ad9',
      created: '2024-03-15',
      endDate: '2024-03-22',
      votesFor: 45000000000,
      votesAgainst: 12000000000,
      totalVotes: 57000000000,
      quorum: 50000000000,
      hasVoted: false,
      userVote: null
    },
    {
      id: 2,
      title: 'Partnership with Major Meme Platform',
      description: 'Approve strategic partnership with 9GAG for exclusive ICHZ integration and co-branded NFT collection launch.',
      category: 'partnerships',
      status: 'active',
      author: '0x8ba1f109551bD432803012645Hac136c0532925',
      created: '2024-03-10',
      endDate: '2024-03-20',
      votesFor: 38000000000,
      votesAgainst: 8000000000,
      totalVotes: 46000000000,
      quorum: 50000000000,
      hasVoted: true,
      userVote: 'for'
    },
    {
      id: 3,
      title: 'Implement Quadratic Voting System',
      description: 'Transition from linear voting (1 token = 1 vote) to quadratic voting system to prevent whale manipulation and increase community participation.',
      category: 'governance',
      status: 'passed',
      author: '0x1f8dE7Bf5dd49Ef566fBc14E1D95F69Ac05785F8',
      created: '2024-03-01',
      endDate: '2024-03-08',
      votesFor: 72000000000,
      votesAgainst: 15000000000,
      totalVotes: 87000000000,
      quorum: 50000000000,
      hasVoted: true,
      userVote: 'for'
    },
    {
      id: 4,
      title: 'Launch ICHZ Merchandise Store',
      description: 'Allocate 50M ICHZ from community treasury to launch official merchandise store with cat-themed crypto apparel.',
      category: 'marketing',
      status: 'failed',
      author: '0x9b59B6634C0532925a3b8D404d3aABB8ad123',
      created: '2024-02-20',
      endDate: '2024-02-27',
      votesFor: 25000000000,
      votesAgainst: 65000000000,
      totalVotes: 90000000000,
      quorum: 50000000000,
      hasVoted: false,
      userVote: null
    }
  ])

  const categories = [
    { value: 'all', label: 'All Proposals', count: proposals.length },
    { value: 'active', label: 'Active', count: proposals.filter(p => p.status === 'active').length },
    { value: 'passed', label: 'Passed', count: proposals.filter(p => p.status === 'passed').length },
    { value: 'failed', label: 'Failed', count: proposals.filter(p => p.status === 'failed').length }
  ]

  const proposalCategories = [
    { value: 'general', label: 'General' },
    { value: 'tokenomics', label: 'Tokenomics' },
    { value: 'partnerships', label: 'Partnerships' },
    { value: 'governance', label: 'Governance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'development', label: 'Development' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'passed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Clock size={12} />
      case 'passed': return <CheckCircle size={12} />
      case 'failed': return <XCircle size={12} />
      default: return <AlertCircle size={12} />
    }
  }

  const calculateTimeRemaining = (endDate) => {
    const now = new Date()
    const end = new Date(endDate)
    const diff = end - now
    
    if (diff <= 0) return 'Ended'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ${hours}h remaining`
    return `${hours}h remaining`
  }

  const handleVote = async (proposalId, vote) => {
    if (!isConnected) {
      toast.error('Please connect your wallet to vote')
      return
    }

    if (parseFloat(balance) === 0) {
      toast.error('You need ICHZ tokens to vote')
      return
    }

    toast.loading('Submitting vote...', { id: 'vote' })
    
    // Simulate vote transaction
    setTimeout(() => {
      setProposals(prev => prev.map(p => {
        if (p.id === proposalId) {
          const voteAmount = parseFloat(balance) * 1e18 // Convert to wei equivalent
          return {
            ...p,
            votesFor: vote === 'for' ? p.votesFor + voteAmount : p.votesFor,
            votesAgainst: vote === 'against' ? p.votesAgainst + voteAmount : p.votesAgainst,
            totalVotes: p.totalVotes + voteAmount,
            hasVoted: true,
            userVote: vote
          }
        }
        return p
      }))
      
      toast.success(`Vote submitted successfully! You voted ${vote}.`, { id: 'vote' })
    }, 2000)
  }

  const handleCreateProposal = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet to create proposals')
      return
    }

    if (!newProposal.title || !newProposal.description) {
      toast.error('Please fill in all required fields')
      return
    }

    toast.loading('Creating proposal...', { id: 'create' })
    
    // Simulate proposal creation
    setTimeout(() => {
      const proposal = {
        id: proposals.length + 1,
        title: newProposal.title,
        description: newProposal.description,
        category: newProposal.category,
        status: 'active',
        author: '0x1f8dE7Bf5dd49Ef566fBc14E1D95F69Ac05785F8', // User's address
        created: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        votesFor: 0,
        votesAgainst: 0,
        totalVotes: 0,
        quorum: 50000000000,
        hasVoted: false,
        userVote: null
      }
      
      setProposals(prev => [proposal, ...prev])
      setNewProposal({ title: '', description: '', category: 'general' })
      toast.success('Proposal created successfully!', { id: 'create' })
    }, 2000)
  }

  const ProposalCard = ({ proposal }) => {
    const forPercentage = proposal.totalVotes > 0 ? (proposal.votesFor / proposal.totalVotes) * 100 : 0
    const againstPercentage = proposal.totalVotes > 0 ? (proposal.votesAgainst / proposal.totalVotes) * 100 : 0
    const quorumPercentage = (proposal.totalVotes / proposal.quorum) * 100

    return (
      <Card className="card-glow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={getStatusColor(proposal.status)}>
                  {getStatusIcon(proposal.status)}
                  {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                </Badge>
                <Badge variant="outline">{proposal.category}</Badge>
              </div>
              <CardTitle className="text-lg mb-2">{proposal.title}</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {proposal.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>By {proposal.author.slice(0, 6)}...{proposal.author.slice(-4)}</span>
            <span>{proposal.status === 'active' ? calculateTimeRemaining(proposal.endDate) : `Ended ${proposal.endDate}`}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Voting Results */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-green-400">For: {formatNumber(proposal.votesFor / 1e18)} ICHZ</span>
              <span className="text-red-400">Against: {formatNumber(proposal.votesAgainst / 1e18)} ICHZ</span>
            </div>
            
            <div className="relative">
              <Progress value={forPercentage} className="h-3" />
              <div 
                className="absolute top-0 right-0 h-3 bg-red-500 rounded-r-full"
                style={{ width: `${againstPercentage}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{forPercentage.toFixed(1)}% For</span>
              <span>{againstPercentage.toFixed(1)}% Against</span>
            </div>
          </div>

          {/* Quorum Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quorum Progress</span>
              <span className={quorumPercentage >= 100 ? 'text-green-400' : 'text-yellow-400'}>
                {quorumPercentage.toFixed(1)}%
              </span>
            </div>
            <Progress value={Math.min(quorumPercentage, 100)} className="h-2" />
            <div className="text-xs text-muted-foreground">
              {formatNumber(proposal.totalVotes / 1e18)} / {formatNumber(proposal.quorum / 1e18)} ICHZ needed
            </div>
          </div>

          {/* Voting Buttons */}
          {proposal.status === 'active' && (
            <div className="flex gap-3">
              {proposal.hasVoted ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle size={16} className="text-green-400" />
                  You voted {proposal.userVote}
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => handleVote(proposal.id, 'for')}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={!isConnected || parseFloat(balance) === 0}
                  >
                    Vote For
                  </Button>
                  <Button
                    onClick={() => handleVote(proposal.id, 'against')}
                    variant="outline"
                    className="flex-1 border-red-500 text-red-400 hover:bg-red-500/10"
                    disabled={!isConnected || parseFloat(balance) === 0}
                  >
                    Vote Against
                  </Button>
                </>
              )}
            </div>
          )}

          {!isConnected && proposal.status === 'active' && (
            <p className="text-sm text-muted-foreground text-center">
              Connect your wallet to participate in governance
            </p>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="card-glow">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Vote size={32} className="text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl gradient-text">ICHZ Governance</CardTitle>
          <p className="text-muted-foreground text-lg">
            Shape the future of IcanHaz Coin through community voting
          </p>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-glow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{proposals.length}</div>
            <div className="text-sm text-muted-foreground">Total Proposals</div>
          </CardContent>
        </Card>
        <Card className="card-glow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {proposals.filter(p => p.status === 'active').length}
            </div>
            <div className="text-sm text-muted-foreground">Active Votes</div>
          </CardContent>
        </Card>
        <Card className="card-glow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">1,247</div>
            <div className="text-sm text-muted-foreground">Participants</div>
          </CardContent>
        </Card>
        <Card className="card-glow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {isConnected ? formatNumber(parseFloat(balance)) : '0'}
            </div>
            <div className="text-sm text-muted-foreground">Your Voting Power</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="proposals" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="proposals">Active Proposals</TabsTrigger>
          <TabsTrigger value="create">Create Proposal</TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="space-y-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {category.label}
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Proposals List */}
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} />
                Create New Proposal
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Submit a proposal for the community to vote on. Requires 1M ICHZ minimum to create.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="proposal-title">Proposal Title *</Label>
                <Input
                  id="proposal-title"
                  value={newProposal.title}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a clear, descriptive title..."
                  maxLength={100}
                />
                <div className="text-xs text-muted-foreground text-right">
                  {newProposal.title.length}/100
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposal-category">Category</Label>
                <select
                  id="proposal-category"
                  value={newProposal.category}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  {proposalCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposal-description">Description *</Label>
                <Textarea
                  id="proposal-description"
                  value={newProposal.description}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide a detailed description of your proposal, including rationale, implementation details, and expected outcomes..."
                  rows={6}
                  maxLength={2000}
                />
                <div className="text-xs text-muted-foreground text-right">
                  {newProposal.description.length}/2000
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-semibold text-blue-400 mb-2">Proposal Guidelines</h4>
                <ul className="text-sm text-blue-400 space-y-1">
                  <li>• Minimum 1,000,000 ICHZ required to create proposals</li>
                  <li>• Proposals run for 7 days after creation</li>
                  <li>• 50M ICHZ quorum required for proposal to pass</li>
                  <li>• Be clear, specific, and provide implementation details</li>
                  <li>• Consider community impact and feasibility</li>
                </ul>
              </div>

              <Button
                onClick={handleCreateProposal}
                disabled={!isConnected || !newProposal.title || !newProposal.description}
                className="w-full wallet-button"
              >
                {isConnected ? 'Create Proposal' : 'Connect Wallet to Create Proposal'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default GovernanceVoting

