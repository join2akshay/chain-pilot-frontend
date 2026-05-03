# ChainPilot - AI Co-Pilot for On-Chain Decisions

ChainPilot is a **Web3 + AI portfolio intelligence platform** that connects to your Ethereum wallet and gives you real-time on-chain signals, portfolio analytics, swap recommendations, and a conversational AI co-pilot - all in one dashboard.

---

## Features

### Landing Page
- **Live Market Ticker** - Real-time global market data fetched from the backend
- **Hero Recommendation** - AI-generated market call shown on first load
- **Live Market Insights** - Streaming on-chain data in the Market section
- **Demo AI Chat** - Preview of the Copilot experience (non-interactive demo)
- **Wallet Connect CTA** - One-click wallet connection via Reown AppKit

### Authenticated App (`/app`)

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/app` | Portfolio overview: stat cards, portfolio performance chart, allocation pie, token balances |
| Wallet Intelligence | `/app/wallet` | Deep wallet "DNA" analysis: risk exposure, behavioral patterns |
| AI Recommendations | `/app/recommendations` | Personalized AI-powered action recommendations |
| On-Chain Signals | `/app/signals` | Whale movements, sentiment scores, capital flows |
| Portfolio Simulator | `/app/simulator` | Drag-and-drop allocation simulator with live P&L math |
| Transaction Feed | `/app/feed` | Paginated on-chain transaction timeline |
| Swap Advisor | `/app/swap-advisor` | AI swap intelligence with deep-links to Uniswap |

### AI Copilot Panel
- Floating side panel available across all `/app` pages
- Powered by `POST /ai/agent` on the backend
- Supports conversational Q&A with **action chips** (e.g., Buy / Hold / Sell suggestions)
- Unread badge on the sidebar icon

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + React Router v6 |
| Build | Vite 7, TypeScript 5.8 |
| Styling | Tailwind CSS v4, shadcn/ui, Radix UI |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Web3 | Reown AppKit, Ethers v6 |
| Blockchain Networks | Ethereum Mainnet, Arbitrum, Sepolia |
| State Management | React Context API |
| Linting / Formatting | ESLint, Prettier |

---
## Project Structure

- **`config/`**
  - `walletconnect.ts` - Reown AppKit setup (networks, ethers adapter, project ID)
- **`src/`**
  - `App.tsx` - Root component: providers + routing
  - `main.tsx` - React entry point
  - `styles.css` - Global Tailwind styles and custom theme
  - **`assets/`**
    - `logo.png`, `logo.jpeg` - App logo assets
    - `sakura-tree.png` - Landing page visual asset
  - **`components/`**
    - **`app/`**
      - `AppContext.tsx` - Global state: wallet data, AI messages, analytics
      - `AppShell.tsx` - App layout: sidebar, navigation, nested routes
      - `CopilotPanel.tsx` - Floating AI copilot side panel
    - **`dashboard/`**
      - `StatCards.tsx` - Portfolio summary stat cards
      - `PortfolioChart.tsx` - Performance line chart (Recharts)
      - `AllocationPie.tsx` - Token allocation pie chart
      - `WalletIntelligence.tsx` - Wallet behavior analysis widget
      - `RiskExposure.tsx` - Risk scoring widget
      - `Recommendations.tsx` - AI recommendation cards
      - `TransactionFeed.tsx` - On-chain transaction history list
    - **`web3/`**
      - `ConnectedAddress.tsx` - Displays the connected wallet address
      - `TokenBalances.tsx` - Live token balance display
    - **`providers/`**
      - `Web3Provider.tsx` - Initializes Reown AppKit, exports wallet hooks
    - **`ui/`** - shadcn/Radix UI primitive components (Button, Card, Dialog, etc.)
    - `Navbar.tsx` - Top navigation bar with wallet connect button
    - `Hero.tsx` - Landing hero section with live market ticker
    - `Features.tsx` - Landing page features section
    - `Market.tsx` - Live market insights section
    - `AIChat.tsx` - Demo AI chat UI on the landing page
    - `WalletConnect.tsx` - Landing page wallet connect CTA
    - `DecisionCard.tsx` - AI decision/suggestion display card
    - `SakuraPetals.tsx` - Animated sakura background effect
    - `Footer.tsx` - Site footer
  - **`routes/`**
    - `app.index.tsx` - `/app` Dashboard page
    - `app.wallet.tsx` - `/app/wallet` Wallet Intelligence page
    - `app.recommendations.tsx` - `/app/recommendations` AI Recommendations page
    - `app.signals.tsx` - `/app/signals` On-Chain Signals page
    - `app.simulator.tsx` - `/app/simulator` Portfolio Simulator page
    - `app.feed.tsx` - `/app/feed` Transaction Feed page
    - `app.swap-advisor.tsx` - `/app/swap-advisor` Swap Advisor page
  - **`lib/`**
    - `apiClient.ts` - Axios HTTP client with auth headers and token refresh logic
    - `walletStorage.ts` - localStorage helpers for wallet address and auth tokens
    - `utils.ts` - Shared utility functions
- `.env.example` - Environment variable template
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript config (`@/*` alias → `src/*`)
- `components.json` - shadcn/ui configuration
- `package.json` - Scripts and dependencies
---

## Getting Started

### Prerequisites

- Node.js ≥ 18 or [Bun](https://bun.sh)
- A [Reown (WalletConnect) Project ID](https://cloud.reown.com/)
- The ChainPilot backend running (default: `https://chainpilot-backend.vercel.app`)

### 1. Clone the repository

```bash
git clone https://github.com/your-org/chain-pilot-frontend.git
cd chain-pilot-frontend
```

### 2. Install dependencies

```
npm install
# or
bun install
```

### 3. Configure environment variables

Copy the example env file and fill in your values:

```
VITE_PROJECT_ID=your_reown_project_id
VITE_API_URL=https://chainpilot-backend.vercel.app
VITE_ENV=development
```

### 4. Run the development server
```
npm run dev
# or
bun run dev
```

Open http://localhost:5173 in your browser.

---

## Available Scripts

| Command | Description |
|-------|-----------|
| npm run dev | Start Vite dev server on port 5173 |
| npm run build | Type-check + production build to dist/ |
| npm run preview | Serve the production build locally |
| npm run lint | Run ESLint |
| npm run format | Auto-format with Prettier |

---

## How It Works

### Authentication Flow
```
1. User connects their Ethereum wallet via Reown AppKit (MetaMask, Coinbase Wallet, WalletConnect, etc.)
2. The app sends a POST /wallet/connect request with the wallet address
3. Backend returns accessToken + refreshToken, stored in localStorage
4. All subsequent API calls attach Authorization: Bearer <accessToken>
5. On 401, the client automatically refreshes using stored walletAddress
```

### Data Flow

```
Wallet Connect
     ↓
POST /wallet/connect → accessToken
     ↓
Parallel: GET /wallet/analyze-wallet
          GET /wallet/portfolio-summary
          GET /wallet/portfolio-analytics
     ↓
AppContext (global state) → all /app/* pages
```

### AI Copilot

The Copilot panel sends each user message to POST /ai/agent and renders the response with optional action chips (e.g., direct links or one-click trade suggestions routed to Uniswap).


## Supported Networks

* Ethereum Mainnet
* Arbitrum One
* Sepolia (Testnet)

## Deployment

The app is a standard Vite SPA. After npm run build, deploy the dist/ folder to any static host:

* Vercel: vercel --prod
* Netlify: Drag & drop dist/, set publish dir to dist
* Cloudflare Pages: Connect the repo; set build command to npm run build, output to dist

Set the environment variables (VITE_PROJECT_ID, VITE_API_URL) in your hosting dashboard.

## Disclaimer

ChainPilot provides informational insights and AI-generated suggestions only. It does not execute trades on your behalf. Swap suggestions link to third-party DEX interfaces (e.g., Uniswap). Always DYOR before making financial decisions.

## 🧑‍💻 Author

Built with ❤️ by Team ChainPilot (Akshay Tiwari).