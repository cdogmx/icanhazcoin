import React from 'react'
import { FileText, Download, Share2, BookOpen, Target, Users, Code, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

export const Whitepaper = () => {
  const sections = [
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      icon: BookOpen,
      content: `IcanHaz Coin (ICHZ) represents the evolution of meme culture into the decentralized finance ecosystem. Born from the legendary "I Can Has Cheezburger?" meme that launched the lolcat phenomenon in 2007, ICHZ bridges the gap between nostalgic internet culture and modern cryptocurrency innovation.

Our mission is to create a community-driven token that celebrates the origins of meme culture while providing real utility through advanced DeFi features, governance mechanisms, and sustainable tokenomics. ICHZ is not just another meme coin – it's a celebration of the memes that brought us together and a foundation for building the future of community-driven finance.`
    },
    {
      id: 'problem-statement',
      title: 'Problem Statement',
      icon: Target,
      content: `The current meme coin landscape is saturated with projects lacking substance, utility, and long-term vision. Most meme coins suffer from:

• **Lack of Historical Significance**: Many projects create artificial memes without cultural relevance or staying power.

• **Poor Tokenomics**: Unsustainable distribution models that favor early insiders over community members.

• **No Real Utility**: Tokens that exist purely for speculation without providing value to holders.

• **Weak Community Governance**: Centralized decision-making that excludes community input.

• **Short-term Focus**: Projects designed for quick profits rather than long-term ecosystem development.

IcanHaz Coin addresses these fundamental issues by building upon authentic meme heritage, implementing fair tokenomics, and creating real utility for our community.`
    },
    {
      id: 'solution',
      title: 'Our Solution',
      icon: Code,
      content: `ICHZ provides a comprehensive solution through multiple innovative approaches:

**Authentic Meme Heritage**
We build upon the genuine cultural significance of the "I Can Has Cheezburger?" meme, which has 17+ years of internet history and recognition. This provides a solid foundation that resonates with multiple generations of internet users.

**Fair and Transparent Tokenomics**
Our distribution model prioritizes community ownership with 60% of tokens allocated to the community, while team and marketing allocations are subject to strict vesting schedules and transparency requirements.

**Real Utility and Features**
ICHZ holders benefit from:
• Staking rewards with competitive APY rates
• Governance voting rights on key decisions
• Access to exclusive NFT collections and merchandise
• Participation in community burn events
• Premium features in our ecosystem tools

**Advanced DeFi Integration**
Our platform includes professional-grade tools for trading, staking, and portfolio management, making DeFi accessible to both newcomers and experienced users.

**Sustainable Growth Model**
Revenue from partnerships, merchandise, and platform fees fund ongoing development, marketing, and community rewards, creating a self-sustaining ecosystem.`
    },
    {
      id: 'tokenomics',
      title: 'Tokenomics',
      icon: Target,
      content: `**Token Details**
• Name: IcanHaz Coin
• Symbol: ICHZ
• Total Supply: 1,000,000,000,000 ICHZ (1 Trillion)
• Network: Ethereum (ERC-20)
• Contract: Verified and audited

**Distribution Breakdown**
• Community (60%): 600,000,000,000 ICHZ
• Team (15%): 150,000,000,000 ICHZ (12-month lock)
• Marketing (15%): 150,000,000,000 ICHZ (6-month vesting)
• Liquidity (10%): 100,000,000,000 ICHZ (permanently locked)

**Tax Structure**
• Buy Tax: 0%
• Sell Tax: 2% (1% marketing, 1% liquidity)

**Anti-Whale Protection**
• Maximum wallet: 2% of total supply
• Maximum transaction: 1% of total supply
• Gradual limits removal as market matures

**Deflationary Mechanisms**
• Community-voted token burns
• Revenue-based burns from partnerships
• Milestone achievement burns
• Trading fee burns (1% weekly)`
    },
    {
      id: 'technology',
      title: 'Technology & Security',
      icon: Shield,
      content: `**Smart Contract Architecture**
Our ERC-20 token contract is built using OpenZeppelin's battle-tested libraries, ensuring maximum security and compatibility. Key features include:

• **Ownership Controls**: Multi-signature wallet integration for critical functions
• **Pause Mechanism**: Emergency pause capability for security incidents
• **Upgrade Path**: Proxy pattern implementation for future enhancements
• **Gas Optimization**: Efficient code structure minimizing transaction costs

**Security Measures**
• **Professional Audit**: Third-party security audit by reputable firm
• **Liquidity Lock**: Permanent liquidity pool locking via trusted protocol
• **Team Token Lock**: 12-month time-lock contract for team allocations
• **Multi-sig Wallets**: All critical operations require multiple signatures
• **Regular Monitoring**: Automated monitoring for unusual activity

**Platform Technology**
• **Web3 Integration**: Seamless wallet connection and transaction handling
• **Real-time Data**: Live price feeds and market data integration
• **Mobile Responsive**: Optimized experience across all devices
• **IPFS Storage**: Decentralized storage for metadata and assets

**Future Technology Roadmap**
• **Layer 2 Integration**: Polygon and Arbitrum support for lower fees
• **Cross-chain Bridge**: Multi-chain compatibility and asset bridging
• **NFT Marketplace**: Integrated marketplace for ICHZ-themed NFTs
• **Mobile App**: Native iOS and Android applications`
    },
    {
      id: 'governance',
      title: 'Governance Model',
      icon: Users,
      content: `**Community-First Governance**
ICHZ implements a democratic governance system where token holders have direct input on key decisions affecting the project's future.

**Voting Power**
• 1 ICHZ = 1 Vote
• Minimum holding period: 7 days
• Snapshot-based voting to prevent manipulation
• Quadratic voting for major decisions

**Governance Scope**
Token holders vote on:
• Token burn amounts and frequency
• Partnership and collaboration approvals
• Treasury fund allocation
• Feature development priorities
• Marketing campaign strategies
• Exchange listing decisions

**Proposal Process**
1. **Community Discussion**: 7-day discussion period on governance forum
2. **Formal Proposal**: Detailed proposal submission with impact analysis
3. **Review Period**: 3-day review by governance committee
4. **Voting Period**: 5-day voting window for all token holders
5. **Implementation**: Approved proposals implemented within 30 days

**Governance Incentives**
• Voting rewards for active participation
• Proposal submission rewards for quality contributions
• Governance NFTs for consistent voters
• Special recognition for valuable community input

**Transparency Measures**
• All votes recorded on-chain
• Regular governance reports published
• Community treasury dashboard
• Monthly governance calls with leadership`
    },
    {
      id: 'roadmap',
      title: 'Development Roadmap',
      icon: Target,
      content: `**Phase 1: Foundation (Q1 2024) ✅**
• Smart contract development and audit
• Website and brand identity creation
• Community building and social media presence
• Initial DEX listing and liquidity provision

**Phase 2: Growth (Q2 2024) 🔄**
• Major exchange listings (CEX)
• Partnership announcements
• Staking platform launch
• Mobile app development begins

**Phase 3: Expansion (Q3 2024)**
• NFT collection launch
• Cross-chain bridge implementation
• Governance platform activation
• Strategic partnerships with major brands

**Phase 4: Innovation (Q4 2024)**
• Layer 2 integration (Polygon, Arbitrum)
• Advanced DeFi features (lending, borrowing)
• Merchandise store launch
• Community events and meetups

**Phase 5: Mainstream (2025)**
• Traditional finance partnerships
• Institutional adoption initiatives
• Global marketing campaigns
• Ecosystem expansion and scaling

**Long-term Vision (2025+)**
• Become the definitive meme coin standard
• Build comprehensive DeFi ecosystem
• Establish ICHZ as cultural phenomenon
• Create lasting value for community members`
    },
    {
      id: 'team',
      title: 'Team & Advisors',
      icon: Users,
      content: `**Core Team**
Our team combines deep cryptocurrency expertise with genuine passion for meme culture and community building.

**Leadership**
• **Founder**: Anonymous (following Satoshi tradition)
• **Lead Developer**: 8+ years blockchain development
• **Community Manager**: Former social media manager for major crypto projects
• **Marketing Director**: 10+ years digital marketing experience

**Advisory Board**
• **DeFi Expert**: Former Uniswap core contributor
• **Security Specialist**: Smart contract auditor with 50+ audits
• **Marketing Advisor**: Viral marketing expert with meme coin experience
• **Legal Counsel**: Cryptocurrency regulatory specialist

**Community Contributors**
• **Moderators**: Experienced community leaders from major crypto projects
• **Content Creators**: Meme artists and social media influencers
• **Developers**: Open-source contributors to platform development
• **Ambassadors**: Regional community leaders worldwide

**Transparency Commitment**
While maintaining privacy for security reasons, our team is committed to:
• Regular community updates and AMAs
• Transparent development progress reports
• Open-source code contributions
• Community-first decision making`
    },
    {
      id: 'legal',
      title: 'Legal & Compliance',
      icon: Shield,
      content: `**Regulatory Compliance**
IcanHaz Coin operates within applicable legal frameworks while prioritizing decentralization and community ownership.

**Token Classification**
ICHZ is designed as a utility token providing:
• Governance rights within the ecosystem
• Access to platform features and services
• Staking rewards and community benefits
• Participation in ecosystem activities

**Compliance Measures**
• **Legal Review**: Ongoing legal counsel for regulatory compliance
• **KYC/AML**: Compliance procedures for large transactions
• **Tax Guidance**: Resources for token holders regarding tax obligations
• **Regulatory Monitoring**: Active monitoring of evolving regulations

**Risk Disclosures**
• Cryptocurrency investments carry inherent risks
• Token values may fluctuate significantly
• Regulatory changes may impact token utility
• Smart contract risks despite security measures
• Market manipulation and volatility risks

**Disclaimer**
This whitepaper is for informational purposes only and does not constitute investment advice. Potential token holders should conduct their own research and consult with financial advisors before making investment decisions.

**Geographic Restrictions**
ICHZ tokens may not be available to residents of certain jurisdictions with restrictive cryptocurrency regulations. Please consult local laws before participating.`
    }
  ]

  const downloadWhitepaper = () => {
    // In a real implementation, this would download a PDF version
    const element = document.createElement('a')
    const file = new Blob([document.getElementById('whitepaper-content').innerText], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = 'IcanHaz-Coin-Whitepaper.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const shareWhitepaper = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IcanHaz Coin Whitepaper',
          text: 'Check out the IcanHaz Coin whitepaper - the original meme coin for the meme generation!',
          url: window.location.href
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You would show a toast notification here
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="card-glow">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <FileText size={32} className="text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl gradient-text">IcanHaz Coin Whitepaper</CardTitle>
          <p className="text-muted-foreground text-lg">
            The Original Meme Coin for the Meme Generation
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Button onClick={downloadWhitepaper} className="flex items-center gap-2">
              <Download size={16} />
              Download PDF
            </Button>
            <Button onClick={shareWhitepaper} variant="outline" className="flex items-center gap-2">
              <Share2 size={16} />
              Share
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Table of Contents */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen size={20} />
            Table of Contents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-2">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <section.icon size={16} className="text-primary" />
                <span className="text-sm font-medium">{index + 1}. {section.title}</span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Info */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Badge variant="outline" className="flex items-center gap-2">
          <FileText size={12} />
          Version 1.0
        </Badge>
        <Badge variant="outline">
          Published: March 2024
        </Badge>
        <Badge variant="outline">
          Last Updated: March 2024
        </Badge>
      </div>

      {/* Content Sections */}
      <div id="whitepaper-content" className="space-y-8">
        {sections.map((section, index) => (
          <Card key={section.id} id={section.id} className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <section.icon size={24} className="text-primary" />
                {index + 1}. {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                {section.content.split('\n\n').map((paragraph, pIndex) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={pIndex} className="text-xl font-bold mt-6 mb-3 text-primary">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    )
                  } else if (paragraph.startsWith('•')) {
                    const items = paragraph.split('\n• ').map(item => item.replace(/^• /, ''))
                    return (
                      <ul key={pIndex} className="list-disc list-inside space-y-2 my-4">
                        {items.map((item, iIndex) => (
                          <li key={iIndex} className="text-muted-foreground">
                            {item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').split('<strong').map((part, partIndex) => {
                              if (partIndex === 0) return part
                              const [strongPart, ...rest] = part.split('</strong>')
                              return (
                                <span key={partIndex}>
                                  <strong className="text-foreground">{strongPart.replace(' class="text-foreground">', '')}</strong>
                                  {rest.join('</strong>')}
                                </span>
                              )
                            })}
                          </li>
                        ))}
                      </ul>
                    )
                  } else {
                    return (
                      <p key={pIndex} className="text-muted-foreground leading-relaxed mb-4">
                        {paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').split('<strong').map((part, partIndex) => {
                          if (partIndex === 0) return part
                          const [strongPart, ...rest] = part.split('</strong>')
                          return (
                            <span key={partIndex}>
                              <strong className="text-foreground">{strongPart.replace(' class="text-foreground">', '')}</strong>
                              {rest.join('</strong>')}
                            </span>
                          )
                        })}
                      </p>
                    )
                  }
                })}
              </div>
            </CardContent>
            {index < sections.length - 1 && <Separator className="mt-6" />}
          </Card>
        ))}
      </div>

      {/* Footer */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Ready to Join the Revolution?</h3>
          <p className="text-muted-foreground mb-4">
            Be part of the community that's bringing classic memes to modern crypto
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="wallet-button">
              Buy ICHZ Now
            </Button>
            <Button variant="outline">
              Join Community
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Can I haz financial freedom? The answer starts here. 🐱💰
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Whitepaper

