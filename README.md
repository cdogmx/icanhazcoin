# IcanHaz Coin DeFi Platform 🐱💰

A comprehensive DeFi platform built with modern React, featuring advanced trading tools, governance systems, and meme culture integration.

## 🚀 Features

### 🏦 DeFi Trading & Finance
- **Token Swap** - Seamless token trading with DEX integration
- **Quick Buy** - One-click token purchases
- **Price Charts** - Real-time price tracking with advanced charts
- **Token Stats** - Comprehensive token analytics and metrics
- **Staking Calculator** - APY calculations and staking rewards
- **Burn Tracker** - Token burn statistics and tracking

### 🎨 Meme & Social Features
- **Meme Generator** - Create and share custom memes
- **Social Integration** - Share memes and achievements
- **Community Features** - User engagement tools

### 🗳️ Governance & DAO
- **Governance Voting** - DAO voting system with proposals
- **Community Proposals** - Submit and vote on platform changes
- **Transparent Governance** - All decisions visible on-chain

### 🔐 Wallet & Security
- **Wallet Connect** - Multi-wallet support (MetaMask, WalletConnect, etc.)
- **Secure Transactions** - Built-in security features
- **Transaction History** - Complete transaction tracking

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Shadcn/ui
- **Charts**: Recharts + Custom chart components
- **State Management**: React Hooks + Context
- **Wallet Integration**: Web3 + Ethers.js
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
ichc/
├── src/
│   ├── components/
│   │   ├── ui/                    # Shadcn/ui components (50+ components)
│   │   │   ├── accordion.jsx
│   │   │   ├── alert.jsx
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── chart.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── dropdown-menu.jsx
│   │   │   ├── form.jsx
│   │   │   ├── input.jsx
│   │   │   ├── navigation-menu.jsx
│   │   │   ├── sidebar.jsx
│   │   │   ├── table.jsx
│   │   │   ├── tabs.jsx
│   │   │   └── ... (40+ more components)
│   │   ├── BurnTracker.jsx        # Token burn tracking
│   │   ├── GovernanceVoting.jsx   # DAO voting system
│   │   ├── MemeGenerator.jsx      # Meme creation tool
│   │   ├── PriceChart.jsx         # Price charts and analytics
│   │   ├── QuickBuy.jsx           # One-click token purchase
│   │   ├── StakingCalculator.jsx  # Staking rewards calculator
│   │   ├── TokenStats.jsx         # Token statistics
│   │   ├── TokenSwap.jsx          # DEX token swapping
│   │   ├── WalletConnect.jsx      # Wallet connection
│   │   └── Whitepaper.jsx         # Project documentation
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utility libraries
│   ├── assets/                    # Images and static assets
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application styles
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles
├── dist/                          # Build output
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser with wallet extension (MetaMask recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cdogmx/icanhazcoin.git
   cd icanhazcoin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 🎯 Key Components

### Trading & Finance
- **TokenSwap**: Advanced DEX integration with slippage protection
- **QuickBuy**: Streamlined token purchase experience
- **PriceChart**: Real-time price data with multiple timeframes
- **TokenStats**: Comprehensive token metrics and analytics
- **StakingCalculator**: APY calculations and staking management
- **BurnTracker**: Token burn statistics and tracking

### Governance & Community
- **GovernanceVoting**: Complete DAO voting system
- **Whitepaper**: Interactive project documentation
- **MemeGenerator**: Community meme creation tool

### User Experience
- **WalletConnect**: Multi-wallet support
- **Sidebar**: Navigation and user interface
- **UI Components**: 50+ reusable components

## 🎨 Design System

Built with **Shadcn/ui** and **Tailwind CSS**:
- **Consistent Design**: Unified component library
- **Dark/Light Mode**: Theme support
- **Responsive**: Mobile-first design
- **Accessible**: WCAG 2.1 compliant
- **Customizable**: Easy theming and customization

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_NAME=IcanHaz Coin
VITE_APP_DESCRIPTION=The original meme coin for the meme generation
VITE_RPC_URL=your_rpc_url_here
VITE_CHAIN_ID=1
```

### Tailwind Configuration
Customize colors, fonts, and spacing in `tailwind.config.js`

### Vite Configuration
Modify build settings in `vite.config.js`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Manual Deployment
1. Build: `npm run build`
2. Upload `dist` folder to your web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Support

- **Issues**: [GitHub Issues](https://github.com/cdogmx/icanhazcoin/issues)
- **Discussions**: [GitHub Discussions](https://github.com/cdogmx/icanhazcoin/discussions)
- **Documentation**: Check the Whitepaper component in the app

## 🎉 Acknowledgments

- **Shadcn/ui** for the amazing component library
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the fast build tool
- **React** for the amazing framework
- **The meme community** for the inspiration

---

**IcanHaz Coin** - The original meme coin for the meme generation 🐱💰

*Built with ❤️ and lots of memes* 